import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user detail from frontend
  const { fullName, email, username, password } = req.body;
  console.log("email: ", email);

  // validation - not empty
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required...");
  } //We can also validate the email contains "@" and domian name or not

  // check user already exists: username, email
  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  // check for images, check for avatar
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverLocalPath = req.files?.coverImage[0]?.path;
  console.log(req.files);

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required  ");
  }

  // upload them to coudinary, avtar(check)
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required  ");
  }

  // create user object - create an entry in db
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });
});

export { registerUser };

// get user detail from frontend
// validation - not empty
// check user already exists: username, email
// check for images, check for avatar
// upload them to coudinary, avtar(check)
// create user object - create an entry in db
// remove password and referesh token filed from response
// check for user creation
// return response
