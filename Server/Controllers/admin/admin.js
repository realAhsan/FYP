import Admin from "../../Models/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  // if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const adminRegisterHandler = async function (req, res, next) {
  const { name, email, password } = req.body;

  const EncryptedPassword = await bcrypt.hash(password, 12);
  const admin = await Admin.create({
    name,
    email,
    password: EncryptedPassword,
  });

  console.log(`signup console ${admin}`);

  res.status(201).json({ message: "success" });
};

export const adminLoginHandler = async function (req, res, next) {
  // const { email, password } = req.body;
  const email = req.body.email;
  const password = req.body.password;

  console.log(`from login ${email} ${password}`);

  if (!email || !password) {
    return res
      .status(401)
      .json({ message: "please provide email and password" });
  }
  const admin = await Admin.findOne({ email }).select("+password");
  console.log(admin);

  const correctPassword = await bcrypt.compare(password, admin.password);

  if (!admin || !correctPassword) {
    console.log("ENTERED IN CONDITION");
    return res
      .status(401)
      .json({ message: "please provide email and password" });
  }

  createSendToken(admin, 200, res);
};
