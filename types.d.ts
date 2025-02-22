/* eslint-disable no-var */
import { Connection } from "mongoose";

//i added the mongoose object into the global 
declare global {
  var mongoose: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
}

export {};