const jwt = require("jsonwebtoken");

// Extract function
module.exports = (req, res, next) => {

    // Check for the token
    const token = req.header("x-auth-token");

    // Check if not token - 401:Unauthorized
    if (!token) return res.status(401).json([{ message: "No token, authorization denied!", type: "error" }]);

    // Verify token is valid
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded.user;

        next();

    } catch (error) {
        res.status(401).json([{ message: "Token is not valid", type: "error" }]);
    }

}