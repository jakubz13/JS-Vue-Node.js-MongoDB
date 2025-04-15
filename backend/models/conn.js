import mongoose from "mongoose";

mongoose.set("strictQuery", false);
const mongoDB ="mongodb://127.0.0.1:27017/102141";
conn().catch((err) => console.log(err));
async function conn() {
    await mongoose.connect(mongoDB)
}

export default conn

