const otp = require('otp-generator')

async function otpGen(){
  return otp.generate(6,{specialChars:false,lowerCaseAlphabets:false,upperCaseAlphabets:false,digits:true})
}

module.exports = otpGen