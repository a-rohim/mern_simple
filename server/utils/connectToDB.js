let mongoose = require('mongoose')

function connectToDB() { if (mongoose.connections[0].readyState === 0) { mongoose.connect(process.env.MONGODB_URI).then(() => console.log('connected')).catch(e => console.log('error in connect to db', e.message)) } }

module.exports = { connectToDB }