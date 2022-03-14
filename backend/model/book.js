import mongoose from "mongoose";

const bookSchema= new mongoose.Schema({

    title:String,
    author:String,
    editorial:String,
    category: String,
    description:String,
    quantity:Number,
    deliveryDate:Date,
    user:{type:mongoose.Schema.ObjectId,ref:"users"},
    registerDate:{type:Date, default:Date.now},
    dbStatus:String,

});

const book= mongoose.model("books", bookSchema);
export default book;