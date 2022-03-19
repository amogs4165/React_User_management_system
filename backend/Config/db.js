import mongoose from "mongoose";

const db = async()=>{

    // const connnectionParams = {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
    // };
    try{
      const conn =  await mongoose.connect('mongodb://localhost:27017/user_management');
        console.log(`connected to database:${conn.connection.host}`)
    }catch(error){
        console.log(error);
        console.log("connection not connnected to database")
    }

}

export default db

