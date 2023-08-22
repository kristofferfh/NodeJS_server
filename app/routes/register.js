const path = require("path")
const express = require("express")
const router = express.Router()
const registerController = require("../controllers/registerController")

router.post("/", registerController.handleNewUser)

router.get("/test(.html)?", (req, res)=>{
  res.sendFile(path.join(__dirname, "..", "views", "index.html"))
})

module.exports = router