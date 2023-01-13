let getSwagger = async () => {

  let option = {
    routePrefix: '/documentation',
    exposeRoute: JSON.parse(process.env.SWAGGER_ENABLE),
    swagger: {
      info: {
        title: process.env.SWAGGER_TITLE,
        description: process.env.SWAGGER_DESCRIPTION,
        version: process.env.SWAGGER_VERSION
      },
      externalDocs: {
        url: process.env.SWAGGER_URL,
        description: process.env.SWAGGER_URL_DESCRIPTION
      },
      host: process.env.SWAGGER_HOST + ':' + process.env.PORT,
      schemes: ['https'],
      consumes: ['application/json'],
      produces: ['application/json'],
      securityDefinitions: Object
    }
  };

  return option;
}

module.exports.getSwagger = getSwagger;