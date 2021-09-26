const TokenUtil = require("../Ultis/token");

const checkToken = async(req, res, next) => {
    try {


        const token = req.headers.authorization;



        let fixtoken
        if (token.indexOf(" ") >= 0)
            fixtoken = token.split(" ")


        if (!fixtoken[1]) {
            res.sendStatus(403);
        }
        const verifyToken = await TokenUtil.verifyToken(fixtoken[1]);

        if (!verifyToken) {
            res.send(false);
        } else {


            req.data = [{...verifyToken }];
        }

        return next();
    } catch (error) {
        res.send(false);
    }
};

module.exports = checkToken