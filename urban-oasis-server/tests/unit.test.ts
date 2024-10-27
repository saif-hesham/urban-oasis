import { mock, MockProxy } from 'jest-mock-extended';
import mongoose from 'mongoose';
import request from 'supertest';
import {
  createApartmentController,
  findApartmentByIdController,
} from '../src/controllers/apartment-controllers';
import Apartment from '../src/models/apartment.model';
import app from './../src/index';

interface RequestWithQuery extends Request {
  query: {
    unitName?: string;
    unitNumber?: string;
    project?: string;
  };
  params: { id: string };
  body: any;
}

jest.mock('../src/models/apartment.model');

describe('Apartment Handlers', () => {
  let req: MockProxy<RequestWithQuery>;
  let res: MockProxy<Response>;
  let next: jest.Mock;
  let mockQuery: any;

  beforeEach(() => {
    req = mock<RequestWithQuery>();
    res = mock<Response>();
    next = jest.fn();

    // Reset all mocks
    jest.resetAllMocks();

    // Create a mock query object
    mockQuery = {
      where: jest.fn().mockReturnThis(),
      regex: jest.fn().mockReturnThis(),
      equals: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      getFilter: jest.fn().mockReturnValue({}),
      exec: jest.fn().mockResolvedValue([]),
    };

    (Apartment.find as jest.Mock).mockReturnValue(mockQuery);

    (Apartment.countDocuments as jest.Mock).mockResolvedValue(0);
  });

  describe('getApartments', () => {
    it('should call Apartment.find().where() for each query parameter', async () => {
      const response = await request(app)
        .get('/apartment-management/apartments')
        .query({ page: 1, limit: 10, unitName: 'Apt 1' });

      expect(mockQuery.where).toHaveBeenCalledWith('unitName');
      expect(mockQuery.regex).toHaveBeenCalledWith(new RegExp('Apt 1', 'i'));
      expect(response.status).toBe(200);
    });

    it('should handle pagination', async () => {
      (Apartment.countDocuments as jest.Mock).mockResolvedValue(25);

      const response = await request(app)
        .get('/apartment-management/apartments')
        .query({ page: 2, limit: 10 });

      expect(mockQuery.skip).toHaveBeenCalledWith(10);
      expect(mockQuery.limit).toHaveBeenCalledWith('10');
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({ currentPage: '2', totalPages: 3 });
    });
  });

  describe('findApartmentById', () => {
    it('should call Apartment.findById() with the correct id', async () => {
      const mockId = new mongoose.Types.ObjectId().toString();

      const mockApartment = { _id: mockId, unitName: 'A101' };
      (Apartment.findById as jest.Mock).mockResolvedValue(mockApartment);

      const response = await request(app).get(
        '/apartment-management/apartments/' + mockId
      );

      expect(Apartment.findById).toHaveBeenCalledWith(mockId.toString());
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({ _id: mockId, unitName: 'A101' });
    });

    it('should handle apartment not found', async () => {
      const mockId = new mongoose.Types.ObjectId();
      req.params = { id: mockId.toString() };

      (Apartment.findById as jest.Mock).mockResolvedValue(null);

      await findApartmentByIdController(req as any, res as any, next);
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'NotFoundError',
        })
      );
    });
  });

  describe('createApartment', () => {
    it('should call Apartment.create() with the request body', async () => {
      const apartmentData = {
        unitName: 'B202',
        unitNumber: '202',
        project: 'Sunset Heights',
        floorArea: 1200,
        price: 600000,
      };
      req.body = apartmentData;

      const createdApartment = {
        _id: new mongoose.Types.ObjectId(),
        ...apartmentData,
      };
      (Apartment.create as jest.Mock).mockResolvedValue(createdApartment);

      await createApartmentController(req as any, res as any, next);

      expect(Apartment.create).toHaveBeenCalledWith(apartmentData);
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('should handle creation errors', async () => {
      req.body = {};

      (Apartment.create as jest.Mock).mockRejectedValue(
        new Error('Validation failed')
      );

      await createApartmentController(req as any, res as any, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
