import CustomError from "./CustomError.js";

const castErrorHandler = (err) => {
    return new CustomError({[err.path]:`${err.path} is not valid`}, 400,);
}

const duplicateKeyErrorHandler = (err) => {
 const errorBucket={}
  for(let key in err.keyValue){
    errorBucket[key]=`${key} is already exist`;
  };
 return new CustomError(errorBucket, 400,);
}

const validationErrorHandler = (err) => {
    const errorBucket={}
    Object.values(err.errors).map(error=>{
        const key=error.path||"";
        errorBucket[key]= error.message;
    });
    return new CustomError(errorBucket, 400);
}

const prodErrors = (res, error) => {
    if(error.isOperational){
        res.status(error.statusCode).json({
            status: error.statusCode,
            ...(error.errors&&({errors:error.errors}))
        });
    }else {
        res.status(500).json({
            status: 500,
            errors:{
                msg: 'Something went wrong! Please try again later.',
            }
        })
    }
}

export default (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    console.log(error.status)
    error.status = error.status || 'error';
        if(error.name === 'CastError') error = castErrorHandler(error);
        if(error.code === 11000) error = duplicateKeyErrorHandler(error);
        if(error.name === 'ValidationError') error = validationErrorHandler(error);

        prodErrors(res, error);
}