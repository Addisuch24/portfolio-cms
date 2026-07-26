const contactService = require("../services/contactService");
const ApiResponse = require("../utils/ApiResponse");

class ContactController {

    async create(req, res, next) {

        try {

            const id = await contactService.create(req.body);

            return res.status(201).json(
                new ApiResponse(
                    201,
                    { id },
                    "Message sent successfully."
                )
            );

        } catch (error) {
            next(error);
        }

    }

    async getAll(req, res, next) {

        try {

            const contacts = await contactService.getAll();

            return res.status(200).json(
                new ApiResponse(
                    200,
                    contacts,
                    "Contacts fetched successfully."
                )
            );

        } catch (error) {
            next(error);
        }

    }

    async markAsRead(req, res, next) {

        try {

            await contactService.markAsRead(req.params.id);

            return res.status(200).json(
                new ApiResponse(
                    200,
                    null,
                    "Message marked as read."
                )
            );

        } catch (error) {
            next(error);
        }

    }

    async delete(req, res, next) {

        try {

            await contactService.delete(req.params.id);

            return res.status(200).json(
                new ApiResponse(
                    200,
                    null,
                    "Message deleted successfully."
                )
            );

        } catch (error) {
            next(error);
        }

    }

}

module.exports = new ContactController();