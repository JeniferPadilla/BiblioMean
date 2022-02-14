import mongoose from "mongoose";

const bookSchema= new mongoose.Schema({

    title:String,
    author:String,
    editorial:String,
    category: String,
    description:String,
    quantity:Number,
    deliveryDate:Date,
    rol:{type:mongoose.Schema.ObjectId,ref:"roles"},
    registerDate:{type:Date, default:Date.now},
    dbStatus:Boolean,

});

const book= mongoose.model("books", bookSchema);
export default book;