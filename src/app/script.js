const fs = require("fs");

// Read the JSON file and parse the data
fs.readFile("./src/app/kjv.json", "utf8", function (err, jsonString) {
  if (err) {
    console.error(err);
  } else {
    // Parse the JSON string into an array of objects
    const data = JSON.parse(jsonString);

    // Add the id field to each object
    for (let i = 0; i < data.length; i++) {
      data[i].id = i + 1;
    }

    // Convert the modified array back into a JSON string
    const modifiedJsonString = JSON.stringify(data);

    // Write the modified JSON string to a new file
    fs.writeFile("modifiedData.json", modifiedJsonString, function (err) {
      if (err) {
        console.error(err);
      } else {
        console.log("JSON file created successfully");
      }
    });
  }
});
