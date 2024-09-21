# Urban Oasis

Urban Oasis is a full-stack web application for exploring rental and sale apartment listings. Users can search for apartments, view details, and even create new listings.

## Tech Stack

- **Frontend**: Next.js with TypeScript
- **Backend**: Express.js with TypeScript
- **Database**: MongoDB

## Features

- Browse apartment listings for rent and sale
- Search functionality by unit name, unit number, or project
- Detailed view of apartment information
- Create new apartment listings
- Responsive design for mobile and desktop

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v20 or later)
- Docker and Docker Compose
- Git

## Getting Started

To get Urban Oasis running locally:

1. Clone this repository
```
git clone https://github.com/yourusername/urban-oasis.git
cd urban-oasis
```
2. Build and start the Docker containers
```
docker-compose up
```
##
The project includes a script to populate the database with initial data. This script runs automatically when you start the containers, but if you need to run it manually:

1. Access the API container
```
docker-compose exec api sh
```
2. Run the seed script
```
npm run seed
```
## Development

For development purposes, the project is set up with hot-reloading for both the client and server:

- Client-side changes will be reflected immediately in the browser
- Server-side changes will trigger an automatic restart of the Node.js server

## API Documentation

The API endpoints are as follows:

- `GET /apartment-management/apartments`: List all apartments
- `GET /apartment-management/apartments`: Search apartments by query
- `GET /apartment-management/apartments/:id`: Get details of a specific apartment
- `POST /apartment-management/apartments`: Create a new apartment listing

