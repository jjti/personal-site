"use strict";

const child_process = require("child_process");
const path = require("path");
const buildDir = path.resolve("./public");

console.log(buildDir);

child_process.exec(
	`aws s3 sync ${buildDir} s3://www.joshuatimmons.com --delete`,
	(error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			return;
		}
		console.log(`stdout: ${stdout}`);
		if (stdout) {
			const regex = /s3.*---(.*)/;
			let paths = "";
			stdout.split("\n").forEach(l => {
				const match = regex.exec(l);
				if (match && match[1]) {
					paths += ` /${match[1]}`;
				}
			});

			console.log(stdout);
			console.log(paths);

			if (paths) {
				child_process.exec(
					`aws cloudfront create-invalidation --distribution-id E1MRNWEDPJJGK --paths${paths}`,
					(errorcf, stdoutcf, stderrcf) => {
						console.log(`error-cf: ${error}`);
						console.log(`stdout-cf: ${stdoutcf}`);
						console.log(`stderr-cf: ${stderrcf}`);
					}
				);
			}
		}
		console.log(`stderr: ${stderr}`);
	}
);
