import _mongoose, { connect, ConnectOptions } from 'mongoose';

declare global {
  //eslint-disable-next-line no-var
  var mongoose: {
    promise: Promise<typeof _mongoose | void> | null;
    conn: typeof _mongoose | null;
  };
}

let cached = global.mongoose;

const DB_URI: string = process.env.DB_URI as string;

const options: ConnectOptions = {};

if (!cached) {
  cached = global.mongoose = { promise: null, conn: null };
}

async function connectDb() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = connect(DB_URI, options)
      .then((connection) => {
        cached.conn = connection;

        return connection;
      })
      .catch((err) => {
        cached.promise = null;

        /*TODO: Add better error handling*/
        console.log('Err: ', err.message);
      });

    return cached.conn;
  }
}

export default connectDb;
