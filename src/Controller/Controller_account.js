const bcrypt = require("bcryptjs");
const token = require("../Ultis/token");

const Login = async(Email, Password) => {
    try {
        const defaultdata = {
            Email: "LTVvinh@gmail.com",
            Password: "iloveyou",
            Firstname: "Lý",
            Lastname: "Tuấn Vinh",
            Address: "2222 Phạm Thế Hiển Q8 TPHCM",
        };
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(defaultdata.Password, salt);
        const hashinput = bcrypt.hashSync(Password, salt);

        if (Email.trim() === defaultdata.Email.trim()) {


            if (await bcrypt.compare(Password.trim(), hash) === true) {
                let clienttoken = await token.generateToken(defaultdata);
                return clienttoken
            } else {
                return { message: "Password not correct" };
            }
        } else {
            return { message: "account not exist" };
        }
    } catch (err) {
        return err;
    }
};

module.exports = {
    Login,
};