// make connection
let socket = io.connect('http://localhost:9000')

let output = document.querySelector('.output')
let handler = document.querySelector('#handler')
let message = document.querySelector('#message')
let send = document.querySelector('#send')
let typing = document.querySelector('.typing')

send.addEventListener("click", () => {
    
    socket.emit('chat', {
        handle: handler.value,
        message: message.value
    })
    message.value = ""
})

socket.on('chat', (data) => {
    typing.innerHTML = ""
    output.innerHTML += `<p><b>${data.handle}:</b> ${data.message}</p>`
})

message.addEventListener('keypress', () => {
    socket.emit('typing', handler.value)
})

socket.on('typing', (data) => {
    typing.innerHTML = `<p><b>${data}</b> is typing...</p>`
})