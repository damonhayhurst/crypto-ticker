let express = require('express');
let fs = require('fs')
var app = express();
let port = process.env.port || 5000

bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var cors = require('cors')
app.use(
    cors({
        credentials: true,
        origin: [
            'http://localhost:8080'
        ]
    }),
)

app.post('/save', function(req) {
    const row = req.body
    fs.readFile('db.json', function (err, data) {
        var json = JSON.parse(data)
        json.push(row)
        fs.writeFile('db.json', JSON.stringify(json), function(err){
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
        })
    })
})



app.listen(port)

console.log('API started on port: ' +  port)