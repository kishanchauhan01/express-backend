//Higher order function return an another function
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {//this is the parameter of the requestHandler.(Because this is the higher order function)
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};//Here we return a function in this higher order function


export { asyncHandler };

//Here, for e.g if store the execution of asyncHandler in a variable then we got a exicutable function and if execute that variable like if name of variable name is hello then if do hello() then our return function from asyncHandler will execute.

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
