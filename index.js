
let express = require('express')
const socket = require('socket.io')

let app = express();
let port = process.env.PORT || 9000
let server = app.listen(port, () => {
    console.log('chap listening for request ')
})

// static files
app.use (express.static('Public'))

// setup socket 
let io = socket(server);

io.on('connection', (socket) => {
    console.log('socket connection made')

    socket.on('chat', (data) => {
        io.sockets.emit('chat', data)
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data)
    })
})