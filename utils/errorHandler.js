export const errorHandler = (error, req, res, next) => {
  // Logging the error here
  console.log(error);
  // Returning the status and error message to client
  res.status(400).send(error.message);
};

export const tryCatch = (controller) => async (req, res, next) => {
  try {
    await controller(req, res);
  } catch (error) {
    return next(error);
  }
};
