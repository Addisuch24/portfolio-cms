const repository=require("../repositories/experienceRepository");
const ApiError=require("../utils/ApiError");

class ExperienceService{

    getAll(){

        return repository.getAll();

    }

    create(data){

        return repository.create(data);

    }

    async update(id,data){

        const item=await repository.getById(id);

        if(!item){

            throw new ApiError(404,"Experience not found.");

        }

        return repository.update(id,data);

    }

    async delete(id){

        const item=await repository.getById(id);

        if(!item){

            throw new ApiError(404,"Experience not found.");

        }

        return repository.delete(id);

    }

}

module.exports=new ExperienceService();