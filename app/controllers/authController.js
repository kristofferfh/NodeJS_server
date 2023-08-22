const User = require("../model/users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const handleLogin = async (req, res) => {
  const {user, pwd} = req.body
  if (!user || !pwd) return res.status(400).json({"message" : "Username or password is missing"})

  const findUser = await User.findOne({username: user}).exec()
  if(!findUser) {
      console.log("401 in authController")
      return res.sendStatus(401)
  }

  const match = await bcrypt.compare(pwd, findUser.password)
  if (match) {
    const roles = Object.values(findUser.roles)
    const accessToken = jwt.sign({
          "UserInfo": {
          "username": findUser.username,
          "roles": roles
        }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "30000s"}
      )

    const refreshToken = jwt.sign
    (
        {"username": findUser.username},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: "1d"}
    )

     findUser.refreshToken = refreshToken
     const result = await findUser.save()
     console.log(result)

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000
      })
      res.json({accessToken})
  } else {
      res.sendStatus(401)
  }
}

module.exports = { handleLogin }