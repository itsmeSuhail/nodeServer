import CustomError from "./CustomError/CustomError.js";
import { verifyToken } from "./TokenManager/index.js";

export const validUser = (req, res, next) => {
  let token = null;
  let headerToken = req.headers.Authentication?.split("").pop();
  if (headerToken) token = headerToken;
  else token = req.cookies.user;
  if (!token)
    return next(
      new CustomError({ user: "user is not verified" }, 401, )
    );
  const isValidToken = verifyToken(token);
  if (!isValidToken)
    return next(
      new CustomError({
        tokenExpire: "your token has been expired",
      }, 400 )
    );
  const { id, username } = isValidToken;
  console.log(isValidToken, "Del");
  if (id && username) return next();
  return next(
    new CustomError( { user: "user is not verified" }, 401)
  );
};
