const jwt = require('jsonwebtoken')
require('dotenv').config()
const { User } = require('../db/db')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(" ")[1]; // *  [bearer , token] [0 , 1]
        jwt.verify(token, process.env.JWT_secret_key, async (err, payload) => {

            try {
                if (err) {
                    return res.status(401).json({ error: err });
                }
                const user = await User.findOne({
                    where: { id: payload.id },
                });
                user.password = undefined
                req.user = user;
                next();
            } catch (error) {
                console.log(error);
            }
        })
    } else {
        return res.status(403).json({ error: "Forbidden 🛑🛑" });
    }
}