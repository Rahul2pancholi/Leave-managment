
const error = "ERROR";
const success = "SUCCESS"
const duplicateId = "DUPLICATE_EMPLOYEE_ID"


let cmtElmt = document.getElementById("cmtID");
let textarea = document.getElementById("lastname");
let c_name = document.getElementById("c_name");
let c_date = document.getElementById("c_date");
let toggle_bt = document.getElementById("toggle_bt");
let emp_data = [];
let emp_nm = [];
let tempJson = [];

let year;
let isAvailable = 0;

let xhttp = new XMLHttpRequest();
let oldComment = null;
let newComment = null;

/*********************CLASS NAME ***** */
let classNameForCheckBox;
let classNameForTeam;
let classNameForEmployee;
/***************class ****************** */

/**************createCalenderArray variable************* */
let calenderArray = new Array();
let calenderObject = {};
let month_name = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];
let day_name = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
/********************************###################FUNCTION START###########**************** */

// let freezArray = new Array();
let freezToDate; //=`01-jan-${year}`;
let freezFromDate; //=dateFormatter(year,month_name[d.getMonth()+1],d.getDay());

function freezSheetFunction(freezDateCheck) {

  
  var d1 = freezFromDate.split("-");
  var d2 = freezToDate.split("-");
  var c = freezDateCheck.split("-");

  //console.log(d1[2],parseInt(month_name.indexOf(d1[1])), d1[0]);// year , month, date
  var from = new Date(d1[2], parseInt(month_name.indexOf(d1[1])), d1[0]); // -1 because months are from 0 to 11
  var to = new Date(d2[2], parseInt(month_name.indexOf(d2[1])), d2[0]);
  var check = new Date(c[2], parseInt(month_name.indexOf(c[1])), c[0]);

  return check >= from && check <= to;
}

function createCalenderArray() {
  let tempArray = new Array();

  for (var i = 0; i < month_name.length; i++) {
    let s_month = month_name[i].toLowerCase();
    let mth_lst_day = new Date(2020, i + 1, 0).getDate().toString();
    tempArray[s_month];
    for (var j = 1; j <= mth_lst_day; j++) {
      let dateWithSlashFormate = `${year}/${i + 1}/${j}`; // { yyyy/mm/dd }
      let finalDate = new Date(dateWithSlashFormate);

      dateWithDashFormate = dateFormatter(
        finalDate.getFullYear(),
        s_month,
        finalDate.getDate()

      ); // { dd-mmm-yyyy }
      day_nm_class = day_name[finalDate.getDay()].toLowerCase();
      //console.log(dateWithDashFormate)9
      tempArray.push(dateWithDashFormate + "," + day_nm_class);
    }
    calenderObject[s_month] = tempArray;
    tempArray = [];
  }
}

/**************************  */
/***********************TITLE FOR NAME******************** */

function titleCase(string) {
  var sentence = string.toLowerCase().split(" ");
  for (var i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }
  return sentence.join(" ");
}

/***********************TITLE FOR NAME END******************** */

/**************************************CREATE DATE FORAMTE START***************** */
function createDate(date_array) {
  let year = date_array[0];
  let month = appendZero(date_array[1]);
  let day = appendZero(date_array[2]);
  return `${year}/${month}/${day}`;
}
/********************APPEND ZERO START***************** */
function appendZero(temp) {
  if (temp.toString().length < 2) {
    return `0${temp}`;
  } else {
    return temp;
  }
}
///////////select emp list end /////////
function dateFormatter(year, month, day) {
  return `${appendZero(day)}-${appendZero(month)}-${year}`;
}
//////create all row //////

function createDivSpan(insidele) {
  var div = document.createElement("div");
  var span = document.createElement("span");
  span.appendChild(insidele);
  div.appendChild(span);
  return div;
}

let date = [];
let countInitRowfuntionCallCount = 0;



function createInitRow() {
  countInitRowfuntionCallCount++;
  // //console.log("createInitRow ");
  let num = 1; // this num  is used to make column no. ex row0_${num} row0_1,row0_2

  let thead = document.getElementById("thead1");
  let table = document.getElementById("tab1");
  let row = thead.insertRow();
  let head, text;
  let rownum = 0,
   colnum = 0;

  /*******************************COLUMN-1  ********** */
  head = document.createElement("th");
  // text = document.createTextNode("Team_Name");
  // head.append(text)
  let checkBox = document.createElement("input");
  
  setAttributes(checkBox,{"type": "checkbox","id": `all_checkbox`,"onclick": "selectAllCheckBOX(this)"});
  setAttributes(head,{"id": `checkbox_head`,"class": `fixed`});

  divspan = createDivSpan(checkBox);
  head.appendChild(divspan);
  row.appendChild(head);
  // row.setAttribute("class", ` Team_Name`)

  /*******************************COLUMN-2  ********** */

  head = document.createElement("th");
  text = document.createTextNode("Team");
  setAttributes(head,{"id": `team_name`,"class": ` fixed pool`});
  head.appendChild(text);
  row.appendChild(head);
  // row.setAttribute("class", ` Team_Name`)

  /*******************************COLUMN-3  ********** */
  head = document.createElement("th");
  text = document.createTextNode("Employee");
  head.append(text);
  setAttributes(head,{"id": `row0_0`,"class": `fixed ename`,"ROW_ID": rownum,"COL_ID" : colnum});
  head.appendChild(text);
  row.appendChild(head);
  row.setAttribute("class", `tab_row_0 Emp_Name`);
  row.setAttribute("id", "header_row");

  /*******************************All remaining COLUMN********** */

  Object.keys(calenderObject).forEach(function (value, index) {
    calenderObject[value].forEach(function (value, index) {
      splittedValue = value.split(",");
      date = splittedValue[0];
      weekName = splittedValue[1];

      head = document.createElement("th");
      head.setAttribute("class", "tab_head");
      text = document.createTextNode(date);

      head.setAttribute("ROW_ID", rownum);
      head.setAttribute("COL_ID", colnum);
      // console.log(colnum)
      head.setAttribute("id", `row0_${num}`);

      head.setAttribute(
        "class",
        `${weekName} ${date} rotate verticalTableHeader`
      );

      divspan = createDivSpan(text);
      head.appendChild(divspan);
      row.appendChild(head);

      num++;
      colnum += 1;
    });
  });

  ///////////////////******************************************************* */

  rownum += 1;
  let tbody = document.getElementById("tbody_1");
  // tbody.setAttribute("id", "tbody_1");
  let employeeName = Object.keys(emp_nm);
  // //console.log("emp_nm =" + Object.keys(emp_nm).length)
  for (var i = 0; i < employeeName.length; i++) {
    // //console.log("emp_nm.length = " + Object.keys(emp_nm).length)

    let pool = emp_nm[employeeName[i]]["pool"];
  //  console.log(emp_nm[employeeName[i]]);

    table.appendChild(createTableRow(tbody, emp_nm[employeeName[i]].name,emp_nm[employeeName[i]].id, i, pool));
  }
  // initUI();  // hide month and show month
}

//******START CREATE INIT UI////// */

//******END CREATE INIT UI////// */

/*////////GET JSON DATA AND DISPLY IT ////////*/

function getEmpJsonData() {
  let xhttp = new XMLHttpRequest();

  xhttp.open("GET", "/test.json", true);
  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  // xhttp.setRequestHeader("Content-length",`data=2020&project=NPD`.length);
  xhttp.send();
  xhttp.onload = function () {
 
    if (this.readyState == 4 && this.status == 200) {
      if (this.responseText.length != 0) {
        tempJson = JSON.parse(this.responseText)["leave_detail"];
        emp_nm = JSON.parse(this.responseText)["employee_name"];
      } else {
        tempJson.length = 0;
        emp_nm.length = 0;
      }
      if (
        Object.keys(tempJson).length != 0 &&
        Object.keys(emp_nm).length != 0 &&
        tempJson != undefined &&
        emp_nm != undefined
      ) {
        xhttp.open("GET", "/getvar", true);
        xhttp.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
     
     
     
        xhttp.send();
        xhttp.onload = function () {
          if (this.readyState == 4 && this.status == 200) {
            year = JSON.parse(this.responseText).year;
            createCalenderArray();
            //  createSelectEmp();
            createInitRow();
            freezFromDate = `01-jan-${year}`;
            var d = new Date();
            d.setDate(d.getDate() - 1);
            // console.log(d.getDay())
            freezToDate = dateFormatter(
              year,
              month_name[d.getMonth()],
              d.getDate()
            );

            addDataToRow();
            applyEventLitn();

fixedColumn();
           
          }
        };
      } 
      else {

        xhttp.open("GET", "/getvar", true);
        xhttp.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
        // xhttp.setRequestHeader("Content-length",`data=2020&project=NPD`.length);
        xhttp.send();
        xhttp.onload = function () {
          if (this.readyState == 4 && this.status == 200) {
            year = JSON.parse(this.responseText).year;
            tempJson = [];
            emp_nm = [];
            createCalenderArray();
              // createSelectEmp(); //select list
              createInitRow(); // used to create the header row
            //  applyEventLitn();
          }
        };
      }
    } else if (this.readyState == 4 && this.status == 404) {
      tempJson = [];
      emp_nm = [];
      createCalenderArray();
     // createSelectEmp(); //select list
      createInitRow(); // used to create the header row
      //  applyEventLitn();
    }
  };
}

function fixedColumn()
{
  $(".fixed").each(function () {
                
    var offset = getOffset(this);
    const { left, top, right, bottom } = offset;
    $(this).css("left", (right - left) -(29));


   
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
  let cells = document.getElementsByClassName("content");
  for (let cell of cells) {
     ["click", "focusout", "dblclick"].forEach((evt) =>
      cell.addEventListener(evt, function () {
        switch (evt) {
          case "click":
            clickSelection(this);
            break;
          case "focusout":
            // console.log("Cell focus out = " +activeCell);
            for (var i = 0; i < ctClickArr.length; i++) {
              ctClickArr[i].classList.remove("click_select");
            }
            ctClickArr.length = 0;

            if (activeCell != null) {
              this.contentEditable = false;

              //back_Color(activeCell.innerText, activeCell);
              addToJson1(activeCell, oldval);
              console.log(activeCell.innerText);
              activeCell = null;
              oldval = null;
            } else {
              // //console.log("disable")
            }

            break;
          case "dblclick":
    
            makeEditableCell(this);

            break;
        }
      })
    );

    //}
  }

  function clickSelection(currObject) {
    /********This code is added for diable double click event *******/
    if (freezSheetFunction(currObject.getAttribute("date").trim())) {
      toastMeaasge(
        "Information",
        `This cell are freezed From :-  ${freezFromDate}  To :- ${freezToDate} you can not apply leave for these date`,
        "info"
      );
    } else {
      clickObject = currObject;
      if (activeCell != null) {
        activeCell.contentEditable = false;
      }
      /******************************************************** */

      if (cntrlIsPressed) {
        if (currObject.classList.contains("click_select")) {
          clickObject.classList.remove("click_select");
          ctClickArr = arrayRemove(ctClickArr, currObject);
        } else {
          clickObject.classList.add("click_select");
          // console.log(clickObject.classList)
          ctClickArr.push(currObject);
        }
      } else {
        for (var i = 0; i < ctClickArr.length; i++) {
          ctClickArr[i].classList.remove("click_select");
        }

        if (!currObject.classList.contains("click_select")) {
          currObject.classList.add("click_select");
          ctClickArr.length = 0;
          ctClickArr.push(currObject);
        } else {
          currObject.classList.remove("click_select");
          ctClickArr = arrayRemove(ctClickArr, currObject);
        }
      }
    }
  }
}

function makeEditableCell(currObject) {
  // console.log("db click called");
  if (!freezSheetFunction(currObject.getAttribute("date").trim())) {
    innerVal = currObject.innerText || currObject.innerHTML;

    // console.log("child element");
    $(currObject).css("color", "black");
    currObject.contentEditable = true;
    currObject.style.backgroundColor = "";
    oldval = currObject.innerText;
    oldcomment = currObject.getAttribute("title");
    currObject.focus();
    activeCell = currObject;
  }
}

///////
/************************ONLOAD METHOD START*************** */

function toastMeaasge( message,messageType, icon) {
  try{
  Ficon = icon || messageType.toLowerCase();
}catch(e)
{
  Ficon=undefined;
}

  var code = `$.toast({`;
        if(messageType != undefined)
        {
          code += `heading: '${messageType}',
                   text: '${message}',
                   showHideTransition: 'slide',
                   icon: '${Ficon}'`
        }
        else{

         
          code +=`text: '${message}'`
        }
       
        code += `});`;

  eval(code);
}



let rightClickObject = null;
var cntrlIsPressed = false;



  $(document).ready(function(){


  

  getEmpJsonData();
  myToggle();
  // fetchApiExample();

  $(document).keydown(function (event) {
    switch (event.which) {
      case 17:
        cntrlIsPressed = true;
        console.log("CNTRL")
        break;
      case 46:
        deleteElementValue();
        break;
      case 13:
      // console.log("enter is pressed")
      //
    }
  });

  $(document).keyup(function (event) {
    cntrlIsPressed = false;
  });

  /*********************************tooltip********** */
  var tempArrayForSortable = [];

  $(function () {
    $("#tbody_1").sortable({
      placeholder: "highlight",
      update: function (event, ui) {
        var productOrder = $(this).sortable("toArray").toString();
        // console.log(productOrder);

        count=1;
        productOrder.split(",").forEach(function (ival, index) {
          employee_name = document.getElementById(`row${ival.split("_")[1]}_0`);
           
          tempArrayForSortable.push({
            id : employee_name.getAttribute("eid"),
            order : count
          });
          count++;



        });
        // $("#sortable-9").text (productOrder);
        chnageOrderRequest(tempArrayForSortable)
      console.log(JSON.stringify(emp_nm))
        emp_nm.length = 0;

      
        emp_nm = tempArrayForSortable;
        tempArrayForSortable= [];



         console.log(emp_nm);
      },
    });
  });

  $(function () {
    $.contextMenu(
      {
        selector: ".umeric",
        callback: function (key, options) {
          var m = "clicked: " + key;
          window.console && console.log(m);

          console.log(options);

          switch (key) {
            case "Edit_Comment":
              // code block

              rightClickObject = this[0];
              var offset = getOffset(this[0]);
              const { left, top, right, bottom } = offset;
              console.log(left, top, right, bottom);
              var rect = this[0].getBoundingClientRect();
              let comment = this[0].getAttribute("title").trim();
              //  console.log(`${rightClickObject.getAttribute("ename")}`)
              c_name.innerText = rightClickObject.getAttribute("ename");
              c_date.innerText = rightClickObject.getAttribute("date");
              textarea.innerText = comment;
              textarea.value = comment;
              oldComment = comment;
              //   console.log(`oldcommenr = ${options}`)

              cmtElmt.style.display = "block";
              cmtElmt.style.top = top + "px";
              cmtElmt.style.right = right + "px";
              cmtElmt.style.bottom = bottom + "px";
              cmtElmt.style.left = left + "px";

              textarea.focus();
              textarea.click();
              break;

            case "Planned_Leave":
              Applyleavebycolor("PL", this[0]);
              break;

            case "UnPlanned_Leave":
              Applyleavebycolor("UL", this[0]);
              break;

            case "Floating_Leave":
              Applyleavebycolor("FL", this[0]);
              break;

            case "Reject_Leave":
              Applyleavebycolor("NA", this[0]);
              break;

            case "Alternate_Leave":
              Applyleavebycolor("-1", this[0]);
              break;

            default:
            // code block
          }
        },
        items: {
          Planned_Leave: { name: "PL - Planned Leave", icon: "edit" },
          UnPlanned_Leave: { name: "Un - Planned Leave", icon: "edit" },
          Floating_Leave: { name: "Floating Leave", icon: "edit" },
          Alternate_Leave: { name: "Alternate Leave", icon: "edit" },
          Reject_Leave: { name: "Reject Leave", icon: "cut" },
          Edit_Comment: { name: "Edit Comment", icon: "paste" },
          sep1: "---------",
          quit: {
            name: "Quit",
            icon: function () {
              return "context-menu-icon context-menu-icon-quit";
            },
          },
        },
      }
    );
  });

});

function chnageOrderRequest(tempArrayForSortable)
{
  console.log(JSON.stringify(tempArrayForSortable));
  xhttp.open("POST", "CHNAGE_ORDER", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("emp_data=" + (JSON.stringify(tempArrayForSortable)));
  xhttp.onload = function () 
  {
    if (this.readyState == 4 && this.status == 200) {
      if (this.responseText.length != 0) {
        tempJson = JSON.parse(this.responseText)["leave_detail"];
        emp_nm = JSON.parse(this.responseText)["employee_name"];}}
  }
}

// async function fetchApiExample()
// {
  
// let response = await fetch('/test.json', {
//   headers: {  'Content-Type': 'application/json' }
// })

// let response1 = await fetch('/getvar', {
//   headers: {  'Content-Type': 'application/json' }
// })


// console.log(response.json(),response1.json());

// }

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
  };
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



  /******************************************** */
  /****    Need to chnage               ******* */ 
  /****      empnm to another           ******* */ 
  /****                                 ******* */ 
  /******************************************** */
      
  Object.keys(emp_nm).forEach(function (ovalue, oindex) {
    let empnm = tempJson[emp_nm[ovalue].id];
    // console.log({empnm,ovalue})
    //  //console.log("1 = " + JSON.stringify(empnm))
    //  //console.log("out = "+empnm != null && empnm != undefined);
    if (empnm != null && empnm != undefined) {
      employeeName = emp_nm[ovalue].name;
      //  //console.log("employee name print == " + employeeName)
// console.log({employeeName})
      //console.log("table body length = " + tbody.length + " row index = " + rowindex);
      for (var rowCount = 0; rowCount < tbody.length; rowCount++) {
        var emp_name_tr = tbody[rowCount].childNodes[b].innerText;
        //   //console.log(emp_name_tr);

        if (emp_name_tr.toUpperCase() == employeeName.toUpperCase()) {
          for (var thcount = thindex; thcount < thead.length; thcount++) {
            var thdate = thead[thcount].innerText;
            //        var leavedate = tempJson[empcount]["leave"][leave]["leavedate"];

            empleavedata = empnm[thdate];

            if (empleavedata != null && empleavedata != undefined) {
              //  console.log(empleavedata)
              let leavetype = empleavedata["leavetype"];
              let leaveComment = empleavedata["comment"];
              let approveStatus = empleavedata["approveStatus"];
              let applyTime = empleavedata["applyTime"];
              let declear = empleavedata["declear"];

              let innerCell = tbody[rowCount].childNodes[thcount];
            // console.log({ employeeName, thdate, approveStatus, declear });

              if (approveStatus == true && declear == false) {
                innerCell.setAttribute("data-color", "NOT-D");
              } else {
                if (approveStatus == false && declear == false) {
                  innerCell.setAttribute("data-color", "NOT-A");
                }

                innerCell.setAttribute("data-color", leavetype);
              }

              // back_Color(leavetype, innerCell);

              if (leaveComment.length > 0) {
                //  console.log("comment available", leaveComment);
                innerCell.classList.add("commentIMG");
              }
              innerCell.setAttribute("title", leaveComment);

              /*******************BADGE************************ */
              //    var span = document.createElement("span");
              //     span.setAttribute("class","badge badge-danger")
              //    span.innerText="*";
              /*************************************** */

              let textNode = document.createTextNode(leavetype);

              // innerCell.innerVal = leavetype;
              innerCell.appendChild(textNode);
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

function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}


function createTableRow(parent_element, name,eid, index, pool) {
  let row, text;
  let rowNum = (parent_element.childNodes.length) + 1;
  let colNum = 0;

// console.log(parent_element.childNodes.length)


  if (parent_element == undefined) {
    tab = document.getElementById("tab1");
    row = tab.insertRow(-1);
  } else {
    row = parent_element.insertRow(index);
  }
  // //console.log("index = "+ index);
  row.setAttribute("class", `tab_row_${rowNum}`);
  row.setAttribute("id", `row_${rowNum}`);

  var cell = row.insertCell();
  let checkBox = document.createElement("input");

  setAttributes(checkBox,{ "type": "checkbox", "name":"check","onclick": "selectCheckBOX(this)", "id": "main_chkbox_" + index })
  setAttributes(cell,{"class": "fixed"});
  cell.appendChild(checkBox);
  row.appendChild(cell);

  /********************************************* */

  var cell = row.insertCell();
  text = document.createTextNode(pool);
  setAttributes(cell,{"id" :`team_name`,"class" : `pool ${pool} fixed`,"ename": name,"eid" : eid });



  cell.appendChild(text);
  row.appendChild(cell);

  /************************************************** */

  cell = row.insertCell();
  text = document.createTextNode(name);

  setAttributes(cell,
    {
      "ROW_ID": rowNum,
      "COL_ID": colNum,
      "id": `row${rowNum}_${colNum}`,
      "class": "eName fixed",
      "ename": name,
      "eid" : eid
    });

  cell.appendChild(text);
  row.appendChild(cell);
//  colNum += 1;  colNum++;
 
  /************************************************** */

  Object.keys(calenderObject).forEach(function (value, index) {
    calenderObject[value].forEach(function (iValue, iIndex) {
      splittedValue = iValue.split(",");
      date = splittedValue[0];
      weekName = splittedValue[1];

      cell = row.insertCell();
      setAttributes(cell,{"date": date,"ename": name,"eid" : eid,"ROW_ID":rowNum,"COL_ID": colNum,"id": `row${rowNum}_${colNum}`, "class":
      `content ellipsis ${value} ${weekName} non_sel umeric`})
  
      /*************************************TOOLTIP ADDED ****************** */
      cell.setAttribute("data-toggle", "tooltip");
      cell.setAttribute("title", ``);
      row.appendChild(cell);
      // colNum++;
      colNum += 1;
    });
  });

  // //console.log("createTableRow() : RUNNING SUCESSFULLY ")

  return parent_element;
}
/************CREATE TABLE ROW END******************** */

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

let input1 = document.getElementById("addEmp");
let input2 = document.getElementById("addEmpTeam");
let employeeIdElement = document.getElementById("addEmpID");
//*************************ADD NEW EMPLOYEE START ********************************************* */
function closeModal()
{
  input1.value = "";
  input2.value = "";
  employeeIdElement.value="";
  console.log("called")
}

function addEmployee() 
{


  let thead = document.getElementById("tbody_1");
  let Uname = input1.value.trim();
  let UTname = input2.value.trim();
  let employeeId = employeeIdElement.value.trim();
  let newEmp = [];

  orderNO=(emp_nm.length +1);

  input1.value = "";
  input2.value = "";
  employeeIdElement.value="";
  console.log(Uname,UTname,  (employeeIdElement.value).length, employeeIdElement.value)

  if (!(Uname.length >  0 && UTname.length > 0 &&  (employeeId).length > 0)) {
   
    alert("shold not be empty");
  } 
  else
   {
    name = Uname.toUpperCase();
    Tname = UTname.toUpperCase();
   
    
    console.log(employeeNameAvailablity(employeeId))
  if (employeeNameAvailablity(employeeId) == false) {
    newEmp.push({
                            id : employeeId,
                            name : name,
                            pool: Tname,
                            disable: "0",
                            order : orderNO
 });

   
    xhttp.open("POST", "NEW_EMPLOYEE", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    //console.log("empty");
    xhttp.send("emp_data=" + (JSON.stringify(newEmp)));
    xhttp.onload = function () {


       if( this.readyState == 4 && this.status == 200)
       {

console.log(this.responseText);

switch(this.responseText)
{
  case error:  toastMeaasge("Somthing Went wrong","Error");break;
  case duplicateId: toastMeaasge("DUPLICATE_EMPLOYEE_ID Found","Error");break;
  default :   
      if (this.responseText.length != 0) 
          {
                tempJson = JSON.parse(this.responseText)["leave_detail"];
                emp_nm = JSON.parse(this.responseText)["employee_name"];
                $("#exampleModalCenter").modal("hide")
                createTableRow(thead, name,employeeId, -1, Tname);
                fixedColumn();
                applyEventLitn();
                newEmp.length= 0;
               
                toastMeaasge("New Row Added","Success",)
          }

break;
}

      
       }
       

    }

 
    
  } else {
    alert("Tow Employe can not have same ID");
  }


}}
/*


   

}






//*************************ADD NEW EMPLOYEE START ********************************************* */
function employeeNameAvailablity(eID) {
  let flag = 0;






  emp_nm.forEach(function (val, ind) {
   
console.log(val.id,eID)
    if (val.id == eID) {
      flag = 1;
    }
  });

  if (flag == 0) {
    return false;
  } else {
    return true;
  }
}
/******************************chnage****************************************/
/*****************************employee name to employee id ************ */
/********************************************************************** */
function createDataArray(
  arrey,
  employe__name,
  applyDate,
  leave_typ,
  comment,
  declear = true,
  approveStatus = true
) {
  let leave = {};
  let dateFlag = 0;
  let arrPush = 0;
  let arr = arrey;
  empnm = employe__name;

  console.log(`val of arr ${arr}`);
  //console.log("employe name " + empnm);


  arr.forEach(function (ival, iidx) {
    //Updating existing one in current array {arr} but not present in to the database
    if (ival[empnm] != undefined || ival[empnm] != null) {
      let eval = ival[empnm];

      if (eval[applyDate] != undefined) {
        let edate = eval[applyDate];
        edate["leavetype"] = leave_typ;
        edate["comment"] = comment;
        edate["approveStatus"] = approveStatus;
        edate["applyTime"] = "";
        edate["declear"] = declear;

        dateFlag = 1;
      }
    }
  });

  if (dateFlag == 0) {
    //Add data into employee if present in database 

    console.log("dataflag ==  0");

    leave[empnm] = {
      [applyDate]: {
        leavetype: leave_typ,
        comment: comment,
        approveStatus: approveStatus,
        applyTime: "",
        declear: declear,
      },
    };



    arr.forEach(function (ival, iidx) {
      if (ival[empnm] != undefined || ival[empnm] != null) {
        let eval = ival[empnm];
        eval[applyDate] = {
          leavetype: leave_typ,
          comment: comment,
          approveStatus: approveStatus,
          applyTime: "",
          declear: declear,
        };

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

  return arr;
}

/************************************************ */

//let arr = []; // for first time applyring leave
let uarr = []; // for updating existing database leave
// let narr = []; // for applying new leave
//let darr =[]; // for deteting the leave
/******************************ADD DATA TO EXISTING JSON FILE START ****************** */
function addToJson1(cell_object, oldVal, oldcomment) {
  var declear;
  var approveStatus;
  let leave_typ = "";
  switch (cell_object.innerText.trim()) {
    case "-1":
      cell_object.innerText = "-1";
      declear = false;
      approveStatus = true;
      cell_object.setAttribute("data-color", "NOT-D");
      $(cell_object).css("color", "transparent");
      break;
    case "NA":
      cell_object.innerText = "NA";
      declear = false;
      approveStatus = false;
      cell_object.setAttribute("data-color", "NOT-A");
      $(cell_object).css("color", "transparent");
      break;
    case "":
    case undefined:
      cell_object.setAttribute("data-color", "");
      break;
    case "PL":
    case "FL":
    case "UL":
      cell_object.setAttribute("data-color", cell_object.innerText.trim());
      $(cell_object).css("color", "transparent");
      break;

    default:
      $(cell_object).css("color", "black");
      return "INVALID";
  }

  console.log({ declear, approveStatus });
  let flag = 0;
  leave_typ = cell_object.innerText.trim();
  let empnm = cell_object.getAttribute("ename");
  let eid = cell_object.getAttribute("eid");
  let applyDate = cell_object.getAttribute("date");
  let comment = cell_object.getAttribute("title");

  console.log(
    !(leave_typ == "" && (oldVal == "" || oldVal == undefined)),
    !(comment == "" && (oldcomment == "" || oldcomment == undefined)),
    !(leave_typ == "" && oldVal == "") ||
      !(comment == "" && oldcomment == undefined),
    { leave_typ, comment, oldcomment, oldVal }
  );

  if (
    !(leave_typ == "" && (oldVal == "" || oldVal == undefined)) ||
    !(comment == "" && (oldcomment == "" || oldcomment == undefined))
  ) {

    let employee_name;
    let employeeID;
    emp_nm.forEach((v,i) =>
    { 

    //  console.log(v,i,emp_nm.id)
      if(v.id == eid) { 
        employee_name=v.name;
        employeeID=eid;
       
     }
     } )

   
    console.log({employee_name})
  
    


    if (employeeID != undefined && employeeID != null) {
      console.log("First time applying leave");

      uarr = createDataArray(
        uarr,
        employeeID,
        applyDate,
        leave_typ,
        comment,
        declear,
        approveStatus
      );
    } else {
      console.log("SOMETHING WENT WRONG");
    }
  } 

  if(uarr.length !=0 )
  {
    toggle_bt.checked = false;
  }
   

}

/************************SAVE ********************* */

function Save() {
  xhttp.open("POST", "UPDATE", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  //   console.log("update=" + uarr + "&" + "newemp=" + narr);
  if (uarr.length != 0) {
    console.log(uarr[0]);
    console.log(JSON.stringify(uarr));
    xhttp.send("update=" + JSON.stringify(uarr));
    xhttp.onerror = function () {
         console.log(request,this.response);
    };
    xhttp.onload = function () {
      if (this.readyState == 4 && this.status == 200) {
        switch(this.responseText)
        {
          case error:  toastMeaasge("Error", "Somthing Went wrong");break; 
          default :   
              if (this.responseText.length != 0) 
                  {
                        tempJson = JSON.parse(this.responseText)["leave_detail"];
                        emp_nm = JSON.parse(this.responseText)["employee_name"];
        
                        toastMeaasge("Data Save SucessFully","Success");
                        uarr.length = 0;
                        myToggle();

                  }
        
        break;
                }
        
    }else{
      toastMeaasge("Please refresh page or Report the issue","Error");
    }
  } 
}
}

////////////////////////////////////////////////////////////






function myFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("tbody_1");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    td1 = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      txtValue1 = td1.textContent || td1.innerText;
      if (
        txtValue.toUpperCase().indexOf(filter) > -1 ||
        txtValue1.toUpperCase().indexOf(filter) > -1
      ) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}


function Delete() {
  var tempArray = [];
  let employename;
  let node;
  let id = [];


  if (checkbox_arr.length > 0) {

    if(toggle_bt.checked){
    for (var i = 0; i < checkbox_arr.length; i++) {
      node = checkbox_arr[i];
      console.log(checkbox_arr[i]);
      let emp_node = document.getElementById(`row${node.id.split("_")[1]}_0`);
      id.push(node.id);
      //employename = emp_node.innerText;
      employeeId=emp_node.getAttribute("eid");
      tempArray.push(employeeId);
    }

    console.log(id,tempArray);

    //console.log(id)

    xhttp.open("POST", "DELETE", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

   // console.log(JSON.stringify(employename));
    xhttp.send("emp_name=" + JSON.stringify(tempArray));
    xhttp.onload = function () {
      if (this.readyState == 4 && this.status == 200) {
        for (var j in id) {
          document.getElementById(id[j]).remove();
        }
        toastMeaasge(`Deleted ${id.length} row SucessFully`,"Success");

        delObjCurr = null;
        delObjPrev = null;
        checkbox_arr = [];
        tempArray = [];
        id.length = 0;
        getRowOrder();
        
      }
    };
  } else
  {
    toastMeaasge(`Please save data before delete`,"Information", "info");
  
  }
}
else {
    toastMeaasge(`Please select row before delete`);
  
}
}

function getRowOrder()
{
  let count=1;
  let tempArrayForSortable=[];
  t_body=document.getElementById("tbody_1");
 t_body.childNodes.forEach((val,ind) => {
 let employeeId=document.getElementById(`row${val.getAttribute("id").split("_")[1]}_0`).getAttribute("eid");

  tempArrayForSortable.push({
    id : employeeId,
    order : count
  });
 
  count++;



})


chnageOrderRequest(tempArrayForSortable);


}


function myToggle() {
  

  if (Object.keys(uarr).length != 0) {
    toggle_bt.checked = false;
    Save();
   
  } else {
    
    toggle_bt.checked = true;
  }
}

function cancelComment() {
  cmtElmt.style.display = "none";
  textarea.disable;
}

function formdata() {
  cmtElmt.style.display = "none";
  newComment = textarea.value.trim();
  textarea.disable;
  console.log(`newcommenr = ${newComment}`);
  if (newComment != null && oldComment != null) {
    if (newComment == oldComment) {
      console.log("NO NEW CHNAGE");
      newComment = null;
      oldComment = null;
    } else {
      rightClickObject.setAttribute("title", newComment.trim());
      addToJson1(rightClickObject, rightClickObject.innerVal, oldComment);
      if (newComment.trim().length == 0) {
        rightClickObject.classList.remove("commentIMG");
      } else {
        rightClickObject.classList.add("commentIMG");
      }
      newComment = null;
      oldComment = null;
    }
  }
}
function Cancledata() {
  cmtElmt.style.display = "none";
  textarea.value = "";
}



let checkbox_arr = [];
function selectCheckBOX(currnetObject) {
  var parentNode = currnetObject.parentNode.parentNode;
  if (currnetObject.checked) {
    // console.log(parentNode.classList.add("poolSelect"));
    checkbox_arr.push(parentNode);
  } else {
    // console.log(parentNode.classList.remove("poolSelect"));
    checkbox_arr = arrayRemove(checkbox_arr, parentNode);
  }

  console.log(checkbox_arr);
}


function selectAllCheckBOX(currnetObject) {
      
  checkbox_arr.length=0;
  checkboxes = document.getElementsByName('check');
  
    for(var checkbox=0;checkbox<checkboxes.length;checkbox++)
    {
      checkboxes[checkbox].checked=currnetObject.checked;
      selectCheckBOX( checkboxes[checkbox]);
     
    }

}

function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele != value;
  });
}

function Applyleavebycolor(type, currentObject) {
 
  if (!cntrlIsPressed) {
    for (var i in ctClickArr) {
      ctClickArr[i].classList.remove("click_select");
    }
    ctClickArr.length = 0;
   
    ctClickArr.push(currentObject);
  }

  // let leavtype="";
  let final = "";

  for (let i = 0; i < ctClickArr.length; i++) {
    if ((type == "NA" && ctClickArr[i].innerText.length > 0) || type != "NA") {
      applydate = ctClickArr[i].getAttribute("date");
      if(!freezSheetFunction(applydate))
  {
    ename = ctClickArr[i].getAttribute("ename");
      ctClickArr[i].innerText = type;
      addToJson1(ctClickArr[i]);
      ctClickArr[i].classList.remove("click_select");
      continue;
  }
  toastMeaasge(
    "Information",
    `This cell are freezed From :-  ${freezFromDate}  To :- ${freezToDate} you can not apply leave for these date`,
    "info"
  );
  continue;
      
    }
    toastMeaasge("Please apply leave befor reject");
  }

  ctClickArr.length = 0;
}


function deleteElementValue() {
  if (ctClickArr.length > 0) {
    for (let i = 0; i < ctClickArr.length; i++) {
      applydate = ctClickArr[i].getAttribute("date");
      ename = ctClickArr[i].getAttribute("ename");
      oldVal = ctClickArr[i].innerText;
      ctClickArr[i].innerText = "";

      addToJson1(ctClickArr[i], oldVal);
    }
  }
}



 


 
      