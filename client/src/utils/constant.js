export const properties = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1628747041963-6f2a444ef98a?auto=format&fit=crop&w=800&q=60",
    name: "Lekki Pearl Residence",
    price: "₦2,500,000 ",
    location: "Lekki Phase 1, Lagos",
    bed: 3,
    bath: 2,
    sqft: "1,350 sqft",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1600585154206-3c0c9f0f67e3?auto=format&fit=crop&w=800&q=60",
    name: "Oceanview Towers",
    price: "₦4,200,000",
    location: "Victoria Island, Lagos",
    bed: 4,
    bath: 3,
    sqft: "2,100 sqft",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1595550303749-3a4b06e475fa?auto=format&fit=crop&w=800&q=60",
    name: "Harmony Court",
    price: "₦1,200,000",
    location: "Gbagada, Lagos",
    bed: 2,
    bath: 2,
    sqft: "900 sqft",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?auto=format&fit=crop&w=800&q=60",
    name: "Cedar Luxury Homes",
    price: "₦3,500,000",
    location: "Maitama, Abuja",
    bed: 4,
    bath: 3,
    sqft: "2,000 sqft",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=60",
    name: "Sunshine Apartments",
    price: "₦850,000",
    location: "Ojo, Lagos",
    bed: 1,
    bath: 1,
    sqft: "600 sqft",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1580584126903-c17d41830450?auto=format&fit=crop&w=800&q=60",
    name: "Prime Crest Estate",
    price: "₦2,000,000",
    location: "Gwarinpa, Abuja",
    bed: 3,
    bath: 2,
    sqft: "1,500 sqft",
  },
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=800&q=60",
    name: "Royal Gate Residence",
    price: "₦1,600,000",
    location: "Port Harcourt, Rivers",
    bed: 3,
    bath: 2,
    sqft: "1,300 sqft",
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=60",
    name: "Urban Crest Villa",
    price: "₦700,000",
    location: "Ibadan, Oyo",
    bed: 2,
    bath: 2,
    sqft: "850 sqft",
  },
  {
    id: 9,
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=60",
    name: "Emerald View",
    price: "₦1,000,000",
    location: "Abeokuta, Ogun",
    bed: 2,
    bath: 1,
    sqft: "780 sqft",
  },
  {
    id: 10,
    image:
      "https://images.unsplash.com/photo-1600585154016-8ea1c13f69ff?auto=format&fit=crop&w=800&q=60",
    name: "Kingsbay Towers",
    price: "₦5,500,000",
    location: "Asokoro, Abuja",
    bed: 5,
    bath: 4,
    sqft: "2,800 sqft",
  },
];

export const headers = (accessToken) => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};
