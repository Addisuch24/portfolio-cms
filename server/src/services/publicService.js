const publicRepository =
require("../repositories/publicRepository");


class PublicService {


    async getProfile(){

        return await publicRepository.getProfile();

    }



    async getProjects(){

        return await publicRepository.getProjects();

    }



    async getSkills(){

        return await publicRepository.getSkills();

    }



    async getExperiences(){

        return await publicRepository.getExperiences();

    }



    async getSocialLinks(){

        return await publicRepository.getSocialLinks();

    }


}


module.exports = new PublicService();