const mongoose = require('mongoose')
const Schema = mongoose.Schema

var dataSchema = new Schema({
    roomId : {
        type : String,
        require : true
    },
    payload : {
        
    }
},{
    timestamps : true
})

var data = mongoose.model('data', dataSchema);

module.exports = data;