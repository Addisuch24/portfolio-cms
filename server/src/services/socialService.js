const socialRepository = require("../repositories/socialRepository");

class SocialService {
  async getAll() {
    return await socialRepository.getAll();
  }

  async getById(id) {
    return await socialRepository.getById(id);
  }

  async create(data) {
    return await socialRepository.create(data);
  }

  async update(id, data) {
    return await socialRepository.update(id, data);
  }

  async delete(id) {
    return await socialRepository.delete(id);
  }
}

module.exports = new SocialService();
