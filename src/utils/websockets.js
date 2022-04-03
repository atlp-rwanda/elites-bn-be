class WebSockets {

    connection(client){
        client.on('connection', socket =>{
            socket.emit('message', ()=>{
                console.log('user connected');
            });
        })
    }
}

export default new WebSockets();