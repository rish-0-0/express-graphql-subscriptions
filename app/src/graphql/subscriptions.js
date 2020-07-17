import { RedisPubSub } from 'graphql-redis-subscriptions';
import * as Redis from 'ioredis';

const options = {
  host: 'redis_server',
  port: '6379',
  retryStrategy: times => {
    return Math.min(times*50, 1000);
  },
};
const dateReviver = (key, value) => {
  const isISO8601Z = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/;
  if (typeof value === 'string' && isISO8601Z.test(value)) {
    const tempDateNumber = Date.parse(value);
    if (!isNaN(tempDateNumber)) {
      return new Date(tempDateNumber);
    }
  }
  return value;
};

export default new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options),
  reviver: dateReviver,
});