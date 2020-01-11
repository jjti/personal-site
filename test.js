const axios = require(`axios`);
const process = require("process");
require("dotenv").config();

console.log(process.env.GR_ID);

const req = async () => {
  try {
    const resp = await axios({
      url: "https://www.goodreads.com/review/list",
      responseType: "document",
      params: {
        id: process.env.GR_ID,
        shelf: "read",
        v: `2`,
        key: process.env.GR_KEY,
        per_page: 200
      }
    });

    console.log(resp.data);
  } catch (err) {
    console.log(err);
  }
};

req();
