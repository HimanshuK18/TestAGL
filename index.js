//initiate the Node.js http API
"use strict";
const http = require("http");
//request the service for data
http.get("http://agl-developer-test.azurewebsites.net/people.json", (response) => {
    const { statusCode } = response;
    if (statusCode !== 200) {
        console.log("Request Failed.Status Code:" + statusCode);
    }
    let rawData = "";
    response.on("data", (chunk) => { rawData += chunk; });
    response.on("end", () => {
        try {
            var MaleOwner = [];
            var FemaleOwner = [];
            const parsedData = JSON.parse(rawData);
            //process the data to filter all cats and then divide on gender of owners
            for (let i = 0; i <= parsedData.length - 1; i++) {
                if (parsedData[i].pets != null) {
                    if (parsedData[i].gender === "Male" && parsedData[i].pets.find(checkCat)) {
                        MaleOwner.push(parsedData[i].pets[0].name)
                    }
                    else if (parsedData[i].gender === "Female" && parsedData[i].pets.find(checkCat)) {
                        FemaleOwner.push(parsedData[i].pets[0].name)
                    }
                }
            }
            const Cat = require("./classCat.js");
            let allCats = new Cat(MaleOwner.sort(), FemaleOwner.sort());
            console.log("Male");
            console.log(allCats.male);
            console.log("_____________________________________________________________");
            console.log("Female");
            console.log(allCats.female)
        } catch (e) {
            console.error(e.message);
        }
    });
}).on("error", (e) => {
    console.error("Error:" + e.message);
});

function checkCat(pet) {
    if (pet.type === "Cat") { return true; }
}
