const { json } = require("body-parser");
const { query } = require("express");
var fs = require("fs");
const path = require("path");

//Normaly a set default exist a file
const checkexists = async() => {
    const isexist = await fs.existsSync(`./student.json`);
    if (!isexist) {
        await fs.promises.writeFile("student.json", JSON.stringify([""]));

        console.log("New student.json file was created");
    } else console.log("Student json tồn tại");
    return true;
};

//Show all data in file
const readall = async() => {
    try {
        // Read the file student JSON
        let data = await fs.promises.readFile("./student.json", "utf8");
        // Change it to Object and return them let sever make response
        let convert = JSON.parse(data);

        if (convert.length > 0) return convert;
        else return [];
    } catch (err) {
        console.log("Load dữ liệu thất bại ");
        return false;
    }
};
//////////////////
const findstudentbyName = async(name) => {
    try {
        let list = await readall();
        if (list == false) return false;
        else {
            let result = list.filter((value) => value.name == name);
            if (result.length > 0) {
                return result;
            } else return false;
        }
    } catch (err) {
        return false;
    }
};

///////////////////////////////////////

// have 2 ways to make this case
// 1 . U can set up input query by set default nam="", id=" "v.v. if input is null you can check anorther to make a querystring
//2. I use compare obj with obj  no matter input string is what  i format  orgin object equal queryobject  and
// i compare it  and found own index  fianlly show  object to begin data
const findstudentbyQuery = async(query) => {
    try {
        //Get orgin
        let olddata = await readall();
        if (olddata == false) return false;
        else {
            let data = [...olddata];

            // Format query object
            let format = {
                id: query.id,
                name: query.name,
                age: query.age,
                gender: query.gender,
                deparment: query.deparment,
            };

            for (let i in format) {
                if (format[i] == undefined) delete format[i];
            }

            //if not exist key of orgin object remove it

            let fixdata = data.map((check) => {
                return removekeyobject(check, query);
            });

            // Compare queryobject after format and orgin object after format to array[index,index,vv.v]
            let final = fixdata
                .map((value, indx) => {
                    if (campareobj(value, format) == true) return indx;
                })
                .filter((data) => data != undefined);

            // show  Array[{object},{object}]
            return refixobj(final);
        }
    } catch (err) {
        return false;
    }
};

const removekeyobject = (obj, query) => {
    let arrquery = Object.keys(query);
    let newobj = obj;

    for (let i in newobj) {
        if (arrquery.includes(i) == false) {
            delete newobj[`${i}`];
        }
    }

    return newobj;
};

const campareobj = (obj1, obj2) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
};

const refixobj = async(arr) => {
    let old = await readall();

    arr = arr.map((data) => {
        return old[data];
    });

    return arr;
};

/////////////////////////////////

//Add new student
const addstudent = async(data) => {
    try {
        //Get orgin
        let origin = await readall();
        if (origin == false) origin = [];
        let newlist = origin;

        console.log(newlist);
        //Auto set new id equal length of list
        data.id = newlist.length;
        let newstudent = data;

        newlist = [...newlist, newstudent];

        newlist = JSON.stringify(newlist);

        let result = await fs.promises.writeFile("./student.json", newlist);

        return origin;
    } catch (err) {
        console.log("thêm mới thất bại");

        return false;
    }
};
//////////////////////////////////////

const updateobj = (obj, update) => {
    let newobj = obj;

    for (let a in obj) {
        for (let b in update) {
            if (a == b) obj[a] = update[b];
        }
    }

    return newobj;
};

const updateall = async(update) => {
    try {
        let list = await readall();
        if (list == false) return false;
        else {
            let data = list;

            //All data so just direct update

            data = data.map((value) => {
                return updateobj(value, update);
            });

            data = JSON.stringify(data);

            let result = await fs.promises.writeFile("./student.json", data);

            console.log(data);

            return list;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
};

const updatestudentbyName = async(key, update) => {
    try {
        let oldlist = await readall();
        if (oldlist == false) return false;
        else {
            //found by name

            let found = oldlist.map((value) => {
                if (value.name == key) { return updateobj(value, update) } else return value;
            });

            // If exist found it reshow the list to client and save update to file

            if (found.length > 0) {
                found = JSON.stringify(found);
                let result = await fs.promises.writeFile("./student.json", found);
                return true;
            } else return false;
        }
    } catch (err) {
        console.log("Update thất bại");
        throw err;
    }
};

const deletestudentbyName = async(name) => {
    try {
        let oldlist = await readall();

        if (oldlist == false) return false;
        else {
            let list = oldlist;
            check = list.filter((data) => data.name == name);

            if (check.length > 0) {
                list = list.filter((data) => data.name != name);

                list = JSON.stringify(list);
                let result = await fs.promises.writeFile("./student.json", list);
                return true;
            } else {
                return false;
            }
        }
        l;
    } catch (err) {
        console.log("Lỗi rồi xóa không được");
        return false;
    }
};

module.exports = {
    deletestudentbyName,
    updatestudentbyName,
    updateall,
    addstudent,
    readall,
    findstudentbyQuery,
    findstudentbyName,
};