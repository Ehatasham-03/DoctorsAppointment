import jwt from "jsonwebtoken";

// admin authentication middleware

const authAdmin = async (req, res, next) => {
  const { admintoken } = req.headers
  
  
  if (!admintoken) {
    return res.status(401).json({ success: false, message: "Not authorized, login again" });
  }

  try {
    const tokenDecode =  jwt.verify(admintoken, process.env.JWT_SECRET);

    if (tokenDecode !== (process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD)) {
      return res.status(401).json({ success: false, message: "Not authorized, invalid token" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

export default authAdmin