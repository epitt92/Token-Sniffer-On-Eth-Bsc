const express = require('express')
const app = express()
const bodyParser = require('body-parser');

// Allows for cross origin requests from our React Client
const cors = require('cors')
const monitorTokens = require('./services/monitorTokens')
const monitorStatus = require('./services/monitorStatus')

app.use(cors({ origin: "*" }));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Connects to our MLAB Database
const mongoose = require('mongoose')
const database = require('./db')

// Accessing the path module
const path = require("path");

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => console.log('App listening on port 5000!'))
const io = require('socket.io')(server, {
    cors: {
      origin: "*",
    }
  })

// Routes with models passed through
app.get('/', (req, res) => {
    res.status(200).send("Sortal Dashboard")
})

//TODO: Code clean up
// const tokensRoutes = require('./routes/tokensRoutes')

// /tokens will not be exposed by the server
// app.use('/tokens', tokensRoutes)

// Connect to database
mongoose.connect(database, (err) => {
    if (err) {
        console.log('Error connecting to database', err)
    } else {
        console.log('Connected to database! ' + database)
        monitorTokens(io);
        monitorStatus();
    }
})
