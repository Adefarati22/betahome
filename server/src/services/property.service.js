import Property from "../models/property.js";


 const propertyService = {
  create: async (data) => {
    return await Property.create(data);
  },

getAll: async (
    page = 1,
    limit = 10,
    query = "",
    location = "",
    type = "",
    minBed,
    maxBed,
    minPrice,
    maxPrice,
  ) => {
    const filter = {};

    if (query) filter.title = { $regex: q, $options: "i" };
    if (location) filter.location = { $regex: location, $options: "i" };
    if (type) filter.type = type;
    if (minBed) filter.bedrooms = { $gte: Number(minBed) };
    if (maxBed) filter.bedrooms = { $lte: Number(maxBed) };
    if (minPrice) filter.price = { $gte: Number(minPrice) };
    if (maxPrice) filter.price = { $lte: Number(maxPrice) };

    const skip = (page - 1) * limit;

    const total = await Property.countDocuments(filter);
    const properties = await Property.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return {
      properties,
      meta: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        total,
        limit,
        hasMore: skip + properties.length < total,
      },
    };
  },
};

export default propertyService
