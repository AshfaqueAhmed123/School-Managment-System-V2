import mongoose,{Schema,model} from "mongoose";

const meeting = new Schema({
    title:{
        type:String,
        required:true
    },
    meetingID:{
        type:String
    },
    teacher:{
        type:String,
        required:true
    },
    parent:{
        type:String,
        required:true
    },
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref : "student",
        // required:true
    },
    class:{
        type:mongoose.Schema.Types.ObjectId,
        ref : "class",
        // required:true
    },
    date:{
        type:String,
    },
    time:{
        type:String,
    },
    status:{
        type:String,
        enum:["pending","compeleted","cancelled"],
        default:"pending",
    },
},{
    timestamps:true,
})

export const Meeting = model("Meeting",meeting);