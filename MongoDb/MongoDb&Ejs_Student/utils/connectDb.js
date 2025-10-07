const {MongoClient}= require("mongodb");

module.exports.connectMongo = async()=>{
    try{
        const clint = new MongoClient("mongodb://localhost:27017")
        await clint.connect()
        let db = clint.db("testingproject")
        console.log('Database connected..!')
        return db;
    } catch(error){
        console.log(error);
    }
}