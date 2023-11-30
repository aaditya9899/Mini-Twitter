// const AppError = require("../utils/AppError");

// const validationError = (err) => {
//   errors = Object.values(err).map((el) => el.message);
//   const message = `Invalid input data. ${error.join(" ")}`;
//   return new AppError(message, 400);
// };

exports.globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Error";
  return res.status(err.statusCode).json({
    status: err.status,
    msg: err.message,
    error: err,
    stack: err.stack,
  });
};
