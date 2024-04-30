const mongoose = require('mongoose')

async function main(){
    await mongoose.connect('mongodb+srv://brunoaraujop9:tAbE5u5XXvsAeUjX@cluster0.iiwxnqp.mongodb.net/').then((response) => {
        console.log("Conectou ao Mongoose")
    }).catch((err) => {
        console.log(err)
    })
}

main().catch((err) => console.log(err))

module.exports = mongoose