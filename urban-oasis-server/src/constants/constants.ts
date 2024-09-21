export default class Constants {
  //Fake data
  static PROPERTY_TITLES = [
    "Charming Riverside Apartment with Scenic Views",
    "Elegant Two-Story Villa with Private Pool",
    "Modern Loft-Style Apartment in City Center",
    "Luxury Hillside Villa with Ocean Panorama",
    "Spacious Penthouse Apartment with Rooftop Terrace",
    "Cozy Beachfront Villa with Serene Gardens",
    "Contemporary Urban Apartment with Skyline Views",
    "Rustic Countryside Villa with Vineyard Access",
    "Stylish Downtown Apartment with Balcony Overlooking Park",
    "Secluded Tropical Villa with Infinity Pool",
    "Sunny Coastal Apartment with Direct Beach Access",
    "Luxurious Mountain Villa with Hot Springs Nearby",
    "Chic Studio Apartment in the Heart of the City",
    "Grand Villa with Private Garden and Fountain",
    "Urban Apartment with Modern Finishes and City Views",
    "Charming Seaside Villa with Private Dock",
    "Bright and Airy Loft Apartment with High Ceilings",
    "Exclusive Villa with Gated Entrance and Private Courtyard",
    "Eco-Friendly Apartment with Green Rooftop Garden",
    "Sophisticated Lakeside Villa with Floor-to-Ceiling Windows",
  ];

  static PROJECT_NAMES = [
    "Sunset Ridge Residences",
    "Emerald Bay Villas",
    "Harborview Heights",
    "Crystal Waters Estates",
    "The Pinnacle Towers",
    "Silverleaf Gardens",
    "Oakwood Terrace Homes",
    "Riverstone Park Apartments",
    "Golden Horizon Villas",
    "Azure Sky Condominiums",
    "Mountain Crest Estates",
    "The Grand Courtyard",
    "Whispering Pines Residences",
    "Ocean Breeze Villas",
    "Maple Grove Community",
    "The Horizon at Seaview",
    "Starlight Ridge Residences",
    "Serenity Cove Estates",
    "The Meadows at Willow Creek",
    "Lakeside Vista Apartments",
  ];

  static AMENITIES = [
    "Pool",
    "Fully Equipped Gym",
    "Rooftop Terrace",
    "Private Parking",
    "24/7 Security",
    "High-Speed Internet",
    "BBQ Area",
    "Indoor Heated Pool",
    "Spa and Sauna",
  ] as const;

  static LISTING_PRICES = [
    5000, 7500, 10000, 1000000, 3000000, 8000000,
  ] as const;

  //Env Enums
  static NODE_ENVS = ["development", "production", "test"] as const;
  static APARTMENT_COUNT = 30;
}
