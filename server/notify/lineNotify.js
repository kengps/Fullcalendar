const request = require('request');
const fs = require('fs');

exports.notifyEvent = async(msg) => {
    request({
      uri: process.env.NOTIFYURL,
      method: "POST",
      auth: {
        bearer: process.env.TOKENLINE,
      },
      form: {
        message: msg
      }
    });
}




exports.notifyEvenings = async (msg, filename) => {
  let fileData = `public/uploads/${filename}`;
  request({
    uri: process.env.NOTIFYURL,
    method: "POST",
    auth: {
      bearer: process.env.TOKENLINE,
    },
    formData: {
      message: msg,
      imageFile: fs.createReadStream(fileData),
    },
  });
};