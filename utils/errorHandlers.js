import { errorLog } from "./logs.js";

export const tryCatch = (controller) => async (req, res, next) => {
  try {
    await controller(req, res);
  } catch (error) {
    return next(error);
  }
};

export const errorLogger = (error, req, res, next) => {
  errorLog(error);
  res.status(400).send(error.message);
};
