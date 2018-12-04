const express = require('express');
const app = express();
const shortid = require('shortid');

// start of the our poverty DB 
// fs is file system that allows for api interacting with files

// converts to useable JS using JSON formatting
const fs = require('fs');
// converts the stored string from the string type data to 
function readData() {
    const data = fs.readFileSync('./data/grapplers.json', 'utf8');
    return JSON.parse(data);
}
//converts into JSON format to be saved aka one string for storage

function saveData(grapplers) {
    const json = JSON.stringify(grapplers, true, 2);
    json.writeFileSyn('./data/grapplers.json', json);
}

// end of DB stuff

// the function that gets used to parse and convert the body or letter from JSON requests
app.use(express.json());

// start defining the REQUEST and RESPONSE methods
// get all the data and convert it into useable JS text aka from JSON to normal stuff

app.get('./api/grapplers', (req, res) => {
    const grapplers = readData();
    //query used to search data in postman or in future labs IE a keyword
    // dont really need this yet 
    if(req.query.name) {
        const match = req.query.name.toLowerCase();
        const filtered = grapplers.filter(g => {
            return g.name.toLowerCase().startsWith(match);
        });
        res.json(filtered);
    }
    else {
        res.json(grapplers);
    }
});

// app with post method says hey
// go to the directed file and get all the data currently there 
// grappler.reqbody is an object with the property body which contains the actual
// valuable content we are interested in 
app.post('./api/students', (req, res) => {
    const grapplers = readData();
    const grappler = req.body;

    console.log(req.body);
    

    // give the newly added object the id generated by shortid
    grappler.id = shortid.generate();
    // push new object into the array for storage
    grapplers.push(grappler);
    //save data
    saveData(grapplers);

    res.json(grappler);
});
// end of defining methods and saving/ pushing of data

// set place for port to be used 

const PORT = 3000;

app.listen(PORT, () => {
    console.log('server app started on PORT', PORT);
});
