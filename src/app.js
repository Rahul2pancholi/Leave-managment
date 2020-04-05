var express = require('express');
var bodyParser = require('body-parser')
var path = require("path");
var app = express();
const fs = require("fs");
var project="CB";
var year="2020";
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const publicDirectoryPath = path.join(__dirname, "../public");
const jsonFilePath = path.join(__dirname, `../public/database/test_${project}_${year}.json`);
const jsonLeaveColor = path.join(__dirname , "../public/database/leave_color.json");
const json_FloatLeave= path.join(__dirname , "../public/database/floating_leave.json");
const viewsPath =  path.join(__dirname, "../public/views");

const port = process.env.PORT || 3000;
app.set('view engine', 'hbs')
app.set('views',viewsPath)
app.use(bodyParser.json());

console.log(publicDirectoryPath);
app.use(express.static(publicDirectoryPath))
app.get('/listUsers', function (req, res) {
    fs.readFile(jsonFilePath, 'utf8', function (err, data) {
        console.log(data);
        res.send(data);
    });

})  

app.get('', (req, res) => {
    res.render("index", {
          "name" : "rahul"  
    });
})


app.get('/test.json', (req, res) => {
    console.log(req);
    res.sendFile(jsonFilePath);
    console.log("called")

})

app.post('/commentIMAGE',urlencodedParser, (req, res) => {
   
    console.log(req.body)

})
app.get('./leave_color.json', (req, res) => {
    res.sendFile(jsonLeaveColor);
    console.log("called")

})

app.get('/FLOATING_FILE', (req, res) => {
    res.sendFile(json_FloatLeave);
    console.log("called")

})


// app.get('/public/database/floating_leave.json', (req, res) => {
//     res.sendFile(__dirname + "/" + "public/database/floating_leave.json");
//     console.log("called")

// })


app.get('/report/report.html', (req, res) => {
    res.sendFile(__dirname + "/" + "report/report.html");
    console.log("called")

})




app.get('/report/js_report.js', (req, res) => {
    res.sendFile(__dirname + "/" + "report/js_report.js");
    console.log("called")

})



/********************************ADDING NEW EMPLOYEE****************************** */
app.post('/NEW_EMPLOYEE', urlencodedParser, (req, res) => {
    console.log(req.body.emp_data);
    fs.readFile(jsonFilePath, 'UTF8', function read(err, data) {
        if (err) {
           
        }


        // Invoke the next step here however you like
        //   console.log(data);   // Put all of the code here (not the best solution)
        addNewEmp(JSON.parse(data), JSON.parse(req.body.emp_data));          // Or put the next step in a function and invoke it
    });
    res.send();
});

/***************************************************************************** */
app.post('/DELETE', urlencodedParser, (req, res) => {
    console.log(req.body.emp_data);
    fs.readFile(jsonFilePath, 'UTF8', function read(err, data) {
        if (err) {
            console.log(err)

        }


        // Invoke the next step here however you like
        //   console.log(data);   // Put all of the code here (not the best solution)
        delEmp(JSON.parse(data), JSON.parse(req.body.emp_name));          // Or put the next step in a function and invoke it
    });
    res.send();
});
/********************************************** ******************** */




app.post('/UPDATE', urlencodedParser, (req, res) => {


    fs.readFile(jsonFilePath, 'UTF8', function read(err, data) {
        if (err) {
            console.log(err)
        }
        update = JSON.parse(req.body.update);
        newemp = JSON.parse(req.body.newemp);
        filedata = JSON.parse(data);
        console.log(newemp);
        updateEmpData(filedata, update, newemp);
    });





    // fs.writeFile(jsonFilePath, `{ "leave_detail" :  ${req.body.emp_data} ,"employee_name" : ${req.body.emp_nm} } `, function (err) {
    //     if (err) throw err;
    //     console.log(err);
    //   });




    res.send("all_good");

})

var server = app.listen(port, function () {

    var host = server.address().address
    console.log("Example app listening at http://%s:%s", host, port)
    console.log(__dirname);
})





function delEmp(filedata, resData) {
    demp = filedata.employee_name;
    dlev = filedata.leave_detail;


    console.log(delete demp[resData]);
    console.log(delete dlev[resData]);

    console.log(demp);
    console.log(dlev);
    // dlev[val] = {};



    fs.writeFile(jsonFilePath, `{ "leave_detail" :  ${JSON.stringify(dlev)} ,"employee_name" : ${JSON.stringify(demp)} } `, function (err) {
        if (err)
        console.log(err);
        
       
    });
}

function updateEmpData(filedata, update, newemp) {
    demp = filedata.employee_name;
    dlev = filedata.leave_detail;
    // console.log(newemp);
    // console.log(update);


    //For new leave
    newemp.forEach(function (val, ind) {
        // console.log(val)
        Object.keys(val).forEach(function (ival, iind) {
            //    console.log(ival);
            // console.log(val[ival])
            // console.log(Object.keys(val[ival]));
            Object.keys(val[ival]).forEach(function (innerval, innerindex) {
                // console.log(innerval)
                leave = val[ival][innerval];
                // console.log(JSON.stringify(leave)+"=="+innerval)
                if (leave["leavetype"] != "") {
                    dlev[ival][innerval] = leave;

                }
            })



        })

    })
    /****************UPDATE******************** */
    update.forEach(function (val, ind) {
        // console.log(val)
        Object.keys(val).forEach(function (ival, iind) {
            //    console.log(ival);
            // console.log(val[ival])
            // console.log(Object.keys(val[ival]));
            Object.keys(val[ival]).forEach(function (innerval, innerindex) {
                // console.log(innerval)
                leave = val[ival][innerval];
                // console.log(JSON.stringify(leave)+"=="+innerval)
                if (leave["leavetype"] != "") {
                    // dlev[ival][innerval]  = leave;


                    dlev[ival][innerval] = leave
                    console.log(dlev[ival][innerval])


                }
                else {

                    //delete the object
                    console.log(delete dlev[ival][innerval])

                }
            })



        })

    })

    /********************************* */



    // fs.writeFile(jsonFilePath, `{ "leave_detail" :  ${JSON.stringify(dlev)} ,"employee_name" : ${JSON.stringify(demp)} } `, function (err) {
    //     if (err) 
    //     console.log(err);
    //      throw err;
    // });

    fs.writeFile(jsonFilePath, `{ "leave_detail" :  ${JSON.stringify(dlev)} ,"employee_name" : ${JSON.stringify(demp)} } `, function (err) {
        if (err) 
        console.log(err);
        
    });
}


function addNewEmp(filedata, resData) {
    demp = filedata.employee_name;
    dlev = filedata.leave_detail;

    Object.keys(resData).forEach(function (val, ind)
     {
                 console.log(val);

        if (demp[resData[val]] == undefined)
         {
            Object.keys(resData).forEach(function (val, ind) 
            {
                demp[val] = resData[val];
                console.log(demp);
                dlev[val] = {};
            });


            fs.writeFile(jsonFilePath, `{ "leave_detail" :  ${JSON.stringify(dlev)} ,"employee_name" : ${JSON.stringify(demp)} } `, function (err) {
                if (err) 
                console.log(err);
        
            });
        }
        else {
            console.log("already prsent employee");
        }
        
    });

}

 


