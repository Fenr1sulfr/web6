const mongoose = require('mongoose');
const uri = "mongodb+srv://sulfur:1234@cluster0.depm68j.mongodb.net/?retryWrites=true&w=majority";
let dbConnect;

module.exports = {
    connectDB: (connect) => {
        mongoose.connect(uri)
            .then((client) => {
                console.log("Successfully connected to DB");
                dbConnect = client.connection;
                return connect(null, dbConnect);  // Pass the connection object to the callback
            })
            .catch((err) => {
                console.error("Error connecting to DB:", err);
                return connect(err);  // Pass the error to the callback
            });
    },
    getDB: () => {
        return dbConnect;
    }
};
