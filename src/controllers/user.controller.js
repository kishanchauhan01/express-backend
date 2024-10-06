import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user detail from frontend
  // validation - not empty
  // check user already exists: username, email
  // check for images, check for avatar
  // upload them to coudinary, avtar(check)
  // create user object - create an entry in db
  // remove password and referesh token filed from response
  // check for user creation
  // return response

  const { fullName, email, username, password } = req.body;
  console.log("email: ", email);

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required...");
  } //We can also validate the email contains "@" and domian name or not

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if(existedUser) {
    throw new ApiError(409, "User already exists")
  }

  req.files?.avatar

});

export { registerUser };
