const express = require("express")
const { uuid } = require("uuidv4")
const multer = require("multer")
const path = require("path")

const router = express.Router()
const app = express()

console.log(path.resolve(__dirname, "../uploads"))
const uploadFolder = path.resolve(__dirname, "../uploads")

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename: (req, file, callback) =>
      callback(null, uuid() + path.extname(file.originalname)),
  }),
})

app.use("/arquivo", express.static('path.resolve(__dirname, "../uploads")'))

router.post("/file", upload.single("imagem"), (req, res) => {
  res.status(200).send("'👌 Ok! '")
})

module.exports = router
