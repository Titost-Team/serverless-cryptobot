import type {Serverless} from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'serverless-cryptobot'
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  plugins: [
    'serverless-webpack',
    'serverless-offline'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },
  functions: {
    hello: {
      handler: 'handler.hello',
      events: [
        {
          http: {
            method: 'get',
            path: 'hello',
          }
        }
      ]
    }
  },
  configValidationMode: 'warn',
  app: 'serverless-cryptobot',
  org: 'titost.team'
}

module.exports = serverlessConfiguration;
