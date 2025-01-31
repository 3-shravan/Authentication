class ErrorHandler extends Error {
   constructor(statusCode, message) {
      super(message);
      this.statusCode = statusCode;
   }
}

export const errorMiddleware = (err, req, res, next) => {
   err.statusCode = err.statusCode || 500
   err.message = err.message || 'Internal Server Error'
   
   if (err.name === 'CastError') {
      const message = `Invalid ${err.path}: ${err.value}`;
      err = new ErrorHandler(400, message)
   }
   if (err.name === 'jsonWebTokenError') {
      const message = 'Invalid token.Try again !!!'
      err = new ErrorHandler(400, message)
   }
   if (err.name === 'TokenExpiredError') {
      const message = 'Token expired !!!'
      err = new ErrorHandler(400, message)
   }

   if (err.code === 11000) {
      const message = ` Duplicate ${Object.keys(err.keyValue)} entered`
      err = new ErrorHandler(400, message)
   }

   return res.status(err.statusCode).json({
      success: false,
      message: err.message
   })
}

export default ErrorHandler;