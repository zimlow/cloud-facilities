import jwt, { JwtPayload } from "jsonwebtoken";

const DEFAULT_SIGN_OPTION = {
  expiresIn: "1h",
};

export function signJwtAccessToken(payload, options) {
  const secret = process.env.SECRET_KEY;

  const token = jwt.sign(payload, secret, (options = DEFAULT_SIGN_OPTION));
  return token;
}

export function verifyJwt(token) {
  try {
    const secret = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    console.log(error);
    return null;
  }
}
