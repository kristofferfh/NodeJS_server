// Load credentials
require("dotenv").config()

// Load dependables
const express = require("express")
const app = express()
const path = require("path")
const cors = require("cors")
const errorHandler = require("./middleware/errorHandler")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")

// Load config/options
const corsOptions = require("./config/corsOptions")
const verifyJWT = require("./middleware/verifyJWT")
const connectDB = require("./config/dbConnection")
const PORT = process.env.PORT || 3500;

// Custom logger
const { logger } = require("./middleware/logger")
app.use(logger)

// Connect to MongoDB
connectDB()

// CORS Settings
app.use(cors(corsOptions))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())
app.use("/", express.static(path.join(__dirname, "..", "public")))

// Routes
app.use("/", require("./routes/root"))
app.use("/register", require("./routes/register"))
app.use("/auth", require("./routes/auth"))
app.use("/refresh", require("./routes/refresh"))
app.use("/logout", require("./routes/logout"))
app.use("/employees", require("./routes/api/employees"))
//app.use(verifyJWT)

// Catch-all
app.all("*", ( req, res ) => {
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html") )
    }
    else if (req.accepts("json")) {
        res.json({error: "404 Not Found"})
    }
    else if (req.accepts("txt")) {
        res.type("html");
    }
})

// Error Handling
app.use(errorHandler)

// Finally, connect app
mongoose.connection.once("open", () =>{
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`App running on port ${PORT}`))
})