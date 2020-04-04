
let selectEnabled = 0;
let month_name = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let day_name = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let year = 2020;
let logfile = [];
let isAvailable = 0;
let select = null;
let date1 = null;
let emp_data = [];
let emp_nm = [];
let leavetype_name = ["PL", "UL", "ALT"];
let tempJson = [];
let selectedObject = null; //use for leave rejection
let isChanged = 0;
let datestorage = [];
let showAllEnabled = 1;
let xhttp = new XMLHttpRequest();
let cmtElmt = document.getElementById("cmtID");
let textarea = document.getElementById("lastname");
let oldComment=null;
let newComment=null;
/************TOOL-----TIP*********** */


let main_table;
let csvText = "";
let tableBody;






function createSCV() {


    main_table = document.getElementById("header_row").children;
    tableBody = document.getElementById("tbody_1").children;
    for (i in main_table) {
        if (main_table[i].innerText != undefined) {
            csvText = csvText + "," + main_table[i].innerText;
        }
        else {
            //   //console.log(main_table[i]);
        }
    }
    csvText = csvText + "\n";

    for (var i = 0; i < tableBody.length; i++) {
        var tabelRow = tableBody[i].childNodes;
        for (j in tabelRow) {
            if (tabelRow[j].innerText != undefined) {
                csvText = csvText + "," + tabelRow[j].innerText;
            }
        }

        csvText = csvText + "\n";

    }
    //console.log(csvText)
    csvText = "";

}
/***********************TITLE FOR NAME******************** */

function titleCase(string) {

    var sentence = string.toLowerCase().split(" ");
    for (var i = 0; i < sentence.length; i++) {
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }

    //console.log(sentence.join(" "));
    return sentence.join(" ");
}

/***********************TITLE FOR NAME END******************** */
/*************************VARIABLE DECLEARIATION END********************** */

let dataSaved = document.getElementById("isChanged");


/**************************************CREATE DATE FORAMTE START***************** */
function createDate(date_array) {
    let year = date_array[0];
    let month = appendZero(Number(date_array[1]));
    let day = appendZero(date_array[2]);
    return `${year}/${month}/${day}`

}

/**************************************CREATE DATE FORAMTE END***************** */

/**************************************APPLY LEAVE START******************************************************* */
function leaveApply() {

    let start = document.getElementById("start");
    let end = document.getElementById("end");
    var i = 0;
    var e = document.getElementById("emp_nm");

    var strUser = e.options[select.value].innerText;

    if (start.value == "" || end.value == "" || select.value == 0) {
        alert("column should not be empty ");
    } else {

        /////
        var date1 = new Date(start.value);
        var date2 = new Date(end.value);

        // To calculate the time difference of two dates 
        var Difference_In_Time = date2.getTime() - date1.getTime();

        // To calculate the no. of days between two dates 
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        // //console.log(Difference_In_Days);
        /////
        if (Difference_In_Days > -1) {

            let sdate = createDate(start.value.split("-"));
            let edate = createDate(end.value.split("-"));
            let headerRow = document.getElementById("header_row").children;
            alert(` name :- ${strUser} \n start date : ${sdate} \n End date : ${edate}`);
            var tomorrow = new Date(sdate);
            let tbody_1 = document.getElementById("tbody_1").children;
            let rowNO;
            let colNO;


            for (let i = 0; i < tbody_1.length; i++) {

                let name = tbody_1[i].childNodes[1].innerText;
                //console.log(name);
                if (name == strUser) {
                    //console.log(name)
                    rowNO = i + 1;
                    //console.log("rowwwwww === " + rowNO);
                    break;
                }

            }

            for (let i = 0; i <= headerRow.length; i++) {
                if (headerRow[i].innerText == sdate) {

                    colNO = (headerRow[i].id).split("_")[1]

                    break;
                }

            }

            while (true) {
                //console.log(`row${rowNO}_${colNO}`)
                startElement = document.getElementById(`row${rowNO}_${colNO}`);
                date1 = tomorrow.getFullYear() + "/" + appendZero((tomorrow.getMonth()) + 1) + "/" + appendZero(tomorrow.getDate());
                let satSun = (tomorrow.toString().slice(0, 3)).toUpperCase();
                //console.log("satSun =" + satSun);

                //console.log(`${date1} === ${satSun} `);

                if (satSun != "SAT" && satSun != "SUN") {
                    //console.log(satSun != "SAT" && satSun != "SUN")
                    ////////////////////////////////////////////////////////  
                    //    //console.log("HEADER ROW + "+headerRow.length);



                    if (startElement.innerText == "") {
                        //console.log(startElement);
                        startElement.innerText = "PL";
                        back_Color("PL", startElement);
                        createDataArray(narr, strUser, date1, "PL", "");

                    }
                    else { alert("updating existing ") }
                    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    // //console.log("outside")
                    if (edate == date1) {
                        // //console.log("beark ")
                        break;
                    }

                }
                else {
                    if (edate == date1) {
                        //console.log("beark ")
                        break;
                    }



                }
                tomorrow.setDate(tomorrow.getDate() + 1);
                colNO++;

            }
            start.value = "";
            end.value = "";
            select.value = 0;


        }
        else {
            alert("date should not be negative");
            start.value = "";
            end.value = "";
            select.value = 0;
        }


        if (Object.keys(narr).length != 0) {
            isChanged = 1;
            //console.log("change save button color or toggle button");
            myToggle();

        }

    }

    //addJson1();



}
/****************************************APPLY LEAVE END********************************************************* */

/********************APPEND ZERO START***************** */
function appendZero(temp) {
    if (temp.toString().length < 2) {
        return "0" + temp;
    } else {
        return temp;
    }
}
//***********************************APPEND ZERO END********************************************************* */





/******************BACKGROUNG COLOR START ******************** */
function back_Color(clr, clrobj) {

    switch (clr.toUpperCase()) {

        case "FL":

            clrobj.style.backgroundColor = "75F900";
            clrobj.style.backgroundColor = "!important";
            break;

        case "PL":
            clrobj.style.backgroundColor = "#103AE3";

            break;

        case "ALT":
            clrobj.style.backgroundColor = "#34eb64";

            break;
        case "REJ" :
        clrobj.style.backgroundColor ="#ff0000";
        break;
        default:
            clrobj.style.backgroundColor = "";
    }
}


/************************************BACKGROUND COLOR END**************************************************** */


/******************************CRETE SELECET START**************** */
//function for create div with selector 
//a is leave type b is inner value
function createSelForDiv(a, b) {



    if (a == "") {

        let select = document.createElement('input');
        select.setAttribute("type", "text");
        select.setAttribute("value", b);
        select.setAttribute("tabindex", "-1");
        // select.onchange();
        // select.setAttribute("onchange", "onChangeInput(this)");
        // <input type="text" value="" tabindex="-1" style="width: 100px; height: 40px;"></input>

        return select;

    } else {

        let select = document.createElement('input');
        select.setAttribute("type", "text");
        select.setAttribute("value", "FL");
        select.setAttribute("tabindex", "-1");
        // select.setAttribute("onchange", "onChangeInput(this)");
        return select;
    }

}
//chk height width fun
/****************************CRETE SELECET END************************************************* */

/*********************************GET WEIDTH AND HEIGHT START************** */
function getHeightWidth(element) {
    element.style.width = "100";
    element.style.height = "40";


}

/* *************************************GET WEIDTH AND HEIGHT END****************************************************** */

/******************************step:1 INTITIAL_PHASE_START***************************************************/




/*******************************INTITIAL_PHASE_END**************************************************/
//////select emp list /////////

function createSelectEmp() {
    select = document.getElementById("emp_nm");
    select.innerHTML = '<option value="0" >select emp</option>'
    Object.keys(emp_nm).forEach(function (value, index) {
        let createOption = document.createElement("option");
        let textNode = document.createTextNode(value);
        createOption.setAttribute("value", 1 + index);
        createOption.appendChild(textNode);
        select.appendChild(createOption);


    });
}
///////////select emp list end /////////
//////create all row //////
let date = [];
function createInitRow() {

    // //console.log("createInitRow ");

    let num = 1;
    let thead = document.getElementById("thead1");
    let table = document.getElementById("tab1");
    let row = thead.insertRow();
    let head, text;
    let rownum = 0, colnum = 0;

    head = document.createElement("th");
    text = document.createTextNode("Team_Name");
    head.append(text)
    head.setAttribute("id", `team_name`);
    head.setAttribute("class", `pool`);
    row.appendChild(head);
    row.setAttribute("class", ` Team_Name`)

    head = document.createElement("th");
    text = document.createTextNode("Emp_Name");
    head.append(text)
    head.setAttribute("id", `row0_0`);
    head.setAttribute("class", `eName`);
    head.setAttribute("ROW_ID", rownum);
    head.setAttribute("COL_ID", colnum);

    row.appendChild(head);
    row.setAttribute("class", `tab_row_0 Emp_Name`);
    row.setAttribute("id", "header_row");





    let row_nm = 0;
    colnum += 1;
    let day_nm_class;
    for (var i = 0; i < month_name.length; i++) {

        let s_month = month_name[i].slice(0, 3).toLowerCase()
        let mth_lst_day = new Date(year, i + 1, 0).getDate().toString();
        for (var j = 1; j <= mth_lst_day; j++) {

            let full_date = year + "/" + appendZero(i + 1) + "/" + appendZero(j); //year/moth/date

            let dayname = new Date(full_date);

            day_nm_class = day_name[dayname.getDay()].toLowerCase();

            // //console.log(full_date) ////console
            date.push(full_date);
            head = document.createElement("th");
            head.setAttribute("class", "tab_head");
            text = document.createTextNode(full_date);


            head.setAttribute("ROW_ID", rownum);
            head.setAttribute("COL_ID", colnum);
            head.setAttribute("id", `row0_${num}`);


            head.setAttribute("class", `${s_month} ${day_nm_class} ${full_date}`);
            head.append(text)
            row.appendChild(head);




            num++;
            colnum += 1;


        }

        datestorage[month_name[i]] = date;
        date = [];

    }
    ///////////////////******************************************************* */

    row_nm++;
    rownum += 1;
    let tbody = document.getElementById("tbody_1");
    // tbody.setAttribute("id", "tbody_1");
    let employeeName = Object.keys(emp_nm);
    // //console.log("emp_nm =" + Object.keys(emp_nm).length)
    for (var i = 0; i < employeeName.length; i++) {
        // //console.log("emp_nm.length = " + Object.keys(emp_nm).length)

        let pool = emp_nm[employeeName[i]]["pool"];

        table.appendChild(createTableRow(tbody, employeeName[i], i, pool));
    }
    // initUI();  // hide month and show month
}

//******START CREATE INIT UI////// */

//******END CREATE INIT UI////// */

/*////////GET JSON DATA AND DISPLY IT ////////*/

function getEmpJsonData() {
    let xhttp = new XMLHttpRequest();

    xhttp.open("GET", '/test.json', true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
   // xhttp.setRequestHeader("Content-length",`data=2020&project=NPD`.length);
    xhttp.send(`data=2020&project=NPD`);
    xhttp.onload = function () {
        if (this.readyState == 4 && this.status == 200) {


            if (this.responseText != "") {

                tempJson = JSON.parse(this.responseText)["leave_detail"];
                emp_nm = JSON.parse(this.responseText)["employee_name"];


                //console.log(tempJson)
                //console.log(emp_nm)
            }
            else {
                tempJson = tempJson = [];
                emp_nm = [];

            }

            //console.log(Object.keys(tempJson).length)
            if ((Object.keys(tempJson).length != 0 && Object.keys(emp_nm).length != 0) && (tempJson != undefined && emp_nm != undefined)) {
                createSelectEmp();
                createInitRow();
                applyEventLitn();
                addDataToRow();
            }
            else {


                tempJson = [];
                emp_nm = [];
                createSelectEmp(); //select list 
                createInitRow(); // used to create the header row 
                //  applyEventLitn();
            }


        }
        else if(this.readyState == 4 && this.status == 404)
        {
            
            tempJson = [];
            emp_nm = [];
            createSelectEmp(); //select list 
            createInitRow(); // used to create the header row 
            //  applyEventLitn();
        }

    };




}

/////////////////////////////////////////////


///////////////////////////////////////////

function addFocusListiner(nodename) {
    nodename.addEventListener('focusout', function (e) {

        if (activeCell != null) {

            // //console.log("focusout");

            let container = (activeCell.children)[0];
            // //console.log("onchanged" + container);

            //  //console.log("container")
            activeCell.innerText = container.value;
            color = back_Color(activeCell.innerText, activeCell);
            // activeCell.style.backgroundColor = color;
            // addToJson(activeCell);
            // //console.log("old value from activeCell.innerText = "+oldval);
            addToJson1(activeCell, oldval);

            activeCell = null;


        }


    });
}


///////////////APPLY_EVENT_LITNER//////////
let activeCell = null;
let clickObject = null;
let oldval = null;
let delObjCurr = null;
let delObjPrev = null;
let oldcomment = null;
function applyEventLitn() {
    

    let innerVal;
    let cells = document.getElementsByClassName('content');
    let poolCell = document.getElementsByClassName('pool');

 

    for (let cell of poolCell) {
        cell.addEventListener("click", function () {

            if (poolCell != null && poolCell != undefined) {
                if (delObjPrev != null && this != delObjPrev) {
                    if (delObjPrev.parentNode.classList.contains("poolSelect")) {
                        //console.log(delObjPrev.classList);
                        delObjPrev.parentNode.classList.remove("poolSelect");
                        //console.log("delObjPrev != null")
                    }
                }
                if (this.parentNode.classList.contains("poolSelect")) {
                    this.parentNode.classList.remove("poolSelect")
                    delObjCurr = null;
                    delObjPrev = null;
                    //console.log("curr removev")
                }
                else {

                    this.parentNode.classList.add("poolSelect")
                    delObjCurr = this;
                    //console.log("curr add")
                }
                delObjPrev = this;

            }

        }
        );
    }
    for (let cell of cells) {
        cell.addEventListener("click", function () {

            let prevObj = clickObject;
            clickObject = this;
            if (prevObj != null && prevObj != undefined && prevObj.classList.contains("click_select")) {
                prevObj.classList.remove("click_select");
            }
            if (!(this.classList.contains("click_select"))) {

                this.classList.add("click_select");
                var rect = this.getBoundingClientRect();
               var divreact= document.getElementById("div-1").getBoundingClientRect();
               console.log(divreact.right- rect.right,  rect.left-  divreact.left, this.style.width);

            }
            // //console.log("clicked= " + this);



        });
       
        

        cell.addEventListener("focusout", function () {



            // //console.log("Cell focus out " + this.childElementCount);

            
            if (activeCell != null) {
                this.contentEditable = false;
                color = back_Color(activeCell.innerText, activeCell);
                activeCell.style.backgroundColor = color;
                // addToJson(activeCell);
                // //console.log("old value from activeCell.innerText = "+oldval);
                addToJson1(activeCell, oldval);
                activeCell = null;
                oldval = null;
            }
            else {
                // //console.log("disable")
            }
        });

        /***********************SET DOUBLE CLICK EVENT LISTENER*********** */


        cell.addEventListener("dblclick", function () {

            console.log("db click called");
            innerVal = this.innerText || this.innerHTML;
    


            let headerColId = (this.id).replace(((this.id).split("_"))[0], "row0");
            let headerDate = (document.getElementById(headerColId)).innerText;
            let Fldate = 1;
            [{
                "date": "2019/01/10", "event": "fokatday1"
            }, {
                "date": "2019/02/10", "event": "fokatday2"
            }].forEach((val, index) => {
                if (val["date"] == headerDate) {
                    Fldate = 0;

                }
            });

            

                if (Fldate == 0) {
                    // //console.log("float")
                    if (found == undefined) {

                        activeCell = this;
                        oldval = this.innerText;
                        oldcomment = this.getAttribute("title");
                        this.style.backgroundColor = "";
                        this.contentEditable = true;
                        this.focus();





                    }
                }
                else {

                    console.log("child element");
                    this.contentEditable = true;
                    this.style.backgroundColor = "";
                    oldval = this.innerText;
                    oldcomment = this.getAttribute("title");
                    this.focus();
                    activeCell = this;


                }

            





        });




    }
}


/////// 
/************************ONLOAD METHOD START*************** */





let rightClickObject =null;

window.onload = () => {


    getEmpJsonData(); //this will fetch employee data from server and display 
    defineFloating();
    myToggle();
    createLegend();
    createFloatingTab();
    

   
/*********************************tooltip********** */

$( "#tbody_1" ).sortable();
/********************************* */
document.getElementById("div-1").addEventListener("scroll", function (event) {
    var scroll = this.scrollLeft; 
   // console.log(scroll)
});

$(function() {
    $.contextMenu({
        selector: '.umeric', 
        callback: function(key, options) {
            var m = "clicked: " + key;
            window.console && console.log(m) ; 
           
           
            switch(key) {
                case "Edit_Comment":
                  // code block 
                  
                  rightClickObject=this[0];
                  var rect = this[0].getBoundingClientRect();
                let comment=this[0].getAttribute("title").trim();
                  textarea.innerText=comment;
                  textarea.value=comment;
                  oldComment=comment;
                  console.log(`oldcommenr = ${comment}`)
                  



cmtElmt.style.display="block";
cmtElmt.style.top =rect.top+"px" ;
cmtElmt.style.right=rect.right+"px";
cmtElmt.style.bottom=rect.bottom+"px"
cmtElmt.style.left=rect.left+"px"

textarea.focus();   
textarea.click();       
break;    
case "Reject_Leave":
    this
rejectLeave(this[0])
break;
                default:
                  // code block
              }
           
        },
        items: {
            "Approve_Leave": {name: "Approve_Leave", icon: "edit"},
            "Reject_Leave": {name: "Reject_Leave", icon: "cut"},
            "Edit_Comment": {name: "Edit_Comment", icon: "paste"},
            "delete": {name: "Delete", icon: "delete"},
            "sep1": "---------",
            "quit": {name: "Quit", icon: function(){
                return 'context-menu-icon context-menu-icon-quit';
            }}
        }
    }
    );  
    
});



    // window.addEventListener("keydown", function (e) {
    //     // space and arrow keys

    //     if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    //         e.preventDefault();
    //     }
    // }, false);

    document.onkeydown = getKeyAndMove;



   



}





/************************ONLOAD METHOD END*************** */

/*********************************ADD JSON TO TABLE START *********************************** */
function addDataToRow() {
    //console.log(tempJson);
    let employeeName;

    let rowindex = 0;
    let b = 0;
    let thindex = 1;
    /*****************ADDING extram column in starting ****************** */
    rowindex += 1;
    b += 1;
    thindex += 1;
    /********************************* */
    // //console.log("test case 1 /n" + tempJson);

    // let  table = document.getElementById("tab1");
    let thead = document.getElementById("header_row").children;
    let tbody = document.getElementById("tbody_1").children;
    let tr = document.getElement;


    Object.keys(emp_nm).forEach(function (ovalue, oindex) {

        let empnm = tempJson[ovalue];
        //  //console.log("1 = " + JSON.stringify(empnm))
        //  //console.log("out = "+empnm != null && empnm != undefined);
        if (empnm != null && empnm != undefined) {
            employeeName = ovalue;
            //  //console.log("employee name print == " + employeeName)

            //console.log("table body length = " + tbody.length + " row index = " + rowindex);
            for (var rowCount = 0; rowCount < tbody.length; rowCount++) {

                var emp_name_tr = tbody[rowCount].childNodes[b].innerText;
                //   //console.log(emp_name_tr);


                if (emp_name_tr.toUpperCase() == employeeName.toUpperCase()) {

                    // //console.log("inside == " + emp_name_tr);

                    // //console.log(ivalue["leavedate"]);
                    // //console.log(ivalue["leavetype"]);
                    // //console.log(ivalue["comment"]);
                   // for (var thcount = thindex; thcount < thead.length; thcount++) {


                        //     var leavedate = tempJson[empcount]["leave"][leave]["leavedate"];

                        for (var thcount = thindex; thcount < thead.length; thcount++) {

                            var thdate = thead[thcount].innerText;
                            //        var leavedate = tempJson[empcount]["leave"][leave]["leavedate"];

                            empleavedata = empnm[thdate];
                            if (empleavedata != null && empleavedata != undefined) {
                                let leavetype = empleavedata["leavetype"];
                                let leaveComment = empleavedata["comment"];
                                let innerCell = tbody[rowCount].childNodes[thcount];
                                console.log("innerdiv " + (innerCell.hasChildNodes()))
                                // while(innerCell.hasChildNodes())
                                // {
                                //     let textelement = innerCell.firstChild;
                                //     let className = textelement.classList;
                                //     innerCell =textelement
                                //    if( className[0] == "textarea1" ) 
                                //    {

                                //     break;
                                //    }
                                // }


                                let color = back_Color(leavetype, innerCell);
                                // let temp = innerCell.inn
                                innerCell.setAttribute("title", leaveComment);
                                /*******************BADGE************************ */
                                //    var span = document.createElement("span");
                                //     span.setAttribute("class","badge badge-danger")
                                //    span.innerText="*";
                                /*************************************** */
                                
                                let textNode = document.createTextNode(leavetype);
                               // innerCell.innerVal = leavetype;
                              innerCell.appendChild(textNode);
                                //  innerCell.setAttribute("style",`background-image: url(C:/Users/rahul pancholi/Pictures/Capture.PNG);`);
                                //  innerCell.style.backgroundImage="url('C:/Users/rahul pancholi/Pictures/Capture.PNG'
                            }


                        }



                  //      }


                }
            }








        }
    });



}


/************************************ADD JSON TO TABLE END********************************************************** */

/************CREATE TABLE ROW START******************** */
function createTableRow(parent_element, name, index, pool) {
    let num = 0;
    let row, text;
    let rownum = index + 1;
    let colnum = 0;
    ////console.log(`parentele=${parent_element}\nname=${name}\nindex=${index}`);

    if (parent_element == undefined) {
        tab = document.getElementById("tab1");
        row = tab.insertRow(-1);
    }
    else {
        row = parent_element.insertRow(index);
    }
    // //console.log("index = "+ index);
    row.setAttribute("class", `tab_row_${index + 1}`);
    row.setAttribute("id", `row_${index + 1}`);




    let cell = row.insertCell();
    text = document.createTextNode(pool);
    cell.setAttribute("id", `team_name`);
    cell.setAttribute("class", `pool ${pool}`);
    cell.appendChild(text);
    row.appendChild(cell);

    cell = row.insertCell();
    text = document.createTextNode(name);
   
    cell.setAttribute("ROW_ID", rownum);
    cell.setAttribute("COL_ID", colnum);
    cell.setAttribute("id", `row${index + 1}_${num}`);
    cell.setAttribute("class", "eName");

    cell.appendChild(text);
    row.appendChild(cell);
    num++;
    colnum += 1;

    for (var k = 0; k < month_name.length; k++) {

        let s_month = month_name[k].slice(0, 3).toLowerCase()
        let mth_lst_day = new Date(year, k + 1, 0).getDate().toString();

        for (var m = 1; m <= mth_lst_day; m++) {
            let full_date = year + "/" + appendZero(k + 1) + "/" + appendZero(m); //year/moth/date
            let dayname = new Date(full_date);
            let day_nm_class = day_name[dayname.getDay()].toLowerCase();
            // let span = document.createElement("span");
            // let div = document.createElement("div");


           // let div1 = document.createElement("div");
            // let textarea1 = document.createElement("input");
            // let div2 = document.createElement("div");
    
            // div1.setAttribute("class","div1");
            // div2.setAttribute("class","div2");
            // textarea1.setAttribute("class","textarea1");
            // div1.appendChild(textarea1);
            // div1.appendChild(div2);

    
            // span.setAttribute("class","starimg");
            // span.innerHTML=`&#11088;`;

            cell = row.insertCell();

            // let div1 = document.createElement("div");
            getHeightWidth(cell)

            cell.setAttribute("ROW_ID", rownum);
            cell.setAttribute("COL_ID", colnum);
            cell.setAttribute("id", `row${index + 1}_${num}`);

            // cell.setAttribute("tabindex", "0");
            // cell.appendChild(div1);
            cell.setAttribute("class", `${full_date} content ellipsis ${s_month} ${day_nm_class} non_sel umeric ${s_month} ${day_nm_class}`)
            /*************************************TOOLTIP ADDED ****************** */
            cell.setAttribute("data-toggle", "tooltip");
            cell.setAttribute("title", ``);
          //  cell.appendChild(div1);
            //cell.appendChild(span);
           
            /************************************************************************ */
            // cell.setAttribute("class", ``)
            row.appendChild(cell);
            num++;
            colnum += 1;

        }
    }

    // //console.log("createTableRow() : RUNNING SUCESSFULLY ")
    return parent_element;


}
/************CREATE TABLE ROW END******************** */

//*************************ADD NEW EMPLOYEE START ********************************************* */

function addEmployee() {
    let input1 = document.getElementById("addEmp");
    let input2 = document.getElementById("addEmpTeam");
    let thead = document.getElementById("tbody_1");
    let Uname = input1.value.trim();
    let UTname = input2.value.trim();
    let newEmp = {};
    if (Uname == "" && UTname == "") {
        alert("shold not be empty");
    } else {
        name = titleCase(Uname);
        Tname = titleCase(UTname);
        if (employeeNameAvailablity(name) == false) {

            newEmp[name] = {

                "pool": Tname,
                "disable": "0"
            }
            //console.log(newEmp);
            // emp_nm.push(titleCase(name));
            input1.value = "";
            input2.value = "";

            createTableRow(thead, titleCase(name), -1, Tname);

        }
        else {
            alert("Employ is prsent");
        }


    }
    /*
        createSelectEmp();
        createInitRow();
        addJson1();*/
    //////////////////SEND DATA TO SSERVER //////////////////////


    xhttp.open("POST", "NEW_EMPLOYEE", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    //console.log("empty");
    xhttp.send("emp_data=" + (JSON.stringify(newEmp)));
    xhttp.onload = function () {

        //console.log(`${this.readyState} == 4 $$ ${this.status} == 200`);

    }

    // //console.log( "update = "+JSON.stringify(uarr))  // for updating existing database leave 
    // //console.log( "NEW = "+JSON.stringify(narr))  // for applying new leave 
    // isChanged = "YES"


    //////////////////////////////////////

    newEmp = {};
    applyEventLitn();
    createSelectEmp();

}






//*************************ADD NEW EMPLOYEE START ********************************************* */
function employeeNameAvailablity(name) {
    let flag = 0;
    (Object.keys(emp_nm)).forEach(function (val, ind) {
        // //console.log(`${val.toUpperCase() == name.toUpperCase()} and val ${val} and name ${name}`)

        if (val.toUpperCase() == name.toUpperCase()) {
            flag = 1;
        }
    });

    if (flag == 0) {
        return false;
    }
    else {
        return true;
    }
}
/**********************************************************************/
function createDataArray(arrey, employe__name, applyDate, leave_typ, comment) {

console.log("comment :: ",comment);

    let leave = {};
    let dateFlag = 0;
    let arrPush = 0;
    let arr = arrey;
    empnm = employe__name;


    //console.log("employe name " + empnm);
    arr.forEach(function (ival, iidx) {
        //Updating existing one but not present in database 
        if (ival[empnm] != undefined || ival[empnm] != null) {
            let eval = ival[empnm];
            // //console.log("prsent = " + eval);

            if (eval[applyDate] != undefined) {
                let edate = eval[applyDate];
                edate["leavetype"] = leave_typ
                edate["comment"] = comment;
                dateFlag = 1;

            }


        }
    });

    if (dateFlag == 0) {
        //Add data into employee if prsent




        leave[empnm] =
        {
            [applyDate]:
            {
                "leavetype": leave_typ,
                "comment": comment
            }

        }



        arr.forEach(function (ival, iidx) {
            if (ival[empnm] != undefined || ival[empnm] != null) {
                let eval = ival[empnm];
                eval[applyDate] =
                {
                    "leavetype": leave_typ,
                    "comment": comment
                }

                arrPush = 1;
            }

        });

        if (arrPush != 1) {
            arr.push(leave);
            arrPush = 0;
        }
    } else {
        // //console.log("UDPATE THEEXISTIG");
        dateFlag = 0;

    }

    // //console.log(arr);
    return arr;

}

/************************************************ */

//let arr = []; // for first time applyring leave 
let uarr = []; // for updating existing database leave 
let narr = []; // for applying new leave 
//let darr =[]; // for deteting the leave 
/******************************ADD DATA TO EXISTING JSON FILE START ****************** */
function addToJson1(cell_object, oldVal , oldcomment) {


    let mainCellId = `${cell_object.id.split("_")[0]}_0`;
    let mainCellElement = document.getElementById(mainCellId);


    let flag = 0;
    let empnm = mainCellElement.innerHTML;
    let leave_typ = cell_object.innerText;




    console.log("Add to json ",empnm);


    let mainRowId = (cell_object.id).replace(((cell_object.id).split("_"))[0], "row0");

    //console.log(mainRowId)
    let applyDate = document.getElementById(mainRowId).innerText;
    let comment=cell_object.getAttribute("title");
   
    // if(leave_typ == "" &&  oldVal == "" )
    // {

    // }
    // if (!(leave_typ == "" || leave_typ == undefined))
    if (!(leave_typ == "" && oldVal == "") || !(comment == "" && oldcomment == "")) {

        //console.log("testing = " + JSON.stringify(tempJson[empnm]));
        //console.log("leave === " + cell_object.innerText);
        let employee_name = tempJson[empnm];

        if (employee_name == undefined || employee_name == null) {
            // //console.log("First time applying leave");

            uarr = createDataArray(uarr, empnm, applyDate, leave_typ, comment);
            // //console.log("createDataArray = " + JSON.stringify(arr));

        }
        else {
            // //console.log("Applying new leave for already have taken  leave  or updating existing leave");



            //   //console.log(JSON.stringify(employee_name)); 
            if (employee_name[applyDate] != undefined) {
                // //console.log("UPDAATING EXISTING VALUE FROM DATABASE");

                uarr = createDataArray(uarr, empnm, applyDate, leave_typ, comment);
                // //console.log("createDataArray = " + JSON.stringify(uarr));
                // //console.log(uarr);




            }
            else {

                // //console.log("Applyin new leave for existing employee");
                narr = createDataArray(narr, empnm, applyDate, leave_typ, comment);
                // //console.log("createDataArray = " + JSON.stringify(narr));
                // //console.log(narr);

            }



        }



    } else {

        //    delete or hadel empty string data
        //    //console.log("delete val = "+  oldVal);

    }

    if (Object.keys(narr).length != 0 || Object.keys(uarr).length != 0) {
        isChanged = 1;
        //console.log("change save button color or toggle button");
        myToggle();

  }

   console.log("createDataArray = " + JSON.stringify(uarr));
   console.log("createDataArray = " + JSON.stringify(narr));
}

/******************************ADD DATA TO EXISTING JSON FILE START ****************** */
function mySelection() {
    var checkBox = document.getElementById("myCheck");
    var text = document.getElementById("text");
    if (checkBox.checked == true) {
        selectEnabled = 1;
    } else {
        selectEnabled = 0;
    }
}

/************************SAVE ********************* */


function Save() {
    xhttp.open("POST", "UPDATE", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    if (!(uarr.length == 0 && narr.length == 0)) {
        //console.log("empty");
        xhttp.send("update=" + (JSON.stringify(uarr)) + "&" + "newemp=" + (JSON.stringify(narr)));
        xhttp.onload = function () {

            //console.log(`${this.readyState} == 4 $$ ${this.status} == 200`);

        }

        uarr = [];
        narr = [];
    }
    else {
        //console.log("NO NEW UDATE");
    }

    //console.log("update = " + JSON.stringify(uarr))  // for updating existing database leave 
    //console.log("NEW = " + JSON.stringify(narr))  // for applying new leave 

    if (Object.keys(narr).length == 0 && Object.keys(uarr).length == 0) {
        isChanged = 0;
        //console.log("Data saved sucessfully");
        myToggle();

    }

    // dataSaved.innerText = isChanged;
    // //console.log(isChanged);
}



function defineFloating() {

    let thead = document.getElementById("thead1");
    let abc = (thead.children);
    // //console.log(abc)


}

function reload() {
    location.reload();
}

////////////////////////////////////////////////////////////


function getKeyAndMove(e) {
    var key_code = e.which || e.keyCode;
    if (clickObject != null && clickObject != undefined) {
        let rowid = clickObject.getAttribute("row_id");
        let colid = clickObject.getAttribute("col_id");
        let id = clickObject.id;
        // //console.log(`${rowid}${colid}`);
        rowid++;
        colid++;
        let a = id.split("_")[0].replace("row", "");
        let b = id.split("_")[1];

        switch (key_code) {
            case 37: //left arrow key
                b--;
                break;
            case 38: //Up arrow key
                a--;
                break;
            case 39: //right arrow key
                b++;
                break;
            case 40: //down arrow key
                a++;
                break;
            default:
                //console.log(key_code);
        }



        nextid = `row${a}_${b}`;

        let selCell = document.getElementById(nextid);
        if (selCell != null) {
            selCell.click();
        }


        // document.get

        ////////**************************************** */
        var width = clickObject.offsetWidth;
        var height = clickObject.offsetHeight;
        //console.log(width + " " + height);
        //console.log(document.getElementById("legend_tab1").scrollLeft);

        var rect = clickObject.getBoundingClientRect();


        clickObject.style.left = rect.left;

        //console.log(`${clickObject.style.left}`)
        selected = clickObject.id.split("_")[1]




        var elmnt = document.getElementById("div-1");
        var x = elmnt.scrollLeft;
        var y = elmnt.scrollTop;
        var viewport = x + width;
        var elOffset = width * selected;
        //console.log(`x=${x} VIEWPORT=${viewport} selected=${selected} elOffset=${elOffset} width =${width}`)

        // if (elOffset < x || (elOffset + width) > viewport)
        // elmnt.scrollBy(elOffset, 0);


        /**************************************************************************** */

    }
}





function sortTable() {
    emp_nm.sort();
    // //console.log(emp_nm);



}

function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("tbody_1");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

document.onkeydown = function (t) {
    if (t.which == 9) {
        return false;
    }



}

function Delete() {

    if (delObjCurr != null) {
        let node = delObjCurr.parentNode;
        let id = node.id.split("_")[1];
        //console.log(id)


        xhttp.open("POST", "DELETE", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        let emp_node = document.getElementById(`row${node.id.split("_")[1]}_0`);
         let employename = emp_node.innerText
        //console.log(employename);

        //console.log(node.parentNode.removeChild(node));
        xhttp.send("emp_name=" + (JSON.stringify(employename)));
        xhttp.onload = function () {

            //console.log(`${this.readyState} == 4 $$ ${this.status} == 200`);

        }
    
console.log(node.style.display="none");

        delObjCurr = null;
        delObjPrev = null;



    }
}

function myToggle() {
    toggle_bt = document.getElementById("toggle_bt");
    //console.log(toggle_bt.checked);
    if (isChanged == 1) {
        toggle_bt.checked = false;
    }
    else {
        toggle_bt.checked = true;
    }
}

let leave_color = {};
function createLegend() {


    let xhttp = new XMLHttpRequest();

    xhttp.open("GET", '/leave_color.json', true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();
    xhttp.onload = function () {
        if (this.readyState == 4 && this.status == 200) {


            if (this.responseText != "") {

                leave_color = JSON.parse(this.responseText);
                let lBody = document.getElementById("LH_TBODY");
                Object.keys(leave_color).forEach(function (val, ind) {
                    t_row = lBody.insertRow();
                    t_cell = t_row.insertCell();
                    t_cell.style.backgroundColor = val;
                    t_cell.innerHTML = `<input type="color" class="form-control" id="favcolor" onchange="chnageColor(this)" name="favcolor" value=${val}></input>`;
                    t_cell = t_row.insertCell();
                    t_cell.innerHTML = leave_color[val];



                })






            }
            else {
                leave_color = {};

            }

        }
    }





}


function chnageColor(currretObject) {
    //console.log(currretObject.value);
    //console.log(currretObject.getAttribute("value"));


}



/************************************************** */
function createFloatingTab() {


    let xhttp = new XMLHttpRequest();

    xhttp.open("GET", '/FLOATING_FILE', true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();
    xhttp.onload = function () {
        if (this.readyState == 4 && this.status == 200) {


            if (this.responseText != "") {

                floating_leave = JSON.parse(this.responseText);
                let lBody = document.getElementById("FL_TBODY");
                Object.keys(floating_leave).forEach(function (val, ind) {


                    t_row = lBody.insertRow();
                    t_cell = t_row.insertCell();
                    t_cell.innerHTML = val;
                    t_cell = t_row.insertCell();
                    t_cell.innerHTML = JSON.stringify(floating_leave[val]["FloatLeave"]);

                })




                floatingTable();

            }
            else {
                floating_leave = {};
                floatingTable();

            }

        }
    }




}

function formdata()
{
    
    cmtElmt.style.display="none";
    newComment=textarea.value.trim();
    textarea.disable;
    console.log(`newcommenr = ${newComment}`)
    if((newComment!=null && oldComment!=null))
    {
        if(newComment == oldComment)
        {
            console.log("NO NEW CHNAGE");
            newComment=null;
            oldComment=null;
        }
        else{
        
            rightClickObject.setAttribute("title",newComment);
            addToJson1(rightClickObject,rightClickObject.innerVal,oldComment);
            console.log("NEW CHNAEGS");
            newComment=null;
            oldComment=null;
        }
    }


}
function Cancledata()
{
    cmtElmt.style.display="none";
    textarea.value="";
}

function rejectLeave(obj)
{
    old=obj.innerHTML;
    obj.innerHTML="REJ"
    back_Color("REJ", obj)
    addToJson1(obj,old);
    console.log(obj,old)

    
}

function floatingTable()
{
    letflBody=document.getElementById("FL_TBODY");
    let child = ( letflBody.childNodes);
    console.log(child.length);
    for(i=0; i<child.length;i++)
    {
        
        console.log(child[i]);
        let trChild = ( child[i].childNodes);
        console.log(trChild.length);

        for(j=0; j<trChild.length;j++)
        {
            child[j].addEventListener("dblclick", function () {
        
                child[j].contentEditable = true;
                child[j].focus();
                console.log(child[j]);
        
              });
              
              child[j].addEventListener('focusout', function (e) {
                child[j].contentEditable = false;
        
              }
              );
        }
         


    
    }
  fetch("/commentIMAGE", {
        method:"POST"
      , body:new URLSearchParams("email=test@example.com&password=pw")
      })
    
}