  // let selectEnabled = 0;
// let month_name = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// let day_name = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let year;
let logfile = [];
let isAvailable = 0;
let select = null;
let date1 = null;
let emp_data = [];
let emp_nm = [];
// let leavetype_name = ["PL", "UL", "ALT"];
let tempJson = [];
let selectedObject = null; //use for leave rejection
let datestorage = [];
let showAllEnabled = 1;
let xhttp = new XMLHttpRequest();
let cmtElmt = document.getElementById("cmtID");
let textarea = document.getElementById("lastname");
let c_name = document.getElementById("c_name");
let c_date = document.getElementById("c_date");
let oldComment = null;
let newComment = null;
/************TOOL-----TIP*********** */

let main_table;
let csvText = "";
let tableBody;

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
// var d = new Date();
// d.setDate(d.getDate() -1);
let freezFromDate; //=dateFormatter(year,month_name[d.getMonth()+1],d.getDay());

function freezSheetFunction(freezDateCheck) {
  // let freezSheetFunctionToggle;
  var d1 = freezFromDate.split("-");
  var d2 = freezToDate.split("-");
  var c = freezDateCheck.split("-");

  //console.log(d1[2],parseInt(month_name.indexOf(d1[1])), d1[0]);// year , month, date
  var from = new Date(d1[2], parseInt(month_name.indexOf(d1[1])), d1[0]); // -1 because months are from 0 to 11
  var to = new Date(d2[2], parseInt(month_name.indexOf(d2[1])), d2[0]);
  var check = new Date(c[2], parseInt(month_name.indexOf(c[1])), c[0]);

  console.log(
    check >= from && check <= to,
    freezDateCheck,
    freezToDate,
    freezFromDate
  );
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
      //console.log(dateWithDashFormate)
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

/*************************VARIABLE DECLEARIATION END********************** */

let dataSaved = document.getElementById("isChanged");

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
  checkBox.setAttribute("type", "checkbox");
  checkBox.setAttribute("id", `all_checkbox`);
  head.setAttribute("id", `checkbox_head`);

  head.setAttribute("class", `fixed`);
  head.setAttribute("onclick", "selectAllCheckBOX(this)");
  divspan = createDivSpan(checkBox);
  head.appendChild(divspan);
  row.appendChild(head);
  // row.setAttribute("class", ` Team_Name`)

  /*******************************COLUMN-2  ********** */

  head = document.createElement("th");
  text = document.createTextNode("Team");
  head.setAttribute("id", `team_name`);
  head.setAttribute("class", ` fixed pool`);
  head.setAttribute("onclick", `sortTable(1)`);
  head.appendChild(text);
  row.appendChild(head);
  // row.setAttribute("class", ` Team_Name`)

  /*******************************COLUMN-3  ********** */
  head = document.createElement("th");
  text = document.createTextNode("Employee");
  head.append(text);
  head.setAttribute("id", `row0_0`);
  head.setAttribute("class", `fixed ename`);
  head.setAttribute("ROW_ID", rownum);
  head.setAttribute("COL_ID", colnum);
  // divspan=createDivSpan(text);
  head.appendChild(text);
  row.appendChild(head);
  row.setAttribute("class", `tab_row_0 Emp_Name`);
  row.setAttribute("id", "header_row");

  /*******************************All remaining COLUMN********** */

  let row_nm = 0;
  colnum += 1;
  let day_nm_class;

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

      //    }

      // datestorage[month_name[i]] = date;
      // date = [];

      //  }
    });

    //  datestorage[month_name[i]] = date;
    //  date = [];
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

    table.appendChild(createTableRow(tbody, employeeName[i], i, pool));
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
      if (this.responseText != "") {
        tempJson = JSON.parse(this.responseText)["leave_detail"];
        emp_nm = JSON.parse(this.responseText)["employee_name"];

        //console.log(tempJson)
        //console.log(emp_nm)
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
        // xhttp.setRequestHeader("Content-length",`data=2020&project=NPD`.length);
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
            createSelectEmp(); //select list
            createInitRow(); // used to create the header row
            //  applyEventLitn();
          }
        };
      }
    } else if (this.readyState == 4 && this.status == 404) {
      tempJson = [];
      emp_nm = [];
      createCalenderArray();
      createSelectEmp(); //select list
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
            // this.preventDefault();
            // console.log(this);
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
    $(currObject).css("text-indent", "0px");
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

function toastMeaasge(messageType, message, icon) {
  Ficon = icon || messageType.toLowerCase();

  var code = `$.toast({
        heading: '${messageType}',
        text: '${message}',
        showHideTransition: 'slide',
        icon: '${Ficon}'
    })`;
  eval(code);
}

let rightClickObject = null;
var cntrlIsPressed = false;

window.onload = () => {



  const data = { username: 'example' };

  getEmpJsonData();
  myToggle();
  fetchApiExample();

  $(document).keydown(function (event) {
    switch (event.which) {
      case 17:
        cntrlIsPressed = true;
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

        productOrder.split(",").forEach(function (ival, index) {
          employee_name = document.getElementById(`row${ival.split("_")[1]}_0`)
            .innerText;
          // console.log(employee_name)
          tempArrayForSortable[employee_name] = emp_nm[employee_name];
        });
        // $("#sortable-9").text (productOrder);
        emp_nm.length = 0;
        emp_nm = tempArrayForSortable;
        tempArrayForSortable.length = 0;
        // console.log(emp_nm);
      },
    });
  });

  // $("#tbody_1").sortable({
  //     placeholder: "highlight",
  //     start: function (event, ui) {
  //         ui.item.toggleClass("highlight");
  //         console.log("start");
  //     },
  //     stop: function (event, ui) {
  //         ui.item.toggleClass("highlight");
  //         this.childNodes.forEach( function(val ,index)
  //         {
  //             employee_name=document.getElementById(`row${val.getAttribute("class").split("_")[2]}_0`).innerText;
  //             //console.log(emp_nm)
  //             tempArrayForSortable[employee_name] =emp_nm[employee_name] ;
  //         })

  //     }
  // });

  /********************************* */

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
          delete: { name: "Delete", icon: "delete" },
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

};


async function fetchApiExample()
{
  
let response = await fetch('/test.json', {
  headers: {  'Content-Type': 'application/json' }
})

let response1 = await fetch('/getvar', {
  headers: {  'Content-Type': 'application/json' }
})


console.log(response.json(),response1.json());

}

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


function createTableRow(parent_element, name, index, pool) {
  let num = 0;
  let row, text;
  let rownum = index + 1;
  let colnum = 0;

  if (parent_element == undefined) {
    tab = document.getElementById("tab1");
    row = tab.insertRow(-1);
  } else {
    row = parent_element.insertRow(index);
  }
  // //console.log("index = "+ index);
  row.setAttribute("class", `tab_row_${index + 1}`);
  row.setAttribute("id", `row_${index + 1}`);

  var cell = row.insertCell();
  let checkBox = document.createElement("input");
  setAttributes(checkBox,{ "type": "checkbox", "onclick": "selectCheckBOX(this)", "id": "main_chkbox_" + index })
  setAttributes(cell,{"class": "fixed"});
  cell.appendChild(checkBox);
  row.appendChild(cell);

  /********************************************* */

  var cell = row.insertCell();
  text = document.createTextNode(pool);
  cell.setAttribute("id", `team_name`);
  cell.setAttribute("class", `pool ${pool} fixed`);
  cell.appendChild(text);
  row.appendChild(cell);

  /************************************************** */

  cell = row.insertCell();
  text = document.createTextNode(name);

  cell.setAttribute("ROW_ID", rownum);
  cell.setAttribute("COL_ID", colnum);
  cell.setAttribute("id", `row${index + 1}_${num}`);
  cell.setAttribute("class", "eName fixed");

  cell.appendChild(text);
  row.appendChild(cell);
  num++;
  colnum += 1;
  /************************************************** */

  Object.keys(calenderObject).forEach(function (value, index) {
    calenderObject[value].forEach(function (iValue, iIndex) {
      splittedValue = iValue.split(",");
      date = splittedValue[0];
      weekName = splittedValue[1];

      cell = row.insertCell();

      cell.setAttribute("ROW_ID", rownum);
      cell.setAttribute("COL_ID", colnum);
      cell.setAttribute("id", `row${index + 1}_${num}`);

      // cell.setAttribute("tabindex", "0");
      // cell.appendChild(div1);
      cell.setAttribute("date", date);
      cell.setAttribute("ename", name);

      cell.setAttribute(
        "class",
        `content ellipsis ${value} ${weekName} non_sel umeric`
      );
      /*************************************TOOLTIP ADDED ****************** */
      cell.setAttribute("data-toggle", "tooltip");
      cell.setAttribute("title", ``);
      row.appendChild(cell);
      num++;
      colnum += 1;
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
    name = Uname.toUpperCase();
    Tname = UTname.toUpperCase();
  }
  if (employeeNameAvailablity(name) == false) {
    newEmp[name] = {
      pool: Tname,
      disable: "0",
    };
    //console.log(newEmp);
    // emp_nm.push(titleCase(name));
    input1.value = "";
    input2.value = "";

   
    xhttp.open("POST", "NEW_EMPLOYEE", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    //console.log("empty");
    xhttp.send("emp_data=" + (JSON.stringify(newEmp)));
    xhttp.onload = function () {


       if( this.readyState == 4 && this.status == 200)
       {
        createTableRow(thead, name, -1, Tname);
        fixedColumn();
        applyEventLitn();
        newEmp.length= 0;
        toastMeaasge("Success", "New Row Added");
       }
       

    }

 
    
  } else {
    alert("Employ is prsent");
  }
}
/*


   

}






//*************************ADD NEW EMPLOYEE START ********************************************* */
function employeeNameAvailablity(name) {
  let flag = 0;
  Object.keys(emp_nm).forEach(function (val, ind) {
    // //console.log(`${val.toUpperCase() == name.toUpperCase()} and val ${val} and name ${name}`)

    if (val.toUpperCase() == name.toUpperCase()) {
      flag = 1;
    }
  });

  if (flag == 0) {
    return false;
  } else {
    return true;
  }
}
/**********************************************************************/
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
    //Updating existing one but not present in database
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
    //Add data into employee if prsent

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

    // console.log(leave);
    // console.log(JSON.stringify(leave))

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

  // //console.log(arr);
  // console.log("leave pushed sucessfully",arr)
  // console.log(`formatted arr ${JSON.stringify(leave)}`);

  return arr;
}

/************************************************ */

//let arr = []; // for first time applyring leave
let uarr = []; // for updating existing database leave
let narr = []; // for applying new leave
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
      $(cell_object).css("text-indent", "-9999px");
      break;
    case "NA":
      cell_object.innerText = "NA";
      declear = false;
      approveStatus = false;
      cell_object.setAttribute("data-color", "NOT-A");
      $(cell_object).css("text-indent", "-9999px");
      break;
    case "":
    case undefined:
      cell_object.setAttribute("data-color", "");
      break;
    case "PL":
    case "FL":
    case "UL":
      cell_object.setAttribute("data-color", cell_object.innerText.trim());
      $(cell_object).css("text-indent", "-9999px");
      break;

    default:
      $(cell_object).css("text-indent", "0px");
      return "INVALID";
  }

  console.log({ declear, approveStatus });
  let flag = 0;
  leave_typ = cell_object.innerText.trim();
  let empnm = cell_object.getAttribute("ename");
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
    let employee_name = tempJson[empnm];

    if (employee_name != undefined && employee_name != null) {
      console.log("First time applying leave");

      uarr = createDataArray(
        uarr,
        empnm,
        applyDate,
        leave_typ,
        comment,
        declear,
        approveStatus
      );
    } else {
      narr = createDataArray(
        narr,
        empnm,
        applyDate,
        leave_typ,
        comment,
        declear,
        approveStatus
      );
    }
  } 

  if(uarr.length !=0 || narr.length !=0)
  {
    toggle_bt.checked = false;
  }
   

}

/************************SAVE ********************* */

function Save() {
  xhttp.open("POST", "UPDATE", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  //   console.log("update=" + uarr + "&" + "newemp=" + narr);
  if (!(uarr.length == 0 && narr.length == 0)) {
    console.log(uarr[0]);
    console.log(JSON.stringify(uarr));
    xhttp.send(
      "update=" + JSON.stringify(uarr) + "&" + "newemp=" + JSON.stringify(narr)
    );
    xhttp.onerror = function () {
      // console.log(request.responseText);
    };
    xhttp.onload = function () {
      if (this.readyState == 4 && this.status == 200) {
        if (this.responseText == "true") {
          // console.log("sucessfill")
          toastMeaasge("Success", "Data Save SucessFully");
          uarr.length = 0;
          narr.length = 0;
          myToggle();
        }
      } else {
        toastMeaasge("Error", "Please refresh page and apply agin or Report the issue");
      }
    };
  } else {
    //console.log("NO NEW UDATE");
  }
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
        finalmove(a, b);
        break;
      case 38: //Up arrow key
        a--;
        finalmove(a, b);
        break;
      case 39: //right arrow key
        b++;
        finalmove(a, b);
        break;
      case 40: //down arrow key
        a++;
        finalmove(a, b);
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

document.onkeydown = function (t) {
  if (t.which == 9) {
    return false;
  }
};

function Delete() {
  var tempArray = [];
  let employename;
  let node;
  let id = [];
  if (checkbox_arr.length > 0) {
    for (var i = 0; i < checkbox_arr.length; i++) {
      node = checkbox_arr[i];
      let emp_node = document.getElementById(`row${node.id.split("_")[1]}_0`);
      id.push(node.id);
      employename = emp_node.innerText;
      console.log(employename);
      tempArray.push(employename);
    }

    console.log(tempArray);

    //console.log(id)

    xhttp.open("POST", "DELETE", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    console.log(JSON.stringify(employename));
    xhttp.send("emp_name=" + JSON.stringify(tempArray));
    xhttp.onload = function () {
      if (this.readyState == 4 && this.status == 200) {
        for (var j in id) {
          document.getElementById(id[j]).remove();
        }
        toastMeaasge("Success", `Deleted ${id.length} row SucessFully`);

        delObjCurr = null;
        delObjPrev = null;
        checkbox_arr = [];
        tempArray = [];
        id.length = 0;
      }
    };
  } else {
    toastMeaasge("Information", `Please select row before delete`, "info");
  }
}

toggle_bt = document.getElementById("toggle_bt");
function myToggle() {
  

  if (Object.keys(narr).length != 0 || Object.keys(uarr).length != 0) {
    toggle_bt.checked = false;
    Save();
   
  } else {
    
    toggle_bt.checked = true;
  }
}

/************************************************** */
function createFloatingTab() {
  let xhttp = new XMLHttpRequest();

  xhttp.open("GET", "/FLOATING_FILE", true);
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
        });

        // floatingTable();
      } else {
        floating_leave = {};
        floatingTable();
      }
    }
  };
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

function changeOrder(a, b) {}

let checkbox_arr = [];
function selectCheckBOX(currnetObject) {
  var parentNode = currnetObject.parentNode.parentNode;
  if (currnetObject.checked) {
    console.log(parentNode.classList.add("poolSelect"));
    checkbox_arr.push(parentNode);
  } else {
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
      ename = ctClickArr[i].getAttribute("ename");
      ctClickArr[i].innerText = type;
      addToJson1(ctClickArr[i]);
      continue;
    }
    console.log("Please apply leave befor reject");
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

var asc = 0;
function sort_table(table, col) {
  $(".sortorder").remove();
  if (asc == 2) {
    asc = -1;
  } else {
    asc = 2;
  }
  var rows = table.tBodies[0].rows;
  var rlen = rows.length - 1;
  var arr = new Array();
  var i, j, cells, clen;
  // fill the array with values from the table
  for (i = 0; i < rlen; i++) {
    cells = rows[i].cells;
    clen = cells.length;
    arr[i] = new Array();
    for (j = 0; j < clen; j++) {
      arr[i][j] = cells[j].innerHTML;
    }
  }
  // sort the array by the specified column number (col) and order (asc)
  arr.sort(function (a, b) {
    console.log("val of a b = " + a, b);
    var retval = 0;
    var col1 = a[col]
      .toLowerCase()
      .replace(",", "")
      .replace("$", "")
      .replace(" usd", "");
    var col2 = b[col]
      .toLowerCase()
      .replace(",", "")
      .replace("$", "")
      .replace(" usd", "");
    console.log("val of col = " + col1, col2);
    var fA = parseFloat(col1);
    var fB = parseFloat(col2);
    if (col1 != col2) {
      if (fA == col1 && fB == col2) {
        retval = fA > fB ? asc : -1 * asc;
      } //numerical
      else {
        retval = col1 > col2 ? asc : -1 * asc;
      }
    }
    return retval;
  });
  for (var rowidx = 0; rowidx < rlen; rowidx++) {
    for (var colidx = 0; colidx < arr[rowidx].length; colidx++) {
      table.tBodies[0].rows[rowidx].cells[colidx].innerHTML =
        arr[rowidx][colidx];
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
// function createSCV() {

//     main_table = document.getElementById("header_row").children;
//     tableBody = document.getElementById("tbody_1").children;
//     for (i in main_table) {
//         if (main_table[i].innerText != undefined) {
//             csvText = csvText + "," + main_table[i].innerText;
//         }
//         else {
//             //   //console.log(main_table[i]);
//         }
//     }
//     csvText = csvText + "\n";

//     for (var i = 0; i < tableBody.length; i++) {
//         var tabelRow = tableBody[i].childNodes;
//         for (j in tabelRow) {
//             if (tabelRow[j].innerText != undefined) {
//                 csvText = csvText + "," + tabelRow[j].innerText;
//             }
//         }

//         csvText = csvText + "\n";

//     }
//     //console.log(csvText)
//     csvText = "";

// }
// function floatingTable() {
//     letflBody = document.getElementById("FL_TBODY");
//     let child = (letflBody.childNodes);
//     for (var i = 0; i < child.length; i++) {
//         let trChild = (child[i].childNodes);
//        trChild.forEach((value, index) => { DoubleClickLitner(value); FocusOutListner(value) });

//     }
// }
// function DoubleClickLitner(element) {
//     element.addEventListener("dblclick", function () {

//         element.contentEditable = true;
//         element.focus();
//         console.log(element);

//     });
// }
// function FocusOutListner(element) {
//     element.addEventListener('focusout', function (e) {
//         element.contentEditable = false;

//     }
//     );
// }

/******************************ADD DATA TO EXISTING JSON FILE START ****************** */
// function mySelection() {
//     var checkBox = document.getElementById("myCheck");
//     if (checkBox.checked == true) {
//         selectEnabled = 1;
//     } else {
//         selectEnabled = 0;
//     }
// }

/******************************CRETE SELECET START**************** */
//function for create div with selector
//a is leave type b is inner value
// function createSelForDiv(a, b) {

//     if (a == "") {

//         let select = document.createElement('input');
//         select.setAttribute("type", "text");
//         select.setAttribute("value", b);
//         select.setAttribute("tabindex", "-1");
//         // select.onchange();
//         // select.setAttribute("onchange", "onChangeInput(this)");
//         // <input type="text" value="" tabindex="-1" style="width: 100px; height: 40px;"></input>

//         return select;

//     } else {

//         let select = document.createElement('input');
//         select.setAttribute("type", "text");
//         select.setAttribute("value", "FL");
//         select.setAttribute("tabindex", "-1");
//         // select.setAttribute("onchange", "onChangeInput(this)");
//         return select;
//     }

// }
//chk height width fun
/****************************CRETE SELECET END************************************************* */
/******************************step:1 INTITIAL_PHASE_START***************************************************/

/*******************************INTITIAL_PHASE_END**************************************************/
//////select emp list /////////

// function createSelectEmp() {
//     select = document.getElementById("emp_nm");
//     select.innerHTML = '<option value="0" >select emp</option>'
//     Object.keys(emp_nm).forEach(function (value, index) {
//         let createOption = document.createElement("option");
//         let textNode = document.createTextNode(value);
//         createOption.setAttribute("value", 1 + index);
//         createOption.appendChild(textNode);
//         select.appendChild(createOption);

//     });
// }
//***********************************APPEND ZERO END********************************************************* */

/**************************************APPLY LEAVE START******************************************************* */
// function applyLeaveByDateRange() {

//     let start = document.getElementById("startdatepicker");
//     let end = document.getElementById("enddatepicker");
//     var i = 0;
//     var e = document.getElementById("emp_nm");

//     var strUser = e.options[select.value].innerText;

//     if (start.value == "" || end.value == "" || select.value == 0) {
//             alert("column should not be empty");
//     } else {

//         /////
//         var date1 = new Date(start.value);
//         var date2 = new Date(end.value);

//         // To calculate the time difference of two dates
//         var Difference_In_Time = date2.getTime() - date1.getTime();

//         // To calculate the no. of days between two dates
//         var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

//         // //console.log(Difference_In_Days);
//         /////
//         if (Difference_In_Days > -1) {

//             let sdate = createDate(start.value.split("-"));
//             let edate = createDate(end.value.split("-"));
//             let headerRow = document.getElementById("header_row").children;
//             alert(` name :- ${strUser} \n start date : ${sdate} \n End date : ${edate}`);
//             var tomorrow = new Date(sdate);
//             let tbody_1 = document.getElementById("tbody_1").children;
//             let rowNO;
//             let colNO;

//             for (let i = 0; i < tbody_1.length; i++) {

//                 let name = tbody_1[i].childNodes[1].innerText;
//                 //console.log(name);
//                 if (name == strUser) {
//                     rowNO = i + 1;
//                     break;
//                 }

//             }

//             for (let i = 0; i <= headerRow.length; i++) {
//                 if (headerRow[i].innerText == sdate) {

//                     colNO = (headerRow[i].id).split("_")[1]

//                     break;
//                 }

//             }

//             while (true) {
//                 //console.log(`row${rowNO}_${colNO}`)
//                 startElement = document.getElementById(`row${rowNO}_${colNO}`);
//                 date1 = tomorrow.getFullYear() + "/" + appendZero((tomorrow.getMonth()) + 1) + "/" + appendZero(tomorrow.getDate());

//                 let satSun = (tomorrow.toString().slice(0, 3)).toUpperCase();

//                 if (satSun != "SAT" && satSun != "SUN") {
//                     //console.log(satSun != "SAT" && satSun != "SUN")
//                     ////////////////////////////////////////////////////////
//                     //    //console.log("HEADER ROW + "+headerRow.length);

//                     if (startElement.innerText == "") {
//                         //console.log(startElement);
//                         startElement.innerText = "PL";
//                         back_Color("PL", startElement);
//                         createDataArray(narr, strUser, date1, "PL", "");

//                     }
//                     else { alert("updating existing ") }
//                     ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                     // //console.log("outside")
//                     if (edate == date1) {
//                         // //console.log("beark ")
//                         break;
//                     }

//                 }
//                 else {
//                     if (edate == date1) {
//                         //console.log("beark ")
//                         break;
//                     }

//                 }
//                 tomorrow.setDate(tomorrow.getDate() + 1);
//                 colNO++;

//             }
//             start.value = "";
//             end.value = "";
//             select.value = 0;

//         }
//         else {
//             alert("date should not be negative");
//             start.value = "";
//             end.value = "";
//             select.value = 0;
//         }

//         if (Object.keys(narr).length != 0) {

//             //console.log("change save button color or toggle button");
//             myToggle(1);

//         }

//     }

//     //addJson1();

// }
// /****************************************APPLY LEAVE END********************************************************* */

/******************BACKGROUNG COLOR START ******************** */
// function back_Color(clr, clrobj) {

//     switch (clr.toUpperCase()) {

//         case "FL":

//             clrobj.style.backgroundColor = document.getElementById("FL_C").style.backgroundColor;
//             clrobj.style.backgroundColor = "!important";
//             break;

//         case "PL":
//             clrobj.style.backgroundColor = document.getElementById("PL_C").style.backgroundColor;

//             break;
//             case "UL" :   clrobj.style.backgroundColor = document.getElementById("UL_C").style.backgroundColor;
//             break;
// case "PL(R)" :
//     case "FL(R)" :  clrobj.style.backgroundColor = document.getElementById("REJ_C").style.backgroundColor;

//     break;
//     case "PL(ALT)" :
//     case "FL(ALT)" :  clrobj.style.backgroundColor = document.getElementById("ALT_C").style.backgroundColor;
//     break;

//         default:
//             clrobj.style.backgroundColor = "";
//     }
// }

/************************************BACKGROUND COLOR END**************************************************** */

