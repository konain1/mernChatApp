const mongoose = require('mongoose')



const connectDB = async()=>{

    try {
        let conn =   await mongoose.connect(process.env.MONGO_URI)
        console.log("db connected ",conn.connection.host)

    } catch (error) {
        console.log('db connection eroor ',error)
    }
     

}

module.exports = connectDB