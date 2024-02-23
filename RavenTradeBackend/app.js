require('dotenv').config();
const express = require('express');
const {DocumentStore} = require("ravendb");
const routes = require('./routes/routes');
const fs = require("fs");
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();
app.use(cors());

app.use(
    fileUpload({
        limits: {
            fileSize: 10000000,
        },
        abortOnLimit: true,
    })
);

const ravenDBAuthOptions = {
    certificate: fs.readFileSync("free.raventrade.client.certificate.with.password.pfx"),
    type: "pfx",
    password: process.env.PASSWORD
};

const store = new DocumentStore([process.env.RAVEN_DB_STRING], process.env.DATABASE, ravenDBAuthOptions);
store.conventions.findCollectionNameForObjectLiteral = entity => entity["collection"];
store.initialize();

// Middleware to attach store to each request
app.use(express.json());

app.use((req, res, next) => {
    req.store = store
    next();
});

app.use('/api', routes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});
app.get("/status", (request, response) => {
    const status = {
        "Status": "Running"
    };
    response.send(status);
});


app.post('/upload', (req, res) => {
    // Get the file that was set to our field named "image"
    const images = req.files;
    console.log(images);

    // If no image submitted, exit
    if (!images.image) return res.sendStatus(400);

    // If does not have image mime type prevent from uploading
    // if (/^image/.test(images.image.mimetype)) return res.sendStatus(400);

    // Move the uploaded image to our upload folder
    images.image.mv(__dirname + '/images/' + images.image.name);

    // All good
    res.sendStatus(200);
});



