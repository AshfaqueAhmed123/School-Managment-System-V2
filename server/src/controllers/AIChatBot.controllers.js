import ApiError from "../utils/ApiError.utils.js"
import ApiResponse from "../utils/ApiResponse.utils.js"

const conversation = async (req,res) => {
    try {
        res.status(200).json(
            new ApiResponse(200,"all is running good!")
        )
    } catch (error) {
        return res.status(error?.status || 500).json(
            new ApiError(error?.status || 500 , error?.message || "something went wrong")
        )
    }
}

export {conversation}