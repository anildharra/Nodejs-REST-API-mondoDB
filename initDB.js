const mongoose = require('mongoose');

module.exports = () => {
  // mongoose
  // .connect(process.env.MONGODB_URI, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true
  // },(err)=> {
  //     if(err){
  //       console.log("ERR ::" , err);
  //     } else {
  //       console.log("CONNECTED ");
  //     }
  //   });

  mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
      // user: process.env.DB_USER,
      // pass: process.env.DB_PASS,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false
    })
    .then(() => {
      console.log('Mongodb connected....');
    })
    .catch(err => console.log("catch err.message ", err.message));
     
  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to db...');
  });

  mongoose.connection.on('error', err => {
    console.log("on error err.message ",err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected...');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(
        'Mongoose connection is disconnected due to app termination...'
      );
      process.exit(0);
    });
  });
};
