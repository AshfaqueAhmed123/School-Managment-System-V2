import {Resource} from "../model/resource.model.js"
import ApiError from "../utils/ApiError.utils.js"
import ApiResponse from "../utils/ApiResponse.utils.js"

const create = async (req,res) => {
    try {
        const {title,content} = req.body;
        if(!title || !content){
            return res.status(400).json(
                new ApiError(400,"title and content are required")
            )
        }
        const createdResource = await Resource.create({
            title,
            content
        })
        if(!createdResource){
            return res.status(500).json(
                new ApiError(400,"something went wrong!")
            )
        }
        return res.status(200).json(
            new ApiResponse(200, "resource created sucessfully!",createdResource)
        )
    } catch (error) {
        res.status.json(
            new ApiError(error?.status || 500 , error?.message || "something went wrong!")
        )
    }
}

const getOne = async () => {
    try {
        
    } catch (error) {
        res.status.json(
            new ApiError(error?.status || 500 , error?.message || "something went wrong!")
        )
    }
}

const getAll = async () => {
    try {
        
    } catch (error) {
        res.status.json(
            new ApiError(error?.status || 500 , error?.message || "something went wrong!")
        )
    }
}

const remove = async (req,res) => {
    try {
        const resourceId = req.params.id;
        if(!resourceId){
            return res.status(400).json(
                new ApiError(400,"resource id is required")
            )
        }
        const isDeleted = await Resource.deleteOne({_id:resourceId});
        if(!isDeleted){
            return res.status(500).json(
                new ApiError(500,"something went wrong deleting resource")
            )
        }
        return res.status(200).json(
            new ApiResponse(200,"resource deleted sucessfully",isDeleted)
        )
    } catch (error) {
        res.status.json(
            new ApiError(error?.status || 500 , error?.message || "something went wrong!")
        )
    }
}

export {
    create,
    getOne,
    getAll,
    remove
}