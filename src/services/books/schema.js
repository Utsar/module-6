import mongoose, { Schema } from "mongoose"

const {schema, model} = mongoose

const BooksSchema = new Schema({
    asin:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    img:{
        type: String,
        required: true
    },
})