import mongoose, {Schema,model} from "mongoose";

const resourceSchema = new Schema({
    teacher:{},
    class:{},
},{
    timestamps:true
});

export const Resource = model("Resource",resourceSchema);