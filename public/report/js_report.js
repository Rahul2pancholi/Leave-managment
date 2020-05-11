


let month_name = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let day_name = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let year = 2020;
let s_month_prev = "jan";
let count = 0;
let day = 8;
let workinghours = 0;
let flag = 0;
let satSunw = 0;
let FL = 0;
let PL = 0;
let UL = 0;
let ALT = 0;
let NA = 0;
let satsun = 0;
let total_leave = 0;
let total_wday = 0;
let WKG = 0;
let HL = 0;
let dataArray = [];
let totalleave = 0;


/////////////////////////////////////////
let emp_data = [];

let emp_nm = [];

let mdt_flt = [{
    "leavedate": "2020/01/04",
    "leavetype": "FL"
}
    ,
{
    "leavedate": "2020/01/10",
    "leavetype": "FLM"
}
];




////////////////////////////////////////

/////


function getEmpJsonData(callback) {
    let xhttp = new XMLHttpRequest();

    xhttp.open("GET", '/test.json', true);
    xhttp.setRequestHeader("Content-Type", "application/json");


    xhttp.send();
    xhttp.onload = function () {
        if (this.readyState == 4 && this.status == 200) {


            if (this.responseText != "") {

                emp_data = JSON.parse(this.responseText)["leave_detail"];
                emp_nm = JSON.parse(this.responseText)["employee_name"];


                console.log(emp_data);
                console.log(emp_nm);

            }
            else {
                emp_data = [];
                emp_nm = [];

            }
            if (emp_data == undefined && emp_nm == undefined) {

            }
            else {

                addDataTOUi("","", 1);
                abc();
                Init();
            }


        }

    }    









dz
 

    if (typeof callback == "function") 
    {callback();}
     


}







function dateFormatter(year,month,day)
{
return `${appendZero(day)}-${appendZero(month)}-${year}`;
}

function appendZero(temp) {
    if (temp.toString().length < 2) {
        return "0" + temp;
    } else {
        return temp;
    }
}


let final = 0;

function abc() {
   emp_nm.forEach(function (iteam, index) {

    console.log(iteam.id)
        addDataTOUi(iteam.id,iteam.name, 0)
    })

}



function addDataTOUi(eId,eName, header = 1) {

    let arr = [];
    if (header == 1) {
        arr.push("Employee");
    }
    else {
        arr.push(eName);
    }

    for (var i = 0; i < month_name.length; i++) {

        let s_month = month_name[i].slice(0, 3).toLowerCase()

        let mth_lst_day = new Date(year, i + 1, 0).getDate().toString();
        count = 0;
        for (var j = 1; j <= mth_lst_day; j++) {

            let full_date = year + "/" + (i + 1) + "/" + j; //year/moth/date
            let dayname = new Date(full_date);

            let day_nm_class = day_name[dayname.getDay()].toLowerCase();
            full_date=dateFormatter(dayname.getFullYear(),s_month,dayname.getDate());
            // console.log(full_date);



            if (header == 1) {
                console.log("kkkkkkk")
            }
            else {
                if (day_nm_class == "sat" || day_nm_class == "sun") {
                    count++;
                }
                // console.log(employee_name,emp_data)
                let em = (emp_data[eId])[full_date];

                if (em != undefined) {
                    let leavetype = em["leavetype"];
                    //    console.log(employee_name+"======"+JSON.stringify(em)+"======"+ leavetype);



                    switch (leavetype) {
                        case "FL":
                            FL++;
                            break;
                        case "PL":
                            PL++;
                            break
                          case "-1": 
                             ALT++
                            break;
                        case "UL":
                            UL++;
                            break;
                        case "HL":
                            HL++;
                            break
                        case "NA":
                            NA++;
                            break;
                        default:
                            // console.log("no leave need to check ");
                            break;

                    }



                }

            }



        }

        if (header == 1) {
            arr.push(s_month);
        }
        else {



            total_leave_hours = (((PL + FL + UL ) * 8) + (HL * 4));
            total_hour_worked = (((mth_lst_day) - (count)) * 8);
            total = total_hour_worked - total_leave_hours;
            final = final + total;
            //   console.log("TOTAL = "+total);
            tleave = PL + FL + UL  + (HL * .5);
            totalleave = totalleave + tleave;
            console.log(totalleave)
            console.log(eName,eId + "============" + tleave);
//            arr.push([{ "PL": PL, "FL": FL, "UL": UL, "ALT": ALT, "HL": HL, "NA": NA, "total": total }])

            arr.push([{ PL,  FL,  UL, ALT, HL,  NA, total }])

            count = 0;
            WKG = 0;
            FL = 0;
            PL = 0;
            UL = 0;
            ALT = 0;
            HL = 0;
            NA=0;


        }



    }

    //console.log(employee_name + " = " + JSON.stringify(emp_data[employee_name]));
    if (header == 1) {
        arr.push("Total-Hours");
        arr.push("Total-Leave");
        dataArray.push(arr);
        console.log(dataArray);
    }
    else {
        arr.push(final);
        arr.push(totalleave);
        dataArray.push(arr);
        console.log(dataArray);
        totalleave = 0;
        final=0;
    }
}



function Init() {

    console.log(dataArray);

    dataArray.forEach(function (val, ind) {

        if (ind == 0) {
            var tab = document.getElementById("t_head");
        }
        else {
            var tab = document.getElementById("t_body");
        }
        row = tab.insertRow(-1);

        val.forEach(function (ival, iind) {
            if (ind == 0) {
                cell = row.insertCell();
                text = document.createTextNode(ival);
                cell.appendChild(text);
                row.appendChild(cell);
            }
            else {

                cell = row.insertCell();
                if (iind == 0 || iind == 13 || iind == 14) {
                    text = document.createTextNode(ival);
                    cell.appendChild(text);
                    row.appendChild(cell);
                }
                else {

                    const { PL,  FL,  UL, ALT, HL,  NA, total } =  ival[0];
// console.log(JSON.stringify({ PL,  FL,  UL, ALT, HL,  NA, total } ))
                    if( PL +FL+  UL+ ALT + HL == 0) 
                    {
                        finalText=`${total} `
                }else {finalText=`${total}&nbsp;<span class="badge badge-light">${ PL +FL+  UL+ ALT+ HL}</span>`;}
                   
                    
                   // text = document.create(finalText);
                    cell.innerHTML=finalText;
                    cell.setAttribute("data-toggle", "tooltip");

                    setAttributes(cell, {"data-html":"true"});
                  //  table = `<table><tbody><tr></tr></tbody></table>`
                    cell.setAttribute("title", `PL  = ${PL} FL  = ${FL} UL  = ${UL} ALT = ${ALT} HL  =  ${HL}`);
                    row.appendChild(cell);
                }

            }
        })


    })





    console.log(dataArray);

}



window.onload = (() => {

  
    getEmpJsonData(function callFunction() { 
        console.log("This is a callback function.") 
        $('[data-toggle="tooltip"]').tooltip();
    }); 


    // var chart = new CanvasJS.Chart("chartContainer", {
    //     animationEnabled: true,
    //     title: {
    //         text: "Desktop Search Engine Market Share - 2016"
    //     },
    //     data: [{
    //         type: "pie",
    //         startAngle: 240,
    //         yValueFormatString: "##0.00\"%\"",
    //         indexLabel: "{label} {y}",
    //         dataPoints: [
    //             {y: 79.45, label: "Google"},
    //             {y: 7.31, label: "Bing"},
    //             {y: 7.06, label: "Baidu"},
    //             {y: 4.91, label: "Yahoo"},
    //             {y: 1.26, label: "Others"}
    //         ]
    //     }]
    // });
    // chart.render();

});
function setAttributes(el, attrs) {
    for(var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }