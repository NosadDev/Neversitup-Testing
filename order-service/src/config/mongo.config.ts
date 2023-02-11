import { registerAs } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';
export default registerAs(
  'mongodb',
  (): MongooseModuleFactoryOptions => ({
    uri: process.env.MONGODB_URI,
  }),
);
