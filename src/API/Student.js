const express = require("express");
const router = express.Router();
const Controller = require("../Controller/crud");


router.get("/getall", async(req, res) => {
    let result = await Controller.readall();

    if (result != false) {
        res.send(result);


    } else
        res.send({ status: 404, message: " Not Found" });




});

//by params request exp: student/find/Vinh

router.get("/find/:name", async(req, res) => {

    const { name } = req.params;

    let result = await Controller.findstudentbyName(name);

    if (result != false) res.send(result);
    else {
        res.send({ status: "404", message: " Studentnot be found" });
    }
});

//by query

router.get("/find", async(req, res) => {
    // querystring request /student/find?age=31&&gender=Male

    let result = await Controller.findstudentbyQuery(req.query);
    if (result == false) res.send({ status: "404", message: "can't find data" });
    else res.send(result);
});

router.post("/add", async(req, res) => {
    const { name, age, gender, department } = req.body;



    let result = await Controller.addstudent({ name, age, gender, department });

    if (result != false) {
        res.send({ status: "200", message: "Thành Công thêm " });
    } else res.send({ status: "404", message: "Thất bại " });
});

router.patch("/update/all", async(req, res) => {
    const { update } = req.body;
    // object request is {update:{dataupdate}}
    console.log(update)
    let result = await Controller.updateall(update);

    if (result == false) res.send({ status: "404", message: "Some error" });
    else res.send(result);
});

router.put("/update/name", async(req, res) => {
    const { name, update } = req.body;
    //object request is {name:"",update:{updatedata}}
    console.log(name);
    let result = await Controller.updatestudentbyName(name, update);

    if (result == false) res.send({ status: "404", message: "Some error" });
    else res.send({ status: 200, message: "Update thành công" })
});

router.put("/delete/name", async(req, res) => {
    const { name } = req.body;


    let result = await Controller.deletestudentbyName(name);

    if (result == false) res.send({ status: "404", message: "Can't delete " });
    else
        res.send({ status: "200", message: "Xóa thành công " });
});

module.exports = router;