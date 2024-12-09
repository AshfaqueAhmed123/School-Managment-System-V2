const { log } = require('console');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require("socket.io")(server);
const {v4: uuidV4} = require("uuid")

require("dotenv").config();

const PORT = process.env.PORT
const meetingId = process.env.MEETING_ID

app.set('view engine','ejs');
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.redirect(`/${meetingId}`)
})

app.get('/:room',(req,res)=>{
    res.render('room',{roomId:req.params.room})
})

io.on('connection',socket => {
    socket.on('join-room',(roomId,userId) => {
        socket.join(roomId);
        // socket.emit('user-connected',userId)
        socket.to(roomId).emit('user-connected', userId);

        socket.on("disconnect", ()=>{
            socket.to(roomId).emit('user-disconnected', userId);
        })
    })
})

server.listen(PORT,()=>{
    console.log(`server is running at PORT ${PORT} ...`);
})