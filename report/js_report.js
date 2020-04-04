


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
function getEmpJsonData() {
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

                addDataTOUi("", 1);
                abc();
                Init();
            }


        }

    }
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
    Object.keys(emp_nm).forEach(function (iteam, index) {

        addDataTOUi(iteam, 0)
    })

}



function addDataTOUi(employee_name, header = 1) {

    let arr = [];
    if (header == 1) {
        arr.push("Emp_name");
    }
    else {
        arr.push(employee_name);
    }

    for (var i = 0; i < month_name.length; i++) {

        let s_month = month_name[i].slice(0, 3).toLowerCase()

        let mth_lst_day = new Date(year, i + 1, 0).getDate().toString();
        count = 0;
        for (var j = 1; j <= mth_lst_day; j++) {

            let full_date = year + "/" + appendZero(i + 1) + "/" + appendZero(j); //year/moth/date
            let dayname = new Date(full_date);

            let day_nm_class = day_name[dayname.getDay()].toLowerCase();
            // console.log(full_date);



            if (header == 1) {
                console.log("kkkkkkk")
            }
            else {
                if (day_nm_class == "sat" || day_nm_class == "sun") {
                    count++;
                }
                let em = (emp_data[employee_name])[full_date];
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
                        case "ALT":
                            ALT++
                            break;
                        case "UL":
                            UL++;
                            break;
                        case "WKG":
                            WKG++;
                            break
                        case "HL":
                            HL++;
                            break

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



            total_leave_hours = (((PL + FL + UL + ALT) * 8) + (HL * 4));
            total_hour_worked = (((mth_lst_day) - (count - WKG)) * 8);
            total = total_hour_worked - total_leave_hours;
            final = final + total;
            //   console.log("TOTAL = "+total);
            tleave = PL + FL + UL + ALT + (HL * .5);
            totalleave = totalleave + tleave;
            console.log(totalleave)
            console.log(employee_name + "============" + tleave);
            arr.push([{ "PL": PL, "FL": FL, "UL": UL, "ALT": ALT, "HL": HL, "WKG": WKG, "total": total }])


            count = 0;
            WKG = 0;
            FL = 0;
            PL = 0;
            UL = 0;
            ALT = 0;
            HL = 0;


        }



    }

    //console.log(employee_name + " = " + JSON.stringify(emp_data[employee_name]));
    if (header == 1) {
        arr.push("Working day");
        arr.push("Total Leave");
        dataArray.push(arr);
        console.log(dataArray);
    }
    else {
        arr.push(final);
        arr.push(totalleave);
        dataArray.push(arr);
        console.log(dataArray);
        totalleave = 0;
    }
}



function Init() {

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

                    text = document.createTextNode(ival[0]["total"]);
                    cell.appendChild(text);
                    cell.setAttribute("data-toggle", "tooltip");
                    cell.setAttribute("title", `PL : ${ival[0]["PL"]}, FL : ${ival[0]["FL"]}, UL : ${ival[0]["UL"]}, ALT : ${ival[0]["ALT"]}, HL : ${ival[0]["HL"]}, WKG : ${ival[0]["WKG"]}`);
                    row.appendChild(cell);
                }

            }
        })


    })






}



window.onload = (() => {

    getEmpJsonData();
    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
        console.log("called");
    });


});
