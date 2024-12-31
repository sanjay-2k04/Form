const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection string
const uri = 'mongodb://localhost:27017';
const dbName = 'studentDB';

app.post('/submit_form', async (req, res) => {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('students');

        // Insert form data into MongoDB
        const formData = {
            name: req.body.name,
            rollno: req.body.rollno,
            dept: req.body.dept,
            dob: req.body.dob,
            bloodgroup: req.body.bloodgroup,
            address: req.body.address,
            phone: req.body.phone,
        };

        await collection.insertOne(formData);
        res.send('Form data saved successfully!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving form data.');
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
