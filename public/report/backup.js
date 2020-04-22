


let month_name = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let day_name = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let year = 2020;
let s_month_prev="jan";
let count=0;
let day=8;
let workinghours=0;
let flag=0;
let satSunw=0;
let FL=0;
let PL=0;
let UL=0;
let ALT=0;
let satsun=0;
let total_leave=0;
let total_wday=0;


/////////////////////////////////////////
let emp_data= [];
 
 let emp_nm= [];

let mdt_flt=[ { "leavedate": "2020/01/04",
                "leavetype": "FL"
            }
            ,
            {
                "leavedate": "2020/01/10",
                "leavetype": "FLM"
            }
        ]



  
////////////////////////////////////////

/////
function getEmpJsonData()
{
    let xhttp = new XMLHttpRequest();

    xhttp.open("GET", '/test.json', true);
    xhttp.setRequestHeader("Content-Type", "application/json");

    
xhttp.send();
xhttp.onload = function() {
 if (this.readyState == 4 && this.status == 200) {


  if(this.responseText != "")
  {

    emp_data=JSON.parse(this.responseText)["leave_detail"];
    emp_nm=JSON.parse(this.responseText)["employee_name"];


    console.log(emp_data);
    console.log(emp_nm);
    
  }
  else{
        emp_data = [];
        emp_nm = [];

  }
     if(emp_data == undefined && emp_nm == undefined)
     {
        
     }
     else 
     {
        Init();
     }
     
    
 }

}}






function appendZero(temp) {
    if (temp.toString().length < 2) {
        return "0" + temp;
    } else {
        return temp;
    }
}

function Init()
{
    
    // console.log(`${emp_nm}" "${emp_data}`)
emp_nm.forEach(function (iteam,index) 
{
   
   var tab = document.getElementById("main_tab");
   emp_data.forEach(function (iteam1,index1) 
   {

       if(emp_nm[index1]==iteam)
       {
        total_leave=0;

        row = tab.insertRow(-1);
        cell=row.insertCell();
        text = document.createTextNode(iteam);
   // cell.setAttribute("id", `row${index+1}_${num}`);
   console.log(`text = ${iteam}`)
    cell.appendChild(text);
    row.appendChild(cell);

} 
} );

}
 

window.onload = () => {

    getEmpJsonData();
   
    }
/*

//         for (var i = 0; i < month_name.length; i++) {

//             let s_month = month_name[i].slice(0, 3).toLowerCase()
//             let mth_lst_day = new Date(year, i + 1, 0).getDate().toString();
//             for (var j = 1; j <= mth_lst_day; j++) 
//             {
//                 let full_date = year + "/" + appendZero(i + 1) + "/" + appendZero(j); //year/moth/date
//                 let dayname = new Date(full_date);
    
//                 let day_nm_class = day_name[dayname.getDay()].toLowerCase();
//                 console.log(`count ${count}`)
//                 count++;

//             if( day_nm_class == "sat" || day_nm_class ==  "sun")
//             {
                
//                 emp_data[index].leave.forEach(function (en,index2) 
//                 {
                   

//                     if( en["leavedate"] == full_date && en["leavetype"] == "WKG" )
//                     {
//                         workinghours= workinghours+day;
//                         // console.log(`${count} ${s_month} `)
//                         satSunw++;

//                     }
                   
        
        
//                 });

//                 satsun++;


//             }
//             else{

//                 emp_data[index].leave.forEach(function (iteam2,index2) 
//                 {
                   
//                     if( iteam2["leavedate"] == full_date && iteam2["leavetype"] != "ALT" )
//                     {
//                     //    console.log("skip");
//                         switch(iteam2["leavetype"])
//                         {
//                             case "FL":
//                                 FL++;
//                                 break;
//                             case "PL" :
//                                 PL++;
//                                  break
//                             case "ALT" :
//                                 ALT++
//                                 break;
//                                 case "UL" :
//                                 UL++;
//                                 break;
                            
//                             default :
//                             // console.log("no leave need to check ");
//                             break;

//                         }

//                         flag=1;
//                     }
//                 });

//                 if(flag == 0)
//                 {
//                     workinghours=workinghours+day; 
//             }
//                 else{
//                     // console.log(`${count} ${s_month} ${workinghours}`)
//                     flag=0;
//                 }

             



//             }

    
    
//             }
//           //  console.log(`count = ${count- (FL+PL+UL+ALT)}== ${satsun}`)
//            cell = row.insertCell();
//            div = document.createElement("div");
//            div.setAttribute("class","tooltip");
//            span = document.createElement("span");
//            span.setAttribute("class","tooltiptext");
//            totalleave= FL+PL+UL+ALT;
//            tatalwday = count - satsun;
//             text = document.createTextNode( `${( count - satsun ) - (FL+PL+UL+ALT) } * 8 = ${workinghours}`);
//         //    console.log(((FL+PL+UL+ALT))+   " * 8 = "+workinghours);

//             textComment = document.createTextNode(`sat_work=${satSunw}, FL=${FL},PL=${PL},UL=${UL},ALT=${ALT},satsun=${satsun}`);
//             // cell.setAttribute("id", `row${index+1}_${num}`);
// //             <div class="tooltip">Hover over me
// //   <span class="tooltiptext">Tooltip text</span>
// // </div>



//              div.appendChild(text);
//              span.appendChild(textComment);
//              div.appendChild(span);
//              cell.appendChild(div);
//              row.appendChild(cell);
//           //   span.setAttribute("contenteditable","true");
             
//              span.addEventListener("click", function()
//              {
                
//                 // console.log(this.innerText);
//                 let innerval=this.innerText;
                
              
                
//              });



//             // console.log(`${count} ${s_month} ${workinghours}`)
//             //console.log(`satW=${satSunw}, FL=${FL},PL=${PL},UL=${UL},ALT=${ALT},satsun=${satsun}`);




            
             
//             // total_working_day=(s_month-satsun);
//             total_leave=total_leave+FL+PL+UL+ALT;
//             total_wday=total_wday+(count-satsun);

//            count=0;
//            workinghours=0;
//             satSunw=0;
//             FL=0;
//  PL=0;
// UL=0;
//  ALT=0;
// satsun=0;

//             }
        


//             cell = row.insertCell();
//             workinday = document.createTextNode(total_wday);
//             cell.appendChild(workinday);

//             cell = row.insertCell();
//             totalLeave = document.createTextNode(total_leave);
//             cell.appendChild(totalLeave);

//              console.log(`${total_leave},${total_wday}`);
//              total_wday=0;
//        }

       
// });
// });   
   
*/


    
