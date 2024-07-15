import User from "../../Models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../../utils/sendMail.js";
import sendResetMail from "../../utils/sendResetMail.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  try {
    const token = signToken(user._id);
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    res.cookie("jwt", token, cookieOptions);

    user.password = undefined;

    res.status(statusCode).json({
      message: "logged in successfully",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const createActivationToken = (user) => {
  try {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

    const token = jwt.sign(
      {
        user,
        activationCode,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "5m",
      }
    );

    return { token, activationCode };
  } catch (error) {
    console.log(error);
  }
};

//////Activate User//////////
//////Activate User//////////
//////Activate User//////////
//////Activate User//////////

export const activateUser = async function (req, res, next) {
  try {
    console.log("hellow from activation");

    const { activation_token, activation_code } = req.body;

    const newUser = jwt.verify(activation_token, process.env.JWT_SECRET);
    // console.log(newUser)

    if (newUser.activationCode !== activation_code) {
      return next(new Error("Invalid activation code", 400));
    }

    const { name, email, password } = newUser.user;
    //    console.log(email)
    const existUser = await User.findOne({ email });

    if (existUser) {
      return next(new Error("Email already exist", 400));
    }

    const user = await User.create({
      name,
      email,
      password,
    });
    // console.log(user)

    res.status(201).json({
      message: "Account created please Login to continue",
    });
  } catch (error) {
    console.log(error);
  }
};

//////SIGNUP//////////
//////SIGNUP//////////
//////SIGNUP//////////
//////SIGNUP//////////

export const userRegisterHandler = async function (req, res, next) {
  try {
    const { name, email, password } = req.body;

    const EncryptedPassword = await bcrypt.hash(password, 12);

    const user = {
      name: name,
      email: email,
      password: EncryptedPassword,
    };

    const activationToken = createActivationToken(user);
    const activationCode = activationToken.activationCode;
    const data = { user: { name: user.name }, activationCode };

    try {
      sendMail({
        email: user.email,
        subject: "Activate Your Account",
        template: "activation-mail.ejs",
        data: data,
      });
    } catch (error) {
      throw new error();
    }

    res.status(201).json({
      message: `please check your email ${user.email} to Verify your account`,
      activationToken: activationToken.token,
    });
  } catch (error) {
    console.log(error);
  }
};

////???? LOGIN ????////
////???? LOGIN ????////
////???? LOGIN ????////

export const userLoginHandler = async function (req, res, next) {
  try {
    console.log(`from login`);

    const email = req.body.email;
    const password = req.body.password;

    console.log(`from login ${email} ${password}`);

    if (!email || !password) {
      return res
        .status(401)
        .json({ message: "please provide email and password" });
    }
    const user = await User.findOne({ email }).select("+password");
    console.log(user);

    if (user === null) {
      return res
        .status(401)
        .json({ message: "please provide email and password" });
    }
    const correctPassword = await bcrypt.compare(password, user.password);

    if (!user || !correctPassword) {
      console.log("ENTERED IN CONDITION");
      return res
        .status(401)
        .json({ message: "please provide email and password" });
    }

    createSendToken(user, 200, res);
  } catch (error) {
    console.log(error);
  }
};

////???? CHANGE PASSWORD ????////
////???? CHANGE PASSWORD ????////
////???? CHANGE PASSWORD ????////

export const changePassword = async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;
  console.log("in change password", email);
  try {
    // Fetch user from the database by email
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if current password is correct
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect current password" });
    }

    // Hash the new password

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    user.password = undefined;

    res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

////???? FORGET PASSWORD ????////
////???? FORGET PASSWORD ????////
////???? FORGET PASSWORD ????////

export const forgetPassword = async function (req, res, next) {
  const { email } = req.body;
  console.log("in Forget password", email);
  try {
    // Fetch user from the database by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const activationToken = createActivationToken(user);
    const activationCode = activationToken.activationCode;
    const data = { user: { name: user.name }, activationCode };

    try {
      sendResetMail({
        email: user.email,
        subject: "Reset Password",
        template: "activation-mail.ejs",
        data: data,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed try again later", error: error.message });
    }

    res.status(200).json({
      message: `We have sent a Code to your email ${user.email} to reset your account`,
      activationToken: activationToken.token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const resetPassword = async function (req, res, next) {
  try {
    console.log("Hello from reset");

    const { activation_token, activation_code } = req.body;

    const newUser = jwt.verify(activation_token, process.env.JWT_SECRET);

    if (newUser.activationCode !== activation_code) {
      return next(new Error("Invalid activation code", 400));
    }
    const activationToken = createActivationToken(activation_code);
    res.status(200).json({
      message: `Add new Password`,
      activationToken: activationToken.token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const Users = await User.find();
    res.json(Users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
