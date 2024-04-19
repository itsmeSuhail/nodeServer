import CustomError from "./CustomError/CustomError.js";
import { verifyToken } from "./TokenManager/index.js";

export const validUser = (req, res, next) => {
  let token = null;
  let headerToken = req.headers.Authentication?.split("").pop();
  if (headerToken) token = headerToken;
  else token = req.cookies.varifiedUser;
  if (!token)
    return next(
      new CustomError("bad credentials", 400, { user: "user is not verified" })
    );
  const isValidToken = verifyToken(token);
  if (!isValidToken)
    return next(
      new CustomError("session timeout", 400, {
        tokenExpire: "your token has been expired",
      })
    );
  const { id, user } = isValidToken;
  console.log(isValidToken, "Del");
  if (id && user) return next();
  return next(
    new CustomError("bad credentials", 400, { user: "user is not verified" })
  );
};
