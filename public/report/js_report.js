


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
let reportDivBodyElements= document.getElementById("model-body-id");


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


                // console.log(emp_data);
                // console.log(emp_nm);

            }
            else {
                emp_data = [];
                emp_nm = [];

            }
            if (emp_data == undefined && emp_nm == undefined) {

            }
            else {

                addDataTOUi("","","", 1);
                table();
                tableHead();
                dataArray.length=0
                abc();
               // Init();
            //    console.log(finalArray);
              
            }


        }

    }    









 

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

    var names= new Array();
for( var i in emp_nm)
{
    names.push(emp_nm[i].pool);
}
uniqArray=getUnique(names)

uniqArray.forEach(function (iteam, index) {

    emp_nm.forEach(function (v, i) {
        if(v.pool === iteam)
        {
            addDataTOUi(v.id,v.name,v.pool, 0)
        }
    })
   
    tableBody();
    tableTotal();
    dataArray.length=0
   
    
    

    })

}

let leaveDetailArray= [];
let leaveDetaildeDetail = [];
let finalArray=[];






//var names = ["Mike","Matt","Nancy","Adam","Jenny","Nancy","Carl
    function getUnique(array){
        var uniqueArray = [];
        
        // Loop through array values
    for(i=0; i < array.length; i++){
        if(uniqueArray.indexOf(array[i]) === -1) {
            uniqueArray.push(array[i]);
        }
    }
    return uniqueArray;
}

function addDataTOUi(eId,eName,pool, header = 1) {

    let arr = [];
    if (header == 1) {
        arr.push("Team")
        arr.push("Employee");
    }
    else {
        arr.push(pool)
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
                // console.log("kkkkkkk")
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
                            leaveDetaildeDetail.push({
                                full_date : full_date,
                                week : day_nm_class,
                                leavetype : leavetype

                            })
                            break;
                        case "PL":
                            
                            PL++;
                             leaveDetaildeDetail.push({
                                full_date : full_date,
                                week : day_nm_class,
                                leavetype : leavetype

                            })
                            break
                          case "-1": 
                             ALT++
                             leaveDetaildeDetail.push({
                                full_date : full_date,
                                week : day_nm_class,
                                leavetype : leavetype

                            })
                            break;
                        case "UL":
                            UL++;
                            leaveDetaildeDetail.push({
                                full_date : full_date,
                                week : day_nm_class,
                                leavetype : leavetype

                            })
                            break;
                        case "HL":
                            HL++;
                            leaveDetaildeDetail.push({
                                full_date : full_date,
                                week : day_nm_class,
                                leavetype : leavetype

                            })
                            break
                        case "NA":
                            NA++;
                            leaveDetaildeDetail.push({
                                full_date : full_date,
                                week : day_nm_class,
                                leavetype : leavetype

                            })
                            break;
                        default:
                            // console.log("no leave need to check ");
                            break;

                    }



                }

            }

          

        }
        // leaveDetailArray.push(leaveDetaildeDetail);
        if(leaveDetaildeDetail.length > 0)
        {
        // console.log(JSON.stringify({eName,s_month,leaveDetaildeDetail}))
        }
        leaveDetaildeDetail.length=0;
        // leaveDetaildeDetail=[];
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
            // console.log(totalleave)
            // console.log(eName,eId + "============" + tleave);
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

// console.log(leaveDetailArray)

    }

    //console.log(employee_name + " = " + JSON.stringify(emp_data[employee_name]));
    if (header == 1) {
        arr.push("Total-Hours");
        arr.push("Total-Leave");
        dataArray.push(arr);
        // console.log(dataArray);
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

let reportTable = document.createElement("table");
let reportTableHead =document.createElement("thead");
let reportTableBody =document.createElement("tbody");

function table()
{
   
    setAttributes(reportTable,{"id":"main_tab", "class":"table-bordered"});
  
    
    setAttributes(reportTableHead,{"id":"t_head"})
    
  
    setAttributes(reportTableBody,{"id":"t_body"})
    reportTable.appendChild(reportTableHead);
    reportTable.appendChild(reportTableBody);
    reportDivBodyElements.appendChild(reportTable)

}
function tableHead()
{
    dataArray.forEach(function (val, ind) {
  
        var tab = reportTableHead

     
           row = tab.insertRow(-1);
     
           val.forEach(function (ival, iind) {


    tableHeader= document.createElement("th");
    setAttributes(tableHeader,{"scope" :"col"})
    text = document.createTextNode(ival);
    tableHeader.appendChild(text);

    row.appendChild(tableHeader);
           });
        });
}
function tableTotal()
{
    var tab = reportTableBody
  
    row = tab.insertRow(-1);
    
    cell = row.insertCell();
    cell.appendChild(document.createTextNode("Total"));
    setAttributes(cell,{"colspan":"2"});
    setAttributes(row,{"class":"totalRow"});
    row.appendChild(cell);
    
    let abc=new Array(14);

    for(let i=0;i<abc.length;i++)
    {
        abc[i]=0;
    }

    dataArray.forEach(function (val, ind) {
  
       
        var i=0;
           val.forEach(function (ival, iind) {
          
            console.log(ival, iind)
            if (!(iind == 0 || iind == 1  || iind == 14 || iind == 15 )) 
                {

                   
                            
                try{ 
                
                   
                    const { PL,  FL,  UL, ALT, HL,  NA, total } =  ival[0];
                    abc[i] += total;
                    i++;
                      //  console.log(total)
                   // console.log({ PL,  FL,  UL, ALT, HL,  NA, total })
                }catch(r)
                {

                }

                // if(((iind == 13 || iind == 14)) )
                // {
                //     console.log();
                // }


               
                }else if(iind == 14 || iind == 15)
                {
                    abc[i] += ival;
                    i++;
                }

              


           });
        });
        for(let i=0;i<abc.length;i++)
        {
            cell = row.insertCell();
            cell.appendChild(document.createTextNode(abc[i]));
            row.appendChild(cell);
           
        }
    
    finalArray.push(abc)
    abc=[];
   
  








}
function tableBody()
{

    dataArray.forEach(function (val, ind) {
  
     var tab = reportTableBody
  
        row = tab.insertRow(-1);

        // cell.appendChild(text);
        // row.appendChild(cell);
  
        val.forEach(function (ival, iind) {
        
  
                cell = row.insertCell();
                if (iind == 0 || iind == 1|| iind == 14 || iind == 15) { 
                    text = document.createTextNode(ival);
                    cell.appendChild(text);
                    row.appendChild(cell);
                }
                else {
  
                    const { PL,  FL,  UL, ALT, HL,  NA, total } =  ival[0];
  
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
  
            
        })
  
  
    })
}
// function Init() {

//     // let tableElement= document.getElementById("main_tab");
  
// //   try{
// //       tableElement.remove();
// //   }catch(e)
// //   {
// //     console.log("error")
// //   }
  

  
//     // console.log(dataArray);
  
//     dataArray.forEach(function (val, ind) {
  
//         if (ind == 0) {
//             var tab = reportTableHead
//         }
//         else {
//             var tab = reportTableBody
//         }
//         row = tab.insertRow(-1);
  
//         val.forEach(function (ival, iind) {
//             if (ind == 0) {
  
//                 tableHeader= document.createElement("th");
//                 setAttributes(tableHeader,{"scope" :"col"})
//                 text = document.createTextNode(ival);
//                 tableHeader.appendChild(text);
  
//                 row.appendChild(tableHeader);
//             }
//             else {
  
//                 cell = row.insertCell();
//                 if (iind == 0 || iind == 1|| iind == 14 || iind == 15) { 
//                     text = document.createTextNode(ival);
//                     cell.appendChild(text);
//                     row.appendChild(cell);
//                 }
//                 else {
  
//                     const { PL,  FL,  UL, ALT, HL,  NA, total } =  ival[0];
  
//                     if( PL +FL+  UL+ ALT + HL == 0) 
//                     {
//                         finalText=`${total} `
//                 }else {finalText=`${total}&nbsp;<span class="badge badge-light">${ PL +FL+  UL+ ALT+ HL}</span>`;}
                   
                    
//                    // text = document.create(finalText);
//                     cell.innerHTML=finalText;
//                     cell.setAttribute("data-toggle", "tooltip");
  
//                     setAttributes(cell, {"data-html":"true"});
//                   //  table = `<table><tbody><tr></tr></tbody></table>`
//                     cell.setAttribute("title", `PL  = ${PL} FL  = ${FL} UL  = ${UL} ALT = ${ALT} HL  =  ${HL}`);
//                     row.appendChild(cell);
//                 }
  
//             }
//         })
  
  
//     })
// }

// function Init() {

//     // console.log(dataArray);
//    // let tableElement= document.getElementById("main_tab");

//       let reportTable = document.createElement("table");
//       setAttributes(reportTable,{"id":"main_tab", "class":"table-bordered"});
    
//       let reportTableHead =document.createElement("thead");
//       setAttributes(reportTableHead,{"id":"t_head"})
      
//       let reportTableBody =document.createElement("tbody");
//       setAttributes(reportTableBody,{"id":"t_body"})
//       reportTable.appendChild(reportTableHead);
//       reportTable.appendChild(reportTableBody);
//       reportDivBodyElements.appendChild(reportTable)
    
//       // console.log(dataArray);







//     dataArray.forEach(function (val, ind) {

//         if (ind == 0) {
//             var tab = document.getElementById("t_head");
//         }
//         else {
//             var tab = document.getElementById("t_body");
//         }
//         row = tab.insertRow(-1);




        

//         val.forEach(function (ival, iind) {
//             if (ind == 0) {
//                 cell = row.insertCell();
//                 text = document.createTextNode(ival);
//                 cell.appendChild(text);
//                 row.appendChild(cell);
//             }
//             else {

//                 cell = row.insertCell();
//                 if (iind == 0 || iind == 1|| iind == 14 || iind == 15) { 
//                     text = document.createTextNode(ival);
//                     cell.appendChild(text);
//                     row.appendChild(cell);
//                 }
//                 else {

//                     const { PL,  FL,  UL, ALT, HL,  NA, total } =  ival[0];
// // console.log(JSON.stringify({ PL,  FL,  UL, ALT, HL,  NA, total } ))
//                     if( PL +FL+  UL+ ALT + HL == 0) 
//                     {
//                         finalText=`${total} `
//                 }else {finalText=`${total}&nbsp;<span class="badge badge-light">${ PL +FL+  UL+ ALT+ HL}</span>`;}
                   
                    
//                    // text = document.create(finalText);
//                     cell.innerHTML=finalText;
//                     cell.setAttribute("data-toggle", "tooltip");

//                     setAttributes(cell, {"data-html":"true"});
//                   //  table = `<table><tbody><tr></tr></tbody></table>`
//                     cell.setAttribute("title", `PL  = ${PL} FL  = ${FL} UL  = ${UL} ALT = ${ALT} HL  =  ${HL}`);
//                     row.appendChild(cell);
//                 }

//             }
//         })


//     })





//     console.log(dataArray);

// }



window.onload = (() => {

  
    getEmpJsonData(function callFunction() { 
        // console.log("This is a callback function.") 
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


  function exportToExcel(tableID, filename = ''){
    var downloadurl;
    var dataFileType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTMLData = tableSelect.outerHTML.replace(/ /g, '%20');
    console.log(tableSelect.outerHTML);
    console.log(tableSelect.outerHTML.replace(/ /g, '%20'))
    // Specify file name
    filename = filename?filename+'.xls':'export_excel_data.xls';
    
    // Create download link element
    downloadurl = document.createElement("a");
    
    document.body.appendChild(downloadurl);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTMLData], {
            type: dataFileType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadurl.href = 'data:' + dataFileType + ', ' + tableHTMLData;
    
        // Setting the file name
        downloadurl.download = filename;
        
        //triggering the function
        downloadurl.click();
    }
  }
  