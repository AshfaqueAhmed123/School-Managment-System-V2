import mongoose, {Schema,model} from "mongoose";

const resourceSchema = new Schema({
    teacher:{},
    class:{},
    title:String,
    content:String
},{
    timestamps:true
});

export const Resource = model("Resource",resourceSchema);