const socialService = require("../services/socialService");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

class SocialController {
  async getAll(req, res, next) {
    try {
      const socials = await socialService.getAll();
      return res.status(200).json(new ApiResponse(200, socials, "Social links fetched successfully."));
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const social = await socialService.getById(req.params.id);
      return res.status(200).json(new ApiResponse(200, social, "Social link fetched successfully."));
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const id = await socialService.create(req.body);
      return res.status(201).json(new ApiResponse(201, { id }, "Social link created successfully."));
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      await socialService.update(req.params.id, req.body);
      return res.status(200).json(new ApiResponse(200, null, "Social link updated successfully."));
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await socialService.delete(req.params.id);
      return res.status(200).json(new ApiResponse(200, null, "Social link deleted successfully."));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SocialController();
