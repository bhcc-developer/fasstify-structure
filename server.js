require('dotenv').config();
const fs = require('fs');
const path = require('path');
const {
  getSwagger
} = require('./utils/swagger/swagger');

// Run the server!
const start = async () => {

  const fastify = require('fastify')({
    logger: true,
    /*
    bodyLimit: 300000,
    http2: JSON.parse(process.env.CERT_HTTPS2),
    https: {
      //maxConcurrentStreams: 256,
      allowHTTP1: JSON.parse(process.env.CERT_HTTPS1),
      key: fs.readFileSync(process.env.CERT_KEY_PATH),
      cert: fs.readFileSync(process.env.CERT_CRT_PATH)
    }
    */
  });

  try {


    const varsSwagger = await getSwagger();

    await fastify.register(require('@fastify/express'))
    fastify.use(require('cors')({
      optionsSuccessStatus: 200,
      origin: '*'
    }));
    fastify.use(require('dns-prefetch-control')());
    fastify.use(require('frameguard')());
    fastify.use(require('hide-powered-by')());
    fastify.use(require('hsts')());
    fastify.use(require('ienoopen')());
    fastify.use(require('x-xss-protection')());


    await fastify.register(require('@fastify/swagger'), varsSwagger);
    fastify.route({
      method: 'GET',
      url: '/',
      schema: {
        querystring: {
          name: {
            type: 'string'
          },
          excitement: {
            type: 'integer'
          }
        },
        response: {
          200: {
            type: 'object',
            properties: {
              hello: {
                type: 'string'
              }
            }
          }
        }
      },
      handler: function (request, reply) {
        reply.send({
          hello: 'world'
        })
      }
    })

    await fastify.listen({
      port: process.env.PORT || '50028',
      hostname: '0.0.0.0'
    });
    //fastify.swagger();
    fastify.log.info(`Server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();