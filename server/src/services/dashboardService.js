const dashboardRepository = require("../repositories/dashboardRepository");

class DashboardService {

    async getDashboardData() {

        const [
            totalProjects,
            totalSkills,
            totalExperiences,
            totalMessages,
            unreadMessages,
            latestProjects,
            latestContacts
        ] = await Promise.all([

            dashboardRepository.getTotalProjects(),

            dashboardRepository.getTotalSkills(),

            dashboardRepository.getTotalExperiences(),

            dashboardRepository.getTotalMessages(),

            dashboardRepository.getUnreadMessages(),

            dashboardRepository.getLatestProjects(),

            dashboardRepository.getLatestContacts()

        ]);

        return {

            statistics: {

                totalProjects,

                totalSkills,

                totalExperiences,

                totalMessages,

                unreadMessages

            },

            latestProjects,

            latestContacts

        };

    }

}

module.exports = new DashboardService();