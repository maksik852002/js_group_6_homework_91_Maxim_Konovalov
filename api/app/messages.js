const express = require("express");

const Message = require("../models/Message");
const User = require("../models/User");

const router = express.Router();

const connections = {};
const users = [];

const checkConnectedUsers = () => {
  try {
    Object.keys(connections).forEach(connId =>  {
      const connection = connections[connId];
      connection.send(JSON.stringify({
        type: 'CONNECTED_USERS',
        users
      }));
    });
   
  } catch (error) {
    console.log(error)
  }
};

const closeConnection = (user) => {
  delete connections[user._id];
  const index = users.findIndex(el => el === user.username);
  if (index !== -1){
    users.splice(index, 1)
  }
  console.log(users)
  console.log('total clients connected: ' + Object.keys(connections).length);
};

router.ws('/', async function (ws, req) {
  const authError = JSON.stringify({
    type: 'AUTHENTICATION_ERROR',
    error: 'User must be logged in'
  });
  const token = req.query.Token
  if (!token) {
    ws.send(authError);
    return ws.close()
  }
  const user = await User.findOne({token})
  if (!user) {
    ws.send(authError);
    return ws.close()
  }

  users.push(user.username)
  connections[user._id] = ws;

  console.log(users);
  console.log('total clients connected: ' + Object.keys(connections).length);

  checkConnectedUsers();

  try {
    const messages = await Message.find().populate('user');

    ws.send(JSON.stringify({
      type: 'LAST_MESSAGES',
      messages: messages.slice(-30)
    }));
  } catch (error) {
    console.log(error)
  }

  ws.on('message', async (msg) => {
    const parsed = JSON.parse(msg);
    switch (parsed.type) {
      case 'CREATE_MESSAGE':
        try {
          const message = new Message({
            user: user._id,
            message: parsed.message
          });
          await message.save();
          message.user = user
          Object.keys(connections).forEach(id =>  {
            const connection = connections[id];
            connection.send(JSON.stringify({
              type: 'NEW_MESSAGE',
              ...message
            }));
          });
        } catch (error) {
          console.log(error)
        }
        break;
      default:
        console.log('NO TYPE: ' + parsed.type);
    }
  });

  ws.on('close', (msg) => {
    closeConnection(user);
    checkConnectedUsers();
  });

});


module.exports = router;
