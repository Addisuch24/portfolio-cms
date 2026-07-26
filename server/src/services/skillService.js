const repository=require("../repositories/skillRepository");
const ApiError=require("../utils/ApiError");

class SkillService{

    async getAll(){

        return await repository.getAll();

    }

    async create(data){

        return await repository.create(data);

    }

    async update(id,data){

        const skill=await repository.getById(id);

        if(!skill){

            throw new ApiError(404,"Skill not found.");

        }

        await repository.update(id,data);

    }

    async delete(id){

        const skill=await repository.getById(id);

        if(!skill){

            throw new ApiError(404,"Skill not found.");

        }

        await repository.delete(id);

    }

}

module.exports=new SkillService();