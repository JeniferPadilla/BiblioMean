import mongoose from "mongoose";

const dbConnection = () =>{
    try {
        mongoose.connect(process.env.DB_CONNECTION,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log("Connection whith MongoDB: OK");
    } catch (e) {
        console.log("Error connection to MongoDB: \n", e);
    }
};
export default {dbConnection};