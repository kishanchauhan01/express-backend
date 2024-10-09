//Higher order function return an another function
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {//this is the parameter of the requestHandler.(Because this is the higher order function)
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};//Here we return a function in this higher order function


export { asyncHandler };

// const asyncHandler = (fn) => {async () => {}}// this is same as below code

// const asyncHandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next );
//   } catch (error) {
//     res.status(error.code || 500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
