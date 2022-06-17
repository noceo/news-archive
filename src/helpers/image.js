import { S3 } from 'aws-sdk'
import axios from 'axios'
import { PassThrough } from 'stream'
import { createHash } from 'crypto'

const bucketName = process.env.S3_BUCKET_1_NAME
const region = process.env.S3_BUCKET_1_REGION
const accessKeyId = process.env.S3_ACCESS_KEY
const secretAccessKey = process.env.S3_SECRET_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
})

async function downloadAsStream(url) {
  return axios({
    url,
    responseType: 'stream',
  })
}

function uploadFromStream(fileResponse, fileName) {
  const passThrough = new PassThrough()
  const promise = s3
    .upload({
      Bucket: bucketName,
      Key: fileName,
      ContentType: fileResponse.headers['content-type'],
      ContentLength: fileResponse.headers['content-length'],
      Body: passThrough,
    })
    .promise()
  return { passThrough, promise }
}

async function uploadImage(url) {
  const responseStream = await downloadAsStream(url)
  var filename =
    createHash('md5').update(url).digest('hex') + '.' + url.split('.').pop()
  const { passThrough, promise } = uploadFromStream(responseStream, filename)

  responseStream.data.pipe(passThrough)

  return promise
    .then((result) => {
      return result.Location
    })
    .catch((error) => {
      throw error
    })
}

function getFileStream(fileName) {
  const downloadParams = {
    Key: fileName,
    Bucket: bucketName,
  }
  return s3.getObject(downloadParams).createReadStream()
}

export default {
  uploadImage,
  getFileStream,
}
