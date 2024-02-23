require('dotenv').config();
const express = require('express');
const {DocumentStore} = require("ravendb");
const routes = require('./routes/routes');
const loginRoutes = require("./routes/login/userLogin")
const session = require('express-session')
const passport = require('passport')
const fs = require("fs");

require('./auth/auth')

const app = express();

const ravenDBAuthOptions = {
    certificate: fs.readFileSync("free.raventrade.client.certificate.with.password.pfx"),
    type: "pfx",
    password: process.env.PASSWORD
};

const store = new DocumentStore([process.env.RAVEN_DB_STRING], process.env.DATABASE, ravenDBAuthOptions);
store.conventions.findCollectionNameForObjectLiteral = entity => entity["collection"];
store.initialize();

// Middleware to attach store to each request
app.use(session({secret: process.env.SESSION_SECRET}))
app.use(express.json());
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    req.store = store
    next();
});

app.use('/api', routes)
app.use('/login', loginRoutes)

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




