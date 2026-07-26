const experienceService = require("../services/experienceService");
const ApiResponse = require("../utils/ApiResponse");

class ExperienceController {

    async getAll(req, res, next) {

        try {

            const experiences = await experienceService.getAll();

            return res.status(200).json(

                new ApiResponse(

                    200,

                    experiences,

                    "Experiences fetched successfully."

                )

            );

        } catch (error) {

            next(error);

        }

    }

    async create(req, res, next) {

        try {

            const id = await experienceService.create(req.body);

            return res.status(201).json(

                new ApiResponse(

                    201,

                    { id },

                    "Experience created successfully."

                )

            );

        } catch (error) {

            next(error);

        }

    }

    async update(req, res, next) {

        try {

            await experienceService.update(

                req.params.id,

                req.body

            );

            return res.status(200).json(

                new ApiResponse(

                    200,

                    null,

                    "Experience updated successfully."

                )

            );

        } catch (error) {

            next(error);

        }

    }

    async delete(req, res, next) {

        try {

            await experienceService.delete(

                req.params.id

            );

            return res.status(200).json(

                new ApiResponse(

                    200,

                    null,

                    "Experience deleted successfully."

                )

            );

        } catch (error) {

            next(error);

        }

    }

}

module.exports = new ExperienceController();