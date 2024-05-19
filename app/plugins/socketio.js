const fp = require("fastify-plugin");
const fastifyIO = require('fastify-socket.io')

module.exports = fp(async function (fastify, opts) {

await fastify.register(require('fastify-socket.io'), opts, (error) => console.error('error',error));
// let io
//   fastify.decorate("socket", io);

  // LOGIC GOES HERE
  fastify.ready((err) => {
    if (err) throw err;
     fastify.io.on("connection", async (socket) => {
      console.log(
        `${socket.name} with id: ${socket.user_id} has role: ${socket.role.name} connected! with socket id: ${socket.id}`
      );
    });
   
  });
});
