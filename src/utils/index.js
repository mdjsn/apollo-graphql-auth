const jwt = require("jsonwebtoken");

export const APP_SECRET = "appsecret321";


export const getUserId = context => {
  const Authorization = context.req.headers.authorization;
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const verifiedToken = jwt.verify(token, APP_SECRET);
    return verifiedToken && verifiedToken.userId;
  }
  throw new AuthError();
};

export class AuthError extends Error {
  constructor() {
    super("Not authorized");
  }
}
