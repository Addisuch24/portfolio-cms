const contactRepository = require("../repositories/contactRepository");
const emailService = require("./emailService");
const ApiError = require("../utils/ApiError");

class ContactService {

    async create(data) {

        const id = await contactRepository.create(data);

        await emailService.sendContactNotification(data);

        return id;
    }

    async getAll() {

        return await contactRepository.getAll();
    }

    async markAsRead(id) {

        const contact = await contactRepository.getById(id);

        if (!contact) {
            throw new ApiError(404, "Contact not found.");
        }

        await contactRepository.markAsRead(id);
    }

    async delete(id) {

        const contact = await contactRepository.getById(id);

        if (!contact) {
            throw new ApiError(404, "Contact not found.");
        }

        await contactRepository.delete(id);
    }

}

module.exports = new ContactService();