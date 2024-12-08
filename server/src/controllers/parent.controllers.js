import {Parent} from "../model/parent.model.js"
import ApiResponse from "../utils/ApiResponse.utils.js";
import ApiError from "../utils/ApiError.utils.js";


const generateAccessAndRefereshTokens = async (userId) => {
    try {
      const parent = await Parent.findById(userId);
      const accessToken = parent.generateAccessToken();
      const refreshToken = parent.generateRefreshToken();
  
      parent.refreshToken = refreshToken;
      await parent.save({ validateBeforeSave: false });
  
      return { accessToken, refreshToken };
    } catch (error) {
      console.log(error);
    }
  };


const register = async (req,res)=>{
    try {
        const { fullname, email, password, phone_number, child, profile_pic } =
        req.body;
  
      if (
        [fullname, email, phone_number, password, child].some(
          (field) => field?.trim() === ""
        )
      ) {
        return res.status(400).json(new ApiError(400, "All fields are required"));
      }
  
      const existedUser = await Parent.findOne({
        $or: [{ fullname }, { email }],
      });
  
      if (existedUser) {
        return res
          .status(400)
          .json(new ApiError(400, "user already exists with same name or email"));
      }
  
      const parent = await Parent.create({
        fullname,
        email,
        phone_number,
        password,
        child,
      });
  
      return res
        .status(200)
        .json(new ApiResponse(200, "user created sucessfully", parent));
    } catch (error) {
        return res.status(500).json(
          new ApiError(500,error?.message)
        )
    }
}


const login = async (req,res)=>{
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json(new ApiError(400, "email and password is required"));
      }

    const parent = await Parent.findOne({ email });

    if (!parent) {
      return res.status(400).json(new ApiError(400, "parent not found"));
    }

    const isPasswordValid = await parent.isPasswordCorrect(password);


    if (!isPasswordValid) {
      return res.status(401).json(new ApiError({
         statusCode:401,
         message:"incorrect password"
      }));
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
      parent._id
    );

    const loggedInUser = await Parent.findById(parent._id).select(
      "-password -refreshToken"
    );

    return res.status(200).json(
      new ApiResponse(200, "parent logged in succesfully", {
        accessToken,
        refreshToken,
      })
    );
    } catch (error) {
        return res.status(500).json(
          new ApiError(500,error?.message)
        )
    }
}


const logout = async (req,res)=>{
    try {
        
    } catch (error) {
        return res.status(500).json(
          new ApiError(500,error?.message)
        )
    }
}


const updateAccountDetails = async (req,res)=>{
    try {
        
    } catch (error) {
        return res.status(500).json(
          new ApiError(500,error?.message)
        )
    }
}


const changePassword = async (req,res) => {
  console.log("yes");
  try {
    const {currentPassword,newPassword} = req.body;
    if(!currentPassword || !newPassword || currentPassword.trim().length == 0 || newPassword.trim().length == 0){
      return res.status(400).json(
        new ApiResponse(400, "current and new both passwords are required")
      )
    }
    const parentId = req?.parent._id;
    const parent = await Parent.findById(parentId);
    if(!parent){
      return res.status(404).json(
        new ApiError(404,"parent not found")
      )
    }
    const isPC = await parent.isPasswordCorrect(currentPassword);
    console.log(isPC);  
    if(isPC){
        parent.password = newPassword;
        parent.save({validateBeforeSave:false});
        return res.status(200).json(
          new ApiResponse(200,"password updated sucessfully!")
        )
    }else{
      res.status(400).json(
        new ApiError(400,"current password is invalid!")
      )
    }
  } catch (error) {
    return res.status(error?.status || 500 , error?.message || "something went wrong!")
  }
}

const refreshAccessToken = async (req,res)=>{
    try {
        
    } catch (error) {
        return res.status(500).json(
          new ApiError(500,error?.message)
        )
    }
}

export {
    register,
    login,
    logout,
    updateAccountDetails,
    refreshAccessToken,
    changePassword
}