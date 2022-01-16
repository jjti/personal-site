"use strict";

const child_process = require("child_process");
const path = require("path");
const buildDir = path.resolve("./public");

child_process.exec(
  `aws s3 sync ${buildDir} s3://www.joshuatimmons.com --acl public-read --sse --delete --cache-control max-age=3600,public --profile personal`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    } else if (stdout) {
      console.log(`stdout: ${stdout}`);
      child_process.exec(
        `aws cloudfront create-invalidation --distribution-id EVQ9J3VI2WX9A --paths "/*" --profile personal`,
        (errorcf, stdoutcf, stderrcf) => {
          console.log(`error-cf: ${errorcf}`);
          console.log(`stdout-cf: ${stdoutcf}`);
          console.log(`stderr-cf: ${stderrcf}`);
        }
      );
    } else {
      console.log(`stderr: ${stderr}`);
    }
  }
);
