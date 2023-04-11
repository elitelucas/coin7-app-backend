require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require("path");
const config = require("./config");

const { getMinedAmount, initMining, getMiningIDByUserID } = require('./job/mining')
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname + "/public")));
app.use(express.static(__dirname + "/public/css"));
app.use(express.static(__dirname + "/public/js"));



//socket 
const http = require("http").Server(app);
const io = require('socket.io')(http);
io.on('connection', function (socket) {
    console.log('A user connected');

    var user_id;
    var mining_id;
    var miningIntervalID;

    socket.on('init_mining_connection', function (data) {
        user_id = data.user_id;
        mining_id = getMiningIDByUserID(user_id);
        if (mining_id)
            miningIntervalID = setInterval(() => {
                var mined_amount = getMinedAmount(mining_id);
                io.to(socket.id).emit('mining', mined_amount);
            }, 1000)
    });

    socket.on('disconnect', function () {
        clearInterval(miningIntervalID);
        console.log('A user disconnected');
    });
});


require('./routes.js')(app);

http.listen(config.port, () => console.log("*Listening on port " + config.port));

//mining jobs
initMining();

module.exports = app;