export const handleSuccessResponse = (res, statusCode, responseMessage) => {
   return res.status(statusCode).json({
      success: true,
      message: responseMessage
   })
}
export const handleErrorResponse = (res, statusCode, responseMessage) => {
   return res.status(statusCode).json({
      success: false,
      message: responseMessage
   })
}