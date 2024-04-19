class CustomError extends Error{
  constructor(error, statusCode){
      super(error.msg||"error");
      this.statusCode = statusCode;
      this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
      this.errors=error;
      this.isOperational = true;
      this.isError=true;
      Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
