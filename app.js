const mongoDb = require('./mongoDB.js');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))

// Starting the server on port 3002
app.listen(3002, function () {
    console.log("Listening on port 3002");
});

// Attempting database connection 
mongoDb.connectToDatabase("activity-tracker")
    // Configuring API endpoints
    .then(function (db) {
        const dataCollection = db.collection('data');
        //app.use('/', express.static(__dirname));


        app.get('/list', (req, res) => {
            db.collection('data').find().toArray()
                .then(results => {
                    console.log(results);
                    res.render('index.ejs', {activity : results})
                })
                .catch(error => console.error(error))
        });

        app.post('/log', (req, res) => {
            dataCollection.insertOne(req.body)
                .then(() => {
                    console.log("Activity Uploaded: ", req.body);
                    res.redirect("/list");
                })
        });

    });
