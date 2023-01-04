require('./config/config')
const { Product } = require("./models/Product")
const connectDB = require("./config/db")

const jsonProduct = require("./products.json")

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany()
        await Product.create(jsonProduct)
        console.log("Bravo")
    } catch (error) {
        console.log(error)
    }
}

start()