import jwt from "jsonwebtoken";

export const makeJwt = (res, id) => {
  const token = jwt.sign({ id }, process.env.SECRETJWT, { expiresIn: "70d" });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 70 * 24 * 60 * 60 * 1000,
    sameSite: "none",
  });
};
