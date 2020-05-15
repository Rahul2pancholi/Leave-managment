var express = require("express");
const error = "ERROR";
const success = "SUCCESS"
const duplicateId = "DUPLICATE_EMPLOYEE_ID"





var bodyParser = require("body-parser");
var path = require("path");
var app = express();
const fs = require("fs");
var project;
var year;
var loggedIn = false;
var urlencodedParser = bodyParser.urlencoded({ extended: true });
const publicDirectoryPath = path.join(__dirname, "../public");
var jsonFilePath; // path.join(__dirname, `../public/database/test_${project}_${year}.json`);
const jsonLeaveColor = path.join(
  __dirname,
  "../public/database/leave_color.json"
);

const viewsPath = path.join(__dirname, "../public/views");

const port = process.env.PORT || 3000;
app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(bodyParser.json());

console.log(publicDirectoryPath);
app.use(express.static(publicDirectoryPath));
app.get("/listUsers", function (req, res) {
  fs.readFile(jsonFilePath, "utf8", function (err, data) {
    console.log(data);
    res.send(data);
  });
});

app.get("", (req, res) => {
  res.render("index");
});



// type and length

app.get("/auth", (req, res) => {
  project = req.query.team;
  year = req.query.year;
  console.log( "RESULLT = ",typeof(project) == "string",project, typeof(Number(year)) == "number",year )

  if ((project != undefined && year != undefined) && ( typeof(project) == "string" && typeof(Number(year)) == "number"  )) {
    jsonFilePath = path.join(__dirname,`../public/database/test_${project}_${year}.json`);
    try {
      if (fs.existsSync(jsonFilePath)) {
        //file exists
        console.log(fileexist)
      }else{

        fs.writeFile(jsonFilePath,`{ "leave_detail" : {} ,"employee_name" :[]  }`, function (err) {
          if (err) throw err;
          console.log('File is created successfully.');
        }); 
      }
    } catch(err) {
      console.error(err)
    }
    console.log("loggein");
    loggedIn = true;
    res.redirect("/home");
  }
  console.log("failed");
});

app.get("/home", (req, res) => {
  if (loggedIn) {
    res.render("home", {
      name: "rahul",
      project: project,
      year: year,
    });
    loggedIn = false;
  } else {
    res.redirect("/");
  }
});

app.get("/test.json", (req, res) => {
  console.log(req);
  fs.readFile(jsonFilePath, "UTF8", function read(err, data) {
    res.send(employeeOrderChnage(JSON.parse(data)));
    
  });
 
  console.log("called");
});


app.get("/getvar", function (req, res) {
  res.send({ year: year });
});

app.post("/commentIMAGE", urlencodedParser, (req, res) => {
  console.log(req.body);
});
app.get("/LEAVE_COLOR", (req, res) => {
  res.sendFile(jsonLeaveColor);
  console.log("called");
});

app.get("/FLOATING_FILE", (req, res) => {
  res.sendFile(json_FloatLeave);
  console.log("called");
});

function checkDataLength(data) {
  if (data.length <= 0) {
    return {
      leave_detail: {},
      employee_name: {},
    };
  } else {
    return JSON.parse(data);
  }
}
/********************************ADDING NEW EMPLOYEE****************************** */
app.post("/NEW_EMPLOYEE", urlencodedParser, (req, res) => {
  //console.log(req.body.emp_data);
  fs.readFile(jsonFilePath, "UTF8", function read(err, data) {
    data = checkDataLength(data);

    // Invoke the next step here however you like
    //   console.log(data);   // Put all of the code here (not the best solution)
    status=addNewEmp(jsonFilePath, data, JSON.parse(req.body.emp_data)); // Or put the next step in a function and invoke it

   res.send(status);
  
  });
 
});

/************************************************************ */
app.post("/CHNAGE_ORDER", urlencodedParser, (req, res) => {
  //console.log(req.body.emp_data);
  fs.readFile(jsonFilePath, "UTF8", function read(err, data) {
    data = checkDataLength(data);

    // Invoke the next step here however you like
    //   console.log(data);   // Put all of the code here (not the best solution)
    status=chnageOrder(jsonFilePath, data, JSON.parse(req.body.emp_data)); // Or put the next step in a function and invoke it

   res.send(status);
  
  });
 
});

/***************************************************************************** */
app.post("/DELETE", urlencodedParser, (req, res) => {

  fs.readFile(jsonFilePath, "UTF8", function read(err, data) {
    if (err) {
      console.log(err);
    }
   // console.log(`data === ${data}`);
    data = checkDataLength(data);

    delEmp(jsonFilePath, data, JSON.parse(req.body.emp_name)); // Or put the next step in a function and invoke it
  });
  res.send();
});
/********************************************** ******************** */

app.post("/UPDATE", urlencodedParser, (req, res) => {
  fs.readFile(jsonFilePath, "UTF8", function read(err, data) {
    if (err) {
      console.log(err);
    }
  //  console.log(`data === ${data}`);
    update = JSON.parse(req.body.update);
    // newemp = JSON.parse(req.body.newemp);
    data = checkDataLength(data);
  
    res.send(updateEmpData(jsonFilePath, data, update));
  });


});

var server = app.listen(port, function () {
  var host = server.address().address;
  console.log("Example app listening at http://%s:%s", host, port);
  console.log(__dirname);
});



function chnageOrder(jsonFilePath, filedata, resData)
{
  employee = filedata.employee_name;
  leave = filedata.leave_detail;
  tempArray = new Array();

  for(var j in resData)
  {
    for(var i in employee)
    {
      if( resData[j].id == employee[i].id)
      {
        console.log("BEFORE = ",resData[j].order,employee[i].name,employee[i].order)
        employee[i].order=resData[j].order
        console.log("AFTER = ",resData[j].order,employee[i].name,employee[i].order)
      }
    }
  }

 
console.log(employee);
  let finalData=`{ "leave_detail" :  ${JSON.stringify(leave)} ,"employee_name" : ${JSON.stringify(employee)} }`;
  fs.writeFile(jsonFilePath,finalData,(err) =>  {if (err) status=error;} );
  status=finalData;





}
function delEmp(jsonFilePath, filedata, resData) {
  //console.log("DELETE = ",resData);
  var deleted=false;



  demp = filedata.employee_name;
  dlev = filedata.leave_detail;



   for (var i in resData) {

      for (var j in demp) {

        console.log(demp[j].id, resData[i])
        if(demp[j].id == resData[i] )
        {
          demp.splice(j, 1);
          deleted=true;
        }
        if(deleted == true) delete dlev[resData[i]] ; deleted=false;
      }
      
 }

// console.log("delete = " ,demp);
  // console.log(demp);
  // console.log(dlev);
  // dlev[val] = {};

let count=1;
for(let i in dlev)
{
  dlev[i].order=count;
  count++;
}



  console.log("LENGTH CHEKC = ",demp.length,Object.keys(dlev).length);
  fs.writeFile(
    jsonFilePath,
    `{ "leave_detail" :  ${JSON.stringify(
      dlev
    )} ,"employee_name" : ${JSON.stringify(demp)} } `,
    function (err) {
      if (err) console.log(err);
    }
  );
}

function updateEmpData(jsonFilePath, filedata, update) {
  demp = filedata.employee_name;
  dlev = filedata.leave_detail;

  update.forEach(function (val, ind) {
    // console.log(val)
    Object.keys(val).forEach(function (ival, iind) {
      Object.keys(val[ival]).forEach(function (innerval, innerindex) {

    
         leave = val[ival][innerval];
        
         if (leave.leavetype.length != 0 ) {
                        dlev[ival][innerval] = leave;
          } else {
        //   //delete the object //that means user hase removed value from the exiting cell
          delete dlev[ival][innerval];
         }

         console.log("output = ",leave,"OUTPUT2 = ",dlev[ival][innerval]);
      });
    });
  });


let finalData=`{ "leave_detail" :  ${JSON.stringify(dlev)} ,"employee_name" : ${JSON.stringify(demp)} } `
  fs.writeFile(jsonFilePath,finalData,function (err) {
      if (err) console.log(err);
    }
  )

  return(finalData);
}

function addNewEmp(jsonFilePath, filedata, resData) {



  demp = filedata.employee_name;
  dlev = filedata.leave_detail;
  let status;

  //console.log("DATA1 = ",resData)

  for(let i in resData)
  {

    console.log("output", dlev[resData[i].id])
    if(resData[i].id.length > 0 )
    {

    if (dlev[resData[i].id] == undefined) {
     
      demp.push(resData[i]);
      dlev[resData[i].id] = {};
let finalData=`{ "leave_detail" :  ${JSON.stringify(dlev)} ,"employee_name" : ${JSON.stringify(demp)} }`;
      fs.writeFile(jsonFilePath,finalData,(err) =>  {if (err) status=error;} );
      status=finalData;
    } else {

      status=duplicateId;
    }
  }
    else{
      status="INVALID_ID"
    }

  }

  return status;
}

function employeeOrderChnage(filedata)
{

  employee_name = filedata.employee_name;
  leave_detail = filedata.leave_detail;

  console.log({ employee_name,leave_detail} )
  employee_name.sort((a,b) => a.order - b.order);


  return JSON.stringify({ employee_name,leave_detail});

}