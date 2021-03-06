const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  try {
    const header = req.headers["authorization"];
    if (header) {
      const token = header.split(" ")[1];
      jwt.verify(token, "secret", async (err, data) => {
        // console.log(data);
        if (err) {
          res.status(403).json({ err: "Invalid token " });
        } else {
          next();
        }
      });
    } else {
      res.status(403).json({ err: "Missing token " });
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = { verifyToken };
