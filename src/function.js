var express = require('express');
const router =  express.Router();
const fs = require("fs");
var project="CB";
var year="2020";
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const publicDirectoryPath = path.join(__dirname, "../public");
const jsonFilePath = path.join(__dirname, `../public/database/test_${project}_${year}.json`);
const jsonLeaveColor = path.join(__dirname , "../public/database/leave_color.json");
const json_FloatLeave= path.join(__dirname , "../public/database/floating_leave.json");
const viewsPath =  path.join(__dirname, "../public/views");
var app = express();


