import jwt from "jsonwebtoken";

export const verifyToken = function (req, res, next) {
  console.log("into the middleware");
  const token = req.headers["token"];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(500).json({ message: "Failed to authenticate token" });

    req.user = decoded; // Save the decoded information for use in other routes
    console.log(decoded);
    next();
  });
};
