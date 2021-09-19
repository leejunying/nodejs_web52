var fs = require("fs");
const path = require("path");

const checkexists = async () => {
  const isexist = await fs.existsSync(`./student.json`);
  if (!isexist) {
    await fs.promises.writeFile(
      "student.json",
      JSON.stringify([""]),

      (err) => {
        if (err) throw err;

        console.log("Lỗi không tạo được");
      }
    );

    console.log("New student.json file was created");
  } else console.log("Student json tồn tại");
  return true;
};

const readall = async () => {
  try {
    const data = await fs.promises.readFile("./student.json", "utf8");

    console.log(JSON.parse(data));
  } catch (err) {
    console.log("Load dữ liệu thất bại ");
    throw err;
  }
};

const findstudentbyName = async (key) => {
  try {
    const data = await fs.promises.readFile("./student.json", "utf8");
    let list = JSON.parse(data);

    let found = list.filter(
      (data) => JSON.parse(data).name.includes(key) == true
    );

    if (found.length > 0) {
      console.log(found);
      return found;
    }
    console.log("không thấy nha");
  } catch (err) {
    console.log("Load dữ liệu thất bại ");
    throw err;
  }
};

const addstudent = async (data) => {
  try {
    const oldlist = await fs.promises.readFile("./student.json", "utf8");
    let newlist = JSON.parse(oldlist);

    if (newlist.length == 1 && newlist[0] == "") newlist = [];

    data.id = newlist.length;
    let newstudent = JSON.stringify(data);

    newlist = [...newlist, newstudent];

    await fs.promises.writeFile(
      "./student.json",
      JSON.stringify(newlist),
      () => {
        if (err) console.log("Không thêm đươ5c");

        throw err;
      }
    );
  } catch (err) {
    console.log("thêm mới thất bại");
    throw err;
  }
};

const foundindx = async(key) => {
  let found = await findstudentbyName(key);

  if (found == undefined) 
  {
      console.log("không có thằng này")
      found=[]
  }
  else {
    found = found.map((data) => JSON.parse(data).id);
  }

  console.log(found)
  return found;
};

const updatestudentbyName = async (key, obj) => {
  try {
    let newupdate;
    const oldlist = await fs.promises.readFile("./student.json", "utf8");

    //update found frist
    let found = await foundindx(key);

    //update new list

    

    let newlist = JSON.parse(oldlist);
    newlist = newlist.map((data) => {
      if (found.includes(JSON.parse(data).id) == true) {
        return JSON.stringify({ ...obj, id: JSON.parse(data).id });
      } else return data;
    });
 

    await fs.promises.writeFile(
      "./student.json",
      JSON.stringify(newlist),
      () => {
        if (err) console.log("Lỗi update ");
        throw err;
      }
    );
    console.log("Update thành công");
  } catch (err) {
    console.log("Update thất bại");
    throw err;
  }
};

const deletestudentbyName = async (key) => {
  try {
    let found = await foundindx(key);

    if(found!=[])
    {
    const oldlist = await fs.promises.readFile("./student.json", "utf8");

    let newlist = JSON.parse(oldlist);
    
    newlist=newlist.filter(data=>found.indexOf(JSON.parse(data).id)==-1)
    await fs.promises.writeFile(
        "./student.json",
        JSON.stringify(newlist),
        () => {
          if (err) console.log("Không xóa được");
  
          throw err;
        }
      );

    console.log("Xóa thành công")
    console.log(newlist)
  }
  else
  {

    console.log("Không có ai để xóa")
  }
  
  
  
  } catch (err) {
    console.log("Lỗi rồi xóa không được");
    throw err;
  }
};

const main = async () => {
  //   )

  if ((await checkexists()) == true) {
    // findstudentbyName("Vinh");
    // addstudent({
    //   id: "",
    //   name: "Trai  Hán",
    //   age: "55",
    //   gender: "Male",
    //   department: "Bán  thận",
    // });
    // updatestudentbyName("Trai Việt Nam", {
    //   id: "",
    //   name: "Củ khoai tây",
    //   age: "5",
    //   gender: "vô tính",
    //   department: "củ",
    // });
    // deletestudentbyName("Trai  Hán")
  }
  readall();
};

main();
