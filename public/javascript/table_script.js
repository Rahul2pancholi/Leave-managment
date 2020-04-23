
let selectEnabled = 0;
let month_name = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let day_name = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let year;
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
let oldComment = null;
let newComment = null;
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
function applyLeaveByDateRange() {

    let start = document.getElementById("startdatepicker");
    let end = document.getElementById("enddatepicker");
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

            clrobj.style.backgroundColor = document.getElementById("FL_C").style.backgroundColor;
            clrobj.style.backgroundColor = "!important";
            break;

        case "PL":
            clrobj.style.backgroundColor = document.getElementById("PL_C").style.backgroundColor;

            break;
            case "UL" :   clrobj.style.backgroundColor = document.getElementById("UL_C").style.backgroundColor;
            break;
case "PL(A)" : 
    case "FL(A)" :  clrobj.style.backgroundColor = document.getElementById("APPROVE_C").style.backgroundColor;

break;
case "PL(R)" : 
    case "FL(R)" :  clrobj.style.backgroundColor = document.getElementById("REJ_C").style.backgroundColor;

    break;
    case "PL(T)" : 
    case "FL(T)" :  clrobj.style.backgroundColor = document.getElementById("TENTATIVE_C").style.backgroundColor;

    break;
    case "PL(ALT)" : 
    case "FL(ALT)" :  clrobj.style.backgroundColor = document.getElementById("ALT_C").style.backgroundColor;

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
function dateFormatter(year,month,day)
{
return `${day}-${month}-${year}`;
}
//////create all row //////


function createDivSpan(insidele)
{
var div=document.createElement("div");
var span=document.createElement("span")
span.appendChild(insidele);
 div.appendChild(span);
 return div;
}

let date = [];
function createInitRow() {

    // //console.log("createInitRow ");

    let num = 1;  // this num  is used to make column no. ex row0_${num} row0_1,row0_2

    let thead = document.getElementById("thead1");
    let table = document.getElementById("tab1");
    let row = thead.insertRow();
    let head, text;
    let rownum = 0, colnum = 0;

/*******************************COLUMN-1  ********** */
    head = document.createElement("th");
    // text = document.createTextNode("Team_Name");
    // head.append(text)
    let checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("id", `all_checkbox`);
    head.setAttribute("id", `checkbox_head`);
    // head.setAttribute("class", `pool`);
    head.setAttribute("onclick", "selectAllCheckBOX(this)");
    divspan=createDivSpan(checkBox);
    head.appendChild(divspan)
    row.appendChild(head);
    // row.setAttribute("class", ` Team_Name`)

    /*******************************COLUMN-2  ********** */

    head = document.createElement("th");
    text = document.createTextNode("Team_Name");
    head.setAttribute("id", `team_name`);
    head.setAttribute("class", ` rotate`);
    head.setAttribute("onclick", `sortTable(1)`);
    divspan=createDivSpan(text);
    head.appendChild(divspan)
    row.appendChild(head);
    // row.setAttribute("class", ` Team_Name`)


/*******************************COLUMN-3  ********** */
    head = document.createElement("th");
    text = document.createTextNode("Emp_Name");
    head.append(text)
    head.setAttribute("id", `row0_0`);
    head.setAttribute("class", ` rotate`);
    head.setAttribute("ROW_ID", rownum);
    head.setAttribute("COL_ID", colnum);
    divspan=createDivSpan(text);
    head.appendChild(divspan)
    row.appendChild(head);
    row.setAttribute("class", `tab_row_0 Emp_Name`);
    row.setAttribute("id", "header_row");



/*******************************All remaining COLUMN********** */

    let row_nm = 0;
    colnum += 1;
    let day_nm_class;
    for (var i = 0; i < month_name.length; i++) {

        let s_month = month_name[i].slice(0, 3).toLowerCase()
        let mth_lst_day = new Date(year, i + 1, 0).getDate().toString();
        for (var j = 1; j <= mth_lst_day; j++) {

          //  let full_date = year + "/" + appendZero(i + 1) + "/" + appendZero(j); //year/moth/date
          let full_date = year + "/" + appendZero(i + 1) + "/" + appendZero(j); //year/moth/date

            let dayname = new Date(full_date);

            full_date=dateFormatter(dayname.getFullYear(),s_month,dayname.getDate());
            day_nm_class = day_name[dayname.getDay()].toLowerCase();

            // //console.log(full_date) ////console
            date.push(full_date);
            head = document.createElement("th");
            head.setAttribute("class", "tab_head");
            text = document.createTextNode(full_date);


            head.setAttribute("ROW_ID", rownum);
            head.setAttribute("COL_ID", colnum);
            head.setAttribute("id", `row0_${num}`);


            head.setAttribute("class", `${s_month} ${full_date} rotate`);

            divspan=createDivSpan(text);
    head.appendChild(divspan)
    row.appendChild(head);
           




            num++;
            colnum += 1;


        }

        datestorage[month_name[i]] = date;
        date = [];

    }
    ///////////////////******************************************************* */


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
    xhttp.send();
    xhttp.onload = function () {
        if (this.readyState == 4 && this.status == 200) {


            if (this.responseText != "") {


                console.log(this.responseText);
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

                xhttp.open("GET", '/getvar', true);
                xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                // xhttp.setRequestHeader("Content-length",`data=2020&project=NPD`.length);
                xhttp.send();
                xhttp.onload = function () {
                    if (this.readyState == 4 && this.status == 200) {


                        year = JSON.parse(this.responseText).year;
                        console.log(year);
                        createSelectEmp();
                        createInitRow();
                        applyEventLitn();
                        addDataToRow();

                    }

                }
            }
            else {

                xhttp.open("GET", '/getvar', true);
                xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                // xhttp.setRequestHeader("Content-length",`data=2020&project=NPD`.length);
                xhttp.send();
                xhttp.onload = function () {
                    if (this.readyState == 4 && this.status == 200) {


                        year = JSON.parse(this.responseText).year;
                        tempJson = [];
                        emp_nm = [];
                        createSelectEmp(); //select list 
                        createInitRow(); // used to create the header row 
                        //  applyEventLitn();
                    }
                }
            }


        }
        else if (this.readyState == 4 && this.status == 404) {

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
           back_Color(activeCell.innerText, activeCell);
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
let ctClickArr = [];
function applyEventLitn() {


    let innerVal;
    let cells = document.getElementsByClassName('content');




    for (let cell of cells) {
        cell.addEventListener("click", function (event) {
        
            clickObject = this;
        


            if (cntrlIsPressed) {
                console.log("called ")
                if (this.classList.contains("click_select")) {
                    clickObject.classList.remove("click_select");
                    ctClickArr = arrayRemove(ctClickArr, this);


                } else {
                    clickObject.classList.add("click_select");
                    console.log(clickObject.classList)
                    ctClickArr.push(this);
                }

            } else {

                for (var i = 0; i < ctClickArr.length; i++) {
                    ctClickArr[i].classList.remove("click_select");

                }

                if (!(this.classList.contains("click_select"))) {
                    this.classList.add("click_select");
                    ctClickArr = [];
                    ctClickArr.push(this);
                }
                else {
                    this.classList.remove("click_select");
                    ctClickArr = arrayRemove(ctClickArr, this);
                }


            }



            console.log(ctClickArr);

        });



        cell.addEventListener("focusout", function () {



            console.log("Cell focus out ");


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





let rightClickObject = null;
var cntrlIsPressed = false;

window.onload = () => {

    getEmpJsonData(); //this will fetch employee data from server and display 
    // defineFloating();
    myToggle();
    // createLegend();
    createFloatingTab();
    $("#myspan").click(function () {
        Applyleavebycolor("PL");
    });
    $("#UL").click(function () {
        Applyleavebycolor("UL");
    });$("#FL").click(function () {
        Applyleavebycolor("FL");
    });$("#REJ").click(function () {
        Applyleavebycolor("REJ");
    });
    $("#APPROVE").click(function () {
        Applyleavebycolor("APP");
    });

    $("#ALT").click(function () {
        Applyleavebycolor("ALT");
    });
    $("#TENTATIVE").click(function () {
        Applyleavebycolor("TEN");
    });






    $(document).keydown(function (event) {
        switch (event.which) {
            case 17: cntrlIsPressed = true;
                break;
            case 46: deleteElementValue(); console.log("delete");
        }
        //     if(event.which=="17")
        //         cntrlIsPressed = true;
    });

    $(document).keyup(function (event) {
        cntrlIsPressed = false;
    });





    /*********************************tooltip********** */

    $("#tbody_1").sortable({
        placeholder: "highlight",
        start: function (event, ui) {
            ui.item.toggleClass("highlight");
            console.log("start");
        },
        stop: function (event, ui) {
            ui.item.toggleClass("highlight");
            console.log("stop");
            changeOrder(ui, event);

        }
    });



    /********************************* */
    document.getElementById("div-1").addEventListener("scroll", function (event) {
        var scroll = this.scrollLeft;
        // console.log(scroll)
    });

    $(function () {
        $.contextMenu({
            selector: '.umeric',
            callback: function (key, options) {
                var m = "clicked: " + key;
                window.console && console.log(m);


                switch (key) {
                    case "Edit_Comment":
                        // code block 

                        rightClickObject = this[0];
                        var rect = this[0].getBoundingClientRect();
                        let comment = this[0].getAttribute("title").trim();
                        textarea.innerText = comment;
                        textarea.value = comment;
                        oldComment = comment;
                        console.log(`oldcommenr = ${comment}`)




                        cmtElmt.style.display = "block";
                        cmtElmt.style.top = rect.top + "px";
                        cmtElmt.style.right = rect.right + "px";
                        cmtElmt.style.bottom = rect.bottom + "px"
                        cmtElmt.style.left = rect.left + "px"

                        textarea.focus();
                        textarea.click();
                        break;
                    case "Reject_Leave":
                        rejectLeave(this[0])
                        break;
                    default:
                    // code block
                }

            },
            items: {
                "Approve_Leave": { name: "Approve_Leave", icon: "edit" },
                "Reject_Leave": { name: "Reject_Leave", icon: "cut" },
                "Edit_Comment": { name: "Edit_Comment", icon: "paste" },
                "delete": { name: "Delete", icon: "delete" },
                "sep1": "---------",
                "quit": {
                    name: "Quit", icon: function () {
                        return 'context-menu-icon context-menu-icon-quit';
                    }
                }
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

    let rowindex = 1;
    let b = 1;
    let thindex = 2;
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


    var cell = row.insertCell();
    let checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("onclick", "selectCheckBOX(this)");
    checkBox.setAttribute("id", "main_chkbox_" + index);
    cell.appendChild(checkBox);
    row.appendChild(cell);


    var cell = row.insertCell();
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
            full_date=dateFormatter(dayname.getFullYear(),s_month,dayname.getDate());
            let day_nm_class = day_name[dayname.getDay()].toLowerCase();

            cell = row.insertCell();

            cell.setAttribute("ROW_ID", rownum);
            cell.setAttribute("COL_ID", colnum);
            cell.setAttribute("id", `row${index + 1}_${num}`);

            // cell.setAttribute("tabindex", "0");
            // cell.appendChild(div1);
            cell.setAttribute("date", full_date);
            cell.setAttribute("ename", name);

            cell.setAttribute("class", `content ellipsis ${s_month} ${day_nm_class} non_sel umeric ${s_month} ${day_nm_class}`)
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

    console.log("comment :: ", comment);

    let leave = [];
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
function addToJson1(cell_object, oldVal, oldcomment) {


    let flag = 0;

    let empnm = cell_object.getAttribute("ename");
    let leave_typ = cell_object.innerText;

    let applyDate = cell_object.getAttribute("date");
    let comment = cell_object.getAttribute("title");

    if (!(leave_typ == "" && oldVal == "") || !(comment == "" && oldcomment == "")) {

        let employee_name = tempJson[empnm];

        if (employee_name != undefined && employee_name != null) {
            // //console.log("First time applying leave");

            uarr = createDataArray(uarr, empnm, applyDate, leave_typ, comment);
            // //console.log("createDataArray = " + JSON.stringify(arr));

        }
        else {

            console.log("called naarr " + JSON.stringify(narr));
            narr = createDataArray(narr, empnm, applyDate, leave_typ, comment);

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




function reload() {
    location.reload();
}

////////////////////////////////////////////////////////////

function finalmove(a, b) {
    nextid = `row${a}_${b}`;

    let selCell = document.getElementById(nextid);
    if (selCell != null) {
        selCell.click();
    }
}
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
                finalmove(a, b)
                break;
            case 38: //Up arrow key
                a--;
                finalmove(a, b)
                break;
            case 39: //right arrow key
                b++;
                finalmove(a, b)
                break;
            case 40: //down arrow key
                a++;
                finalmove(a, b)
                break;
            
        }

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
        td = tr[i].getElementsByTagName("td")[2];
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

    for(var i=0;i<checkbox_arr.length;i++)
 {
  
        let node = checkbox_arr[i];
       // let id = node.id.split("_")[1];
        //console.log(id)


        xhttp.open("POST", "DELETE", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        let emp_node = document.getElementById(`row${node.id.split("_")[1]}_0`);
        let employename = emp_node.innerText
        xhttp.send("emp_name=" + (JSON.stringify(employename)));
        xhttp.onload = function () {  }
        console.log(node.style.display = "none");

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
                    let checkBox = document.createElement("input");
                    checkBox.setAttribute("type", "checkbox");
                    checkBox.setAttribute("id", "chkbox" + ind);
                    t_cell.appendChild(checkBox);
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

function formdata() {

    cmtElmt.style.display = "none";
    newComment = textarea.value.trim();
    textarea.disable;
    console.log(`newcommenr = ${newComment}`)
    if ((newComment != null && oldComment != null)) {
        if (newComment == oldComment) {
            console.log("NO NEW CHNAGE");
            newComment = null;
            oldComment = null;
        }
        else {

            rightClickObject.setAttribute("title", newComment);
            addToJson1(rightClickObject, rightClickObject.innerVal, oldComment);
            console.log("NEW CHNAEGS");
            newComment = null;
            oldComment = null;
        }
    }


}
function Cancledata() {
    cmtElmt.style.display = "none";
    textarea.value = "";
}

function rejectLeave(obj) {
    old = obj.innerHTML;
    obj.innerHTML = "REJ"
    back_Color("REJ", obj)
    addToJson1(obj, old);
    console.log(obj, old)


}

function floatingTable() {
    letflBody = document.getElementById("FL_TBODY");
    let child = (letflBody.childNodes);
    for (var i = 0; i < child.length; i++) {
        let trChild = (child[i].childNodes);
   trChild.forEach((value, index) => { DoubleClickLitner(value); FocusOutListner(value) });

 
    }
}
function DoubleClickLitner(element) {
    element.addEventListener("dblclick", function () {

        element.contentEditable = true;
        element.focus();
        console.log(element);

    });
}
function FocusOutListner(element) {
    element.addEventListener('focusout', function (e) {
        element.contentEditable = false;

    }
    );
}
function changeOrder(a, b) {

}

let checkbox_arr = [];
function selectCheckBOX(currnetObject) {
    var parentNode = currnetObject.parentNode.parentNode;
    if (currnetObject.checked) {

        console.log(parentNode.classList.add("poolSelect"));
        checkbox_arr.push(parentNode);


    }
    else {
        console.log(parentNode.classList.remove("poolSelect"));
        checkbox_arr = arrayRemove(checkbox_arr, parentNode);

    }

    console.log(checkbox_arr);
}
function selectAllCheckBOX(currnetObject) {
    console.log(this);
}

function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
        return ele != value;
    });
}


function Applyleavebycolor(type) {
    console.log(tempJson);

    let leavtype="";
    let final="";
    switch(type)
    {
        case "PL" : leavtype="PL";break; 
        case "FL" :leavtype="FL";break;
        case "UL": leavtype="UL";break;
        case "REJ" : leavtype="REJ";break;
        case "APP" :leavtype="APP";break;
        case "ALT" :leavtype="ALT";break;
        case "TEN" :leavtype="TEN"
    }
   
    console.log("cllled")
    if (ctClickArr.length > 0) {

let ename = "";
let applydate = "";
        for (let i = 0; i < ctClickArr.length; i++) {
            console.log("call arr = "+( ctClickArr[i].innerText.length == "0" ) )

            if(!( leavtype != "PL" && leavtype != "UL" && leavtype != "FL" ) )
            {
               
                    console.log("inside")
                    applydate = ctClickArr[i].getAttribute("date");
                    ename = ctClickArr[i].getAttribute("ename");
                    ctClickArr[i].innerText = leavtype;
                    final=leavtype;
                    back_Color(final, ctClickArr[i]);
                   
                
                    
                }
                else
                {
                
                    if(ctClickArr[i].innerText.length >  0 )
                    {

                        innerval=ctClickArr[i].innerText.slice(0,2) 
                    switch(leavtype)
                    {
                    
                    case "REJ" :    applydate = ctClickArr[i].getAttribute("date");
                    ename = ctClickArr[i].getAttribute("ename");
                    final = innerval+"(R)";
                     ctClickArr[i].innerText = final;
                
                    back_Color(final, ctClickArr[i]); break;
                    case "APP" : 
                    applydate = ctClickArr[i].getAttribute("date");
                    ename = ctClickArr[i].getAttribute("ename");
                    final = innerval+"(A)";
                     ctClickArr[i].innerText = final;
                    
                    back_Color(final, ctClickArr[i]); break;
                    case "ALT" : 
                    applydate = ctClickArr[i].getAttribute("date");
                    ename = ctClickArr[i].getAttribute("ename");
                    final = innerval+"(ALT)";
                     ctClickArr[i].innerText = final;
                     
                    back_Color(final, ctClickArr[i]); break;
                    case "TEN" : 
                    applydate = ctClickArr[i].getAttribute("date");
                    ename = ctClickArr[i].getAttribute("ename");
                    final = innerval+"(T)";
                     ctClickArr[i].innerText = final;
                     
                    back_Color(final, ctClickArr[i]); break;
                    
                }
            }


                }



                if (tempJson[ename] != undefined) {
                    createDataArray(uarr, ename, applydate, final, "");
            }
            else {
        
                    createDataArray(narr, ename, applydate, final, "");
                }

            }
        }  
        
        
}
function deleteElementValue() {

    if (ctClickArr.length > 0) {

        for (let i = 0; i < ctClickArr.length; i++) {
            applydate = ctClickArr[i].getAttribute("date");
            ename = ctClickArr[i].getAttribute("ename");
            oldVal = ctClickArr[i].innerText = "";
            back_Color("", ctClickArr[i]);
            if (oldval != "") {

                if (tempJson[ename] != undefined) {
                    createDataArray(uarr, ename, applydate, "", "");
                }
                else {
                    createDataArray(narr, ename, applydate, "", "");
                }
            }


        }


    }
}

var asc = 0;
function sort_table(table, col) {
    $('.sortorder').remove();
    if (asc == 2) { asc = -1; } else { asc = 2; }
    var rows = table.tBodies[0].rows;
    var rlen = rows.length - 1;
    var arr = new Array();
    var i, j, cells, clen;
    // fill the array with values from the table
    for (i = 0; i < rlen; i++) {
        cells = rows[i].cells;
        clen = cells.length;
        arr[i] = new Array();
        for (j = 0; j < clen; j++) { arr[i][j] = cells[j].innerHTML; }
    }
    // sort the array by the specified column number (col) and order (asc)
    arr.sort(function (a, b) {
        console.log("val of a b = "+a,b);
        var retval = 0;
        var col1 = a[col].toLowerCase().replace(',', '').replace('$', '').replace(' usd', '')
        var col2 = b[col].toLowerCase().replace(',', '').replace('$', '').replace(' usd', '')
        console.log("val of col = "+col1,col2)
        var fA = parseFloat(col1);
        var fB = parseFloat(col2);
        if (col1 != col2) {
            if ((fA == col1) && (fB == col2)) { retval = (fA > fB) ? asc : -1 * asc; } //numerical
            else { retval = (col1 > col2) ? asc : -1 * asc; }
        }
        return retval;
    });
    for (var rowidx = 0; rowidx < rlen; rowidx++) {
        for (var colidx = 0; colidx < arr[rowidx].length; colidx++) 
        { 
            table.tBodies[0].rows[rowidx].cells[colidx].innerHTML = arr[rowidx][colidx];
         }
    }

    hdr = table.rows[0].cells[col];
    if (asc == -1) {
        $(hdr).html($(hdr).html() + '<span class="sortorder">▲</span>');
    } else {
        $(hdr).html($(hdr).html() + '<span class="sortorder">▼</span>');
    }
}


function sortTable(n) {
    /*sort_table(document.getElementById("tab1"), n);*/
}
