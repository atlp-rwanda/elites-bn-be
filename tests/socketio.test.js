import socketio from 'socket.io';
import http from 'http';
import app from '../src/app';
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import path from 'path';
import { assert } from "chai";
import { io as Client } from "socket.io-client";

chai.use(chaiHttp);
describe("CHAT TESTS", () => {
    let  io, clientSocket, serverSocket;
    const server = http.createServer(app);
     io = socketio(server, {
      path: '/socket.io',
    });  
  
    
     
      server.listen(() => {
        const port = process.env.PORT || 3000;
        clientSocket = new Client(`http://localhost:${port}`);
        io.on("connection", (socket) => {
          serverSocket = socket;
          
          serverSocket.emit("message", "world");
        });
        clientSocket.on("connect", 'user connected');
      });
   
  
    it("should work", (done) => {
      clientSocket.on("message", (arg) => {
        assert.equal(arg, "world");      
      });
      done();
    });
  });