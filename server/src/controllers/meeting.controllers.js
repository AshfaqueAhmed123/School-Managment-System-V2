import ApiResponse from "../utils/ApiResponse.utils.js";
import ApiError from "../utils/ApiError.utils.js"
import { Meeting } from "../model/meeting.model.js";
import {v4 as uuidV4} from "uuid"

const createMeeting = async (req,res) => {
    try {
        const {title,meetingID,teacher,parent,date,time,status} = req.body;
        if(!title || !teacher || !parent){
            return res.status(400).json(
                new ApiError(400,"parent and teacher are required")
            )
{        }}
        const em = await Meeting.findOne({meetingID})
        if(em){
            return 
        }
        const meeting = await Meeting.create({
            title,
            meetingID : uuidV4(),
            parent,
            teacher,
            status:"pending",
            time,
            date,
        });
        return res.status(200).json(
            new ApiResponse(200,"meeting created",meeting)
        )
    } catch (error) {
        return res.status(500).json(
            new ApiError(500,error?.message || "something went wrong")
        )
    }
}


const getAllMeetings = async (req,res) => {
    try {
        const meetings = await Meeting.find();
        return res.status(200).json(
            new ApiResponse(200,"all meetings fetched",meetings)
        )
    } catch (error) {
        return res.status(500).json(
            new ApiError(500,error?.message || "something went wrong")
        )
    }
}

const deleteMeeting = async (req,res) => {
    try {
       
        
    } catch (error) {
        return res.status(500).json(
            new ApiError(500,error || "something went wrong")
        )
    }
}

export {
    createMeeting,
    getAllMeetings,
    deleteMeeting,
}