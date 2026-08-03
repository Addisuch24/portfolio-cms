const projectService = require("../services/projectService");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const uploadService = require("../services/uploadService");

const createProject = asyncHandler(async (req, res) => {

    const projectData = { ...req.body };

    console.log(`[projectController] createProject called by user=${req.user?.id || 'anon'}; file=${req.file ? req.file.originalname : 'none'}`);
    console.log('[projectController] projectData keys:', Object.keys(projectData));

    // If an image file was uploaded in the multipart request, upload it and attach URLs
    if (req.file) {
        const uploaded = await uploadService.uploadFile(req.file.path, "portfolio/projects");
        projectData.image_url = uploaded.url;
        projectData.image_public_id = uploaded.publicId;
    }

    const id = await projectService.create(projectData);

    return res.status(201).json(
        new ApiResponse(
            201,
            { id },
            "Project created successfully."
        )
    );

});

const getProjects = asyncHandler(async (req, res) => {

    const projects = await projectService.getAll();

    return res.status(200).json(
        new ApiResponse(
            200,
            projects,
            "Projects fetched successfully."
        )
    );

});

const getProject = asyncHandler(async (req, res) => {

    const project = await projectService.getById(req.params.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            project,
            "Project fetched successfully."
        )
    );

});

const updateProject = asyncHandler(async (req, res) => {

    const projectData = { ...req.body };

    if (req.file) {
        const uploaded = await uploadService.uploadFile(req.file.path, "portfolio/projects");
        projectData.image_url = uploaded.url;
        projectData.image_public_id = uploaded.publicId;
    }

    await projectService.update(req.params.id, projectData);

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Project updated successfully."
        )
    );

});

const deleteProject = asyncHandler(async (req, res) => {

    await projectService.delete(req.params.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Project deleted successfully."
        )
    );

});
const uploadProjectImage =
async (req, res, next) => {

    try {

        const result =
            await projectService.uploadProjectImage(

                req.params.id,

                req.file

            );

        res.status(200).json(

            new ApiResponse(

                200,

                result,

                "Image uploaded successfully."

            )

        );

    } catch (error) {

        next(error);

    }

};

module.exports = {
    createProject,
    getProjects,
    getProject,
    uploadProjectImage,
    updateProject,
    deleteProject
};