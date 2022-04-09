// import models from '../models';
// import { addMessage } from '../services/chatServices';
// import app from '../app'

// let flags = 0;
// const ipsconnected = [];

// export const chatSocket = (socket)=>{
//     try {
//         const connectedUser = socket.id;
//     if (!ipsconnected.hasOwnProperty(connectedUser)) {
//       ipsconnected[connectedUser] = 1;
//       flags=flags + 1;
//       io.emit('register', flags);
//     }
//     console.log('👾 New socket connected! >>', socket.id);
//     // const url = socket.handshake.headers.referer.split('?')[1];
//     socket.on('subscribe', async (data) => {

//       const findUser = await models.User.findOne({
//         where: {
//           email: data,
//         },
//         attributes: {
//           exclude: [
//             'email',
//             'password',
//             'roleId',
//             'managerId',
//             'isActive',
//             'createdAt',
//             'password',
//             'updatedAt',
//             'verified',
//           ],
//         },
//       });
//       io.to(socket.id).emit('subscribe', findUser.names);
//     });

//     socket.on('message', (data) => {
//       io.to(socket.id).emit('message', data);
//     });

//     socket.on('disconnect', () => {
//       if (ipsconnected.hasOwnProperty(connectedUser)) {
//         delete ipsconnected[connectedUser];
//         flags= flags - 1;
//         io.emit('register', flags);
//       }
//     });

//     socket.on('chat', (data) => {
//       const message = {
//         postedBy: findUser.id,
//         sender: findUser.names,
//         message: data.message,
//       };
//       const addData = addMessage(message);
//       io.emit('chat', data);
//     });

//     socket.on('typing', (data) => {
//       socket.broadcast.emit('typing', data);
//     });
//     } catch (err) {
//         console.log(err)
//     }
// }
