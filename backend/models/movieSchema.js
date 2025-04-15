import mongoose from "mongoose";
const Schema =mongoose.Schema;

const movieSchema = new Schema({
    title:String,
    director:String,
    year:Number,
    genre:String, 
    seen:Boolean

});



export default mongoose.model("movies", movieSchema);