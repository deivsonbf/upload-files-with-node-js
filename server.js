const express = require("express")
const { uuid } = require("uuidv4")
const multer = require("multer")
const multerS3 = require("multer-s3")
const path = require("path")
const aws = require("aws-sdk")

// Variáveis de Ambiente

const port = 3000
const app = express()

// Configuração AWS
//aws.config.update({
//  accessKeyId: "",
//  secretAccessKey: "",
//  region: "sa-east-1",
//})

const s3 = new aws.S3()

const upload = multer({
  storage: multerS3({
    s3,
    bucket: "app.images.movies",
    acl: "public-read",
    //  acl: "private",
    key(req, file, callback) {
      callback(null, uuid() + path.extname(file.originalname))
    },
  }),
})

app.post("/file", upload.single("imagem"), (req, res) => {
  console.log(req.file.location)


  res.status(200).send("'👌 Ok! '")
})

app.listen(port, () => {
  console.log(`Conectado a http://localhost:${port}`)
})
