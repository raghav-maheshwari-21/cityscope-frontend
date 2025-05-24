const jwt = require('jsonwebtoken');

const getUserId = (token : any) => {
    try {
        const JWT_SECRET = "1234567890";
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded.userId || null;
    } catch (error) {
        console.error("Error in getUserId:", error);
        return null;
    }
}

module.exports = {
    getUserId
}
