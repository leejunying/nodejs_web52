const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtConfig = process.env.TOKEN;

const generateToken = (user) => {

    console.log(user, jwtConfig)

    let token = jwt.sign({
            Email: user.Email,
            Lastname: user.Lastname,
            Firstname: user.Firstname,
            Address: user.Address,
        },
        jwtConfig,

        {
            subject: `${user.Firstname}${user.Lastname}`,
            expiresIn: "365d",
        }
    );
    console.log(token)
    return token
};

const verifyToken = async(token) => {
    let result = await jwt.verify(token, jwtConfig);

    console.log(result)
    return result
};

module.exports = {
    generateToken,
    verifyToken,
};