import * as fs from "fs";
import { randomElement } from "../helpers/helpers.js";

fs.readdir("./answer/all/", (err, files) => {
  if (!files) {
      console.error("Could not read './answer/all directory");
  };
  fs.copyFile(`./answer/all/${randomElement(files)}`, "./answer/today.json", () => {
    if(err) {
      console.error("Copying file to today.json failed" + err);
    }
    console.log("File successfully copied from /all to today.json");
  });
});