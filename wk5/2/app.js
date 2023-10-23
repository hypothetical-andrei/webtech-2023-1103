import crypto from 'crypto-js'

const enc = crypto.AES.encrypt('somedata', 'a really secret key')
console.log(enc.toString())