// ./plugins/socket.js

// here we define the fastify plugin
const fp = require("fastify-plugin");

// craeting socket module
module.exports = fp(async function (fastify, opts) {
// define the Server instance from socket.io
  const { Server } = require("socket.io");

// here we call the redis from the fastify instance as a plugin
  // const { redis } = fastify;

  // configuration the cors irigin for the Socket
  const io = new Server(fastify.server, {
    cors: { origin: "*" },
  });
  
  fastify.decorate("socket", io);

  fastify.ready((err) => {
    if (err) throw err;
  // defineing a path route for the socket 
    const connection = io.of("/socket");

    // authentication middleware - JWT assuming we have authentication system
    mainSocket.use(async (socket, next) => {
      // const { token } = socket.handshake.query;

      // if (token) {
      //   const { user_id, name, role } = fastify.jwt.verify(token);
      //   socket.name = name;
      //   socket.user_id = user_id;
      //   socket.role = role;
      //   // here we store the user_id as a key &socket id as a value  in redis 
      //   await redis.setex(user_id, socket.id);
      //   next();
      // }
    });

    mainSocket.on("connection", async (socket) => {
      // console.log(
      //   `${socket.name} with id: ${socket.user_id} has role: ${socket.role.name} connected! with socket id: ${socket.id}`
        console.log(
          `${socket.name}  connected with socket id: ${socket.id}`
    
        );

      // connect user to room - for testing
      socket.join("chatting");
      socket.on("disconnect", async () => {
      // when user disconnect remove the user_id & socket_id from the redis
        await redis.del(socket.user_id);
        console.log(`${socket.name} disconnected!`);
      });
    });
  });
});