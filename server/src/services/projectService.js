const projectRepository = require("../repositories/projectRepository");
const ApiError = require("../utils/ApiError");
const getPagination = require("../utils/pagination");
const getPaginationMeta = require("../utils/paginationMeta");
const imageService = require("./imageService");
class ProjectService {

    async create(project) {

        return await projectRepository.create(project);

    }

    async getAll(query = {}) {
        if (!query.page && !query.limit && Object.keys(query).length === 0) {
            return await projectRepository.findAll();
        }

        const pagination = getPagination(query.page, query.limit);
        const filters = {
            ...query,
            ...pagination
        };

        const result = await projectRepository.findWithFilters(filters);

        return {
            data: result.projects,
            pagination: getPaginationMeta(result.totalItems, pagination.page, pagination.limit)
        };
    }

    async getById(id) {

        const project = await projectRepository.findById(id);

        if (!project) {

            throw new ApiError(404, "Project not found.");

        }
        return project;
    }

    async update(id, data) {

        const project = await projectRepository.findById(id);

        if (!project) {

            throw new ApiError(404, "Project not found.");

        }

        await projectRepository.update(id, data);
    }

    async delete(id) {

        const project = await projectRepository.findById(id);

        if (!project) {

            throw new ApiError(404, "Project not found.");

        }

        await projectRepository.delete(id);
    }

    async uploadProjectImage(projectId, file) {

        const project =
            await projectRepository.findById(projectId);

        if (!project) {

            throw new ApiError(404, "Project not found.");

        }

        if (project.image_public_id) {

            await imageService.deleteImage(
                project.image_public_id
            );

        }

        const uploaded =
            await imageService.uploadImage(file.path);

        await projectRepository.updateProjectImage(

            projectId,

            uploaded.imageUrl,

            uploaded.publicId

        );

        return uploaded;

    }
}

module.exports = new ProjectService();