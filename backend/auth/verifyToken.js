import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  console.log("Authenticating token...");
  const authToken = req.headers.authorization;

  if (!authToken || !authToken.startsWith("Bearer ")) {
    console.log("No token or invalid token format.");
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const token = authToken.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.userId = decoded.id;
    console.log("Token authenticated, user ID:", req.userId);
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      console.log("Token has expired.");
      return res
        .status(401)
        .json({ success: false, message: "Token has expired" });
    }

    console.log("Invalid token.");
    return res.status(401).json({ åsuccess: false, message: "Invalid token" });
  }
};
