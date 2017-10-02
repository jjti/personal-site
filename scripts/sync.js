"use strict";

const child_process = require("child_process");
const path = require("path");
const buildDir = path.resolve("./build");

child_process.exec(
	`aws s3 sync ${buildDir} s3://www.joshuatimmons.com --delete`,
	(error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			return;
		}
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
	}
);
