import { ApartmentType } from "../models/apartment.model";

 const mockApartment: ApartmentType  = {
  unitNumber: 1,
  unitName: "Charming Riverside Apartment with Scenic Views",
  price: 7500,
  listingType: "Rental",
  description:
    "Vesper anser veniam conservo inventore conservo ara temporibus. Umquam deorsum reprehenderit callide ventito harum vita tabella termes. Rerum virga tracto vae studio cedo. Patrocinor vitium antepono creo. Amplus turpis terra torrens. Spoliatio coniecto placeat carpo astrum ventito suppellex. Arbustum amoveo censura sol volup vae celebrer conatus conturbo pectus. Denique creta demergo tracto praesentium commemoro vulgaris cicuta. Sed pauper uxor strues desidero averto cupressus angelus stillicidium absque. Vito dens suus confero ubi sursum clam audentia delectus.",
  image:
    "https://images.unsplash.com/photo-1724047312390-12fb4047bcb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NTEzMDd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjYxNjMxNjF8&ixlib=rb-4.0.3&q=80&w=1080",
  bedrooms: 5,
  bathrooms: 1,
  project: "Whispering Pines Residences",
  amenities: ["Fully Equipped Gym"],
  sizeInMeterSquared: 194,
  address: {
    street: "2657 Martina Parks",
    city: "Kokomo",
    state: "Kansas",
    zipCode: "65591",
  },
};

export default mockApartment;