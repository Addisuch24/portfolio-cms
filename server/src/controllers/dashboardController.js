const dashboardService = require("../services/dashboardService");
const ApiResponse = require("../utils/ApiResponse");// ApiResponse class for standardized API responses , without ApiResponse class, the response structure would be inconsistent and harder to manage across different endpoints.
class DashboardController {

    async getDashboard(req, res, next) {

        try {

            const dashboard =
                await dashboardService.getDashboardData();

            return res.status(200).json(

                new ApiResponse(

                    200,

                    dashboard,

                    "Dashboard loaded successfully."

                )

            );

        } catch (error) {

            next(error);

        }

    }

}

module.exports = new DashboardController();