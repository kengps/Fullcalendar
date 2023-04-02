const request = require('request')

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