import jwt from "jsonwebtoken";
export const makeJwt = (id) => {
  const token = jwt.sign({ id }, process.env.SECRETJWT, { expiresIn: "700d" });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", 
    maxAge: 700 * 24 * 60 * 60 * 60 * 1000,
  });
};
