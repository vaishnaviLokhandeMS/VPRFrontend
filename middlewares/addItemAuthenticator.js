const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  console.log(token);
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Failed to authenticate token' });

    req.userId = decoded.userId;
    console.log("User ID From Token: ");
    console.log(decoded.userId);
    next();
  });
};

const authenticateShopToken = (req, res, next) => {
  console.log("shop authentication started");
  const shopToken = req.headers['shop-token'];
  console.log(req.headers);
  if (!shopToken) return res.status(401).json({ message: 'No shop token provided' });

  jwt.verify(shopToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Failed to authenticate shop token' });

    req.shopId = decoded.shopId;
    req.shopUserId = decoded.userId;  // Correct assignment
    console.log("Shop ID Decoded : ");
    console.log(decoded.shopId);
    console.log("User ID Decoded from shopToken : ");
    console.log(decoded.userId);
    next();
  });
};

const verifyTokensMatch = (req, res, next) => {
  if (req.userId !== req.shopUserId) {
    return res.status(403).json({ message: 'User ID in tokens do not match' });
  }
  next();
};

module.exports = {
  authenticateToken,
  authenticateShopToken,
  verifyTokensMatch,
};
