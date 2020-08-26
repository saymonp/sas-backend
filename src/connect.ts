import mongoose from "mongoose";

export default (db: string) => {
  const connect = () => {
    mongoose
      .connect(db, {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then(() => {
        return console.log("Successfully connected");
      })
      .catch((error) => {
        console.log("Error connecting to database: ", error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on("disconnected", connect);
};
