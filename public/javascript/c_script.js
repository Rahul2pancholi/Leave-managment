
let month=11;
let year=2019;
let month_name=null;
var table = document.createElement('table');
window.onload = function(){
    
    calender();
    


}

function previous()
{
    
    month--;
    if (month == -1)
    {
            year--;
            month=11;
    }

   console.log(year+" "+month_name[month]);
  let x= document.getElementsByTagName("table");
  console.log(x[0])
    removeElement(x[0],x[0].childElementCount);
    calender();
  
    
}

function next()
{
month++;
if (month == 12)
    {
            year++;
            month=0;
    }

   console.log(year+" "+month_name[month])
   let x= document.getElementsByTagName("table");
  console.log(x[0])
    removeElement(x[0],x[0].childElementCount);
    calender();
}
function removeElement(x,len)
{

    console.log(len)
    for(var i=0;i<len;i++)
    {
        console.log(i);
       x.deleteRow(-1)
    }

}

function calender()
{
    var d = new Date();
    month_name = ['January','February','March','April','May','June','July','August','September','October','November','December'];

   var first_date = month_name[month] + " " + 1 + " " + year;
   //September 1 2014
   var tmp = new Date(first_date).toDateString();
   //Mon Sep 01 2014 ...
   var first_day = tmp.substring(0, 3);    //Mon
   var day_name = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
   var day_no = day_name.indexOf(first_day);   //1
   var days = new Date(year, month+1, 0).getDate();    //30
   //Tue Sep 30 2014 ...
   var calendar = get_calendar(day_no, days);
   document.getElementById("calendar-month-year").innerHTML = month_name[month]+" "+year;
   document.getElementById("calendar-dates").appendChild(calendar);
   eventOnClick();
}

function appendZero(temp)
        {
            if(temp.toString().length<2)
                {
                    return "0"+temp;
                }
            else
                {
                    return temp;
                }
        }
function eventOnClick()
{
let cells = document.getElementsByClassName('day');

            
//let cells = document.getElementsByClassName("data-table-cell");

for(let cell of cells) {
   

    cell.addEventListener("click", function() {

        if(this.childElementCount == 0) {
            
               
               
    
           // let input = document.createElement('input');
            //input.setAttribute('type', 'textbox');
            //input.setAttribute('value', this.innerHTML);
            this.setAttribute("style", "background-color: red;");

            console.log(`${year}/${appendZero(month)}/${appendZero(this.innerText)}`);


        
               
              
        }
    }); 
}
}


function get_calendar(day_no, days){
    var tr = document.createElement('tr');
    
    //row for the day letters
    for(var c=0; c<=6; c++){
        var td = document.createElement('td');
        td.innerHTML = "SMTWTFS"[c];
        td.setAttribute("class","weeks");
        tr.appendChild(td);
    }
    table.appendChild(tr);
    
    //create 2nd row
    tr = document.createElement('tr');
    var c;
    for(c=0; c<=6; c++){
        if(c == day_no){
            break;
        }
        var td = document.createElement('td');
        td.innerHTML = "";
        tr.appendChild(td);
    }
    
    var count = 1;
    for(; c<=6; c++){
        var td = document.createElement('td');
        td.innerHTML = count;
        count++;
        td.setAttribute("class","day");
        tr.appendChild(td);
    }
    table.appendChild(tr);
    
    //rest of the date rows
    for(var r=3; r<=7; r++){
        tr = document.createElement('tr');
        for(var c=0; c<=6; c++){
            if(count > days){
                table.appendChild(tr);
                return table;
            }
            var td = document.createElement('td');
            td.innerHTML = count;
            count++;
            td.setAttribute("class","day");
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    return table;
}

