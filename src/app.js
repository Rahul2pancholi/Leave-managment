var express = require('express');
var bodyParser = require('body-parser')
var path = require("path");
var app = express();
const fs = require("fs");
var project;
var year;
var loggedIn=false;
var urlencodedParser = bodyParser.urlencoded({ extended: true })
const publicDirectoryPath = path.join(__dirname, "../public");
var jsonFilePath;// path.join(__dirname, `../public/database/test_${project}_${year}.json`);
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

    res.render("index");
})


app.get('/auth', (req, res) => {
   
     project=req.query.team;
     year=req.query.year;
     if(project != undefined && year != undefined )
    
    {   
        jsonFilePath = path.join(__dirname, `../public/database/test_${project}_${year}.json`);
        loggedIn =true;
        res.redirect('/home');
     }

})

app.get('/home', (req, res) => {
   
if(loggedIn)
{
   res.render("home", {
         "name" : "rahul",
         "project" :project,
         "year" : year
   });
   loggedIn =false;
}else{
    res.redirect('/');
}

})


app.get('/test.json', (req, res) => {
    console.log(req);
    res.sendFile(jsonFilePath);
    console.log("called")

})
app.get("/getvar", function(req, res){
    res.send({ "year" : year });
});

app.post('/commentIMAGE',urlencodedParser, (req, res) => {
   
    console.log(req.body)

})
app.get('/LEAVE_COLOR', (req,   res) => {
    res.sendFile(jsonLeaveColor);
    console.log("called")

})

app.get('/FLOATING_FILE', (req, res) => {
    res.sendFile(json_FloatLeave);
    console.log("called")

})










function checkDataLength(data)
{
    if(data.length <= 0  )
    {
return {
 leave_detail : {},
employee_name : { }
}
    }
    else{
        return JSON.parse(data);
    }

}
/********************************ADDING NEW EMPLOYEE****************************** */
app.post('/NEW_EMPLOYEE', urlencodedParser, (req, res) => {
    console.log(req.body.emp_data);
    fs.readFile(jsonFilePath, 'UTF8', function read(err, data) {

        data=checkDataLength(data);
    
        // Invoke the next step here however you like
        //   console.log(data);   // Put all of the code here (not the best solution)
        addNewEmp(jsonFilePath,data, JSON.parse(req.body.emp_data));          // Or put the next step in a function and invoke it
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
       console.log(`data === ${data}`);
       data=checkDataLength(data);

    delEmp(jsonFilePath,data, JSON.parse(req.body.emp_name));          // Or put the next step in a function and invoke it
    
});
    res.send();
});
/********************************************** ******************** */




app.post('/UPDATE', urlencodedParser, (req, res) => {


    fs.readFile(jsonFilePath, 'UTF8', function read(err, data) {
        if (err) {
            console.log(err)
        }
       console.log(`data === ${data}`);
        update = JSON.parse(req.body.update);
        newemp = JSON.parse(req.body.newemp);
        data=checkDataLength(data);
        console.log(newemp);
        
        updateEmpData(jsonFilePath,data, update, newemp);
    });

    res.send(true);

})

var server = app.listen(port, function () {

    var host = server.address().address
    console.log("Example app listening at http://%s:%s", host, port)
    console.log(__dirname);
})





function delEmp(jsonFilePath,filedata, resData) {

    console.log(resData);
    demp = filedata.employee_name;
    dlev = filedata.leave_detail;

for(var i in resData)
{
    console.log(delete demp[resData[i]]);
    console.log(delete dlev[resData[i]]);
}
    console.log(demp);
    console.log(dlev);
    // dlev[val] = {};
    



    fs.writeFile(jsonFilePath, `{ "leave_detail" :  ${JSON.stringify(dlev)} ,"employee_name" : ${JSON.stringify(demp)} } `, function (err) {
        if (err) console.log(err);
        
       
    });
}

function updateEmpData(jsonFilePath,filedata, update, newemp) {
    demp = filedata.employee_name;
    dlev = filedata.leave_detail;
    // console.log(newemp);
    // console.log(update);


    //For new leave
    newemp.forEach(function (val, ind) {
        // console.log(val)
        Object.keys(val).forEach(function (ival, iind) {
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
              
            Object.keys(val[ival]).forEach(function (innerval, innerindex) {
             
                leave = val[ival][innerval];
                 console.log(JSON.stringify(leave)+"=="+innerval)
                if (leave["leavetype"] != "") {
                     dlev[ival][innerval]  = leave;
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
        if (err) console.log(err);
        
    });
}


function addNewEmp(jsonFilePath,filedata, resData) {
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
                if (err)  console.log(err);
        
            });
        }
        else {
            console.log("already prsent employee");
        }
        
    });

}

 


