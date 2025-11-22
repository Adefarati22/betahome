import tryCatchFn from "../utils/tryCatchFn.js";
import responseHandler from "../utils/responseHandler.js";
import propertyService from "../services/property.service.js";
const { successResponse } = responseHandler;


  export const getAllProperties = tryCatchFn ( async (req, res, next) => {
    try {
      const {
        page = 1,
        limit = 10,
        query = "",
        location = "",
        type = "",
        minBed,
        maxBed,
        minPrice,
        maxPrice,
      } = req.query;

      const response = await propertyService.getAll(
        Number(page),
        Number(limit),
        query,
        location,
        type,
        minBed,
        maxBed,
        minPrice,
        maxPrice,
      );

      return res.status(200).json({
        message: "Properties fetched successfully",
        ...response,
      });
    } catch (error) {
      next(error);
    }
  });

  export const newProperty = tryCatchFn(async (req, res, next) => {
    const property = await propertyService.create(req.body, next);
    if (!property) return;
    return successResponse(res, property, "Property created successfully", 201);
  })
