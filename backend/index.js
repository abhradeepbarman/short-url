const express = require("express")
require("dotenv").config()
const urlRoute = require("./routes/url")
const {connectDB} = require("./connect")
const { redirectUrl } = require("./controllers/url")

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/url", urlRoute)

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Serever started at port ${port}`)
})

connectDB()