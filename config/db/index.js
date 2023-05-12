const mongoose=require('mongoose')
export function connectDatabase(URI){
    mongoose.connect(URI).then(()=>{
        console.log('Connected to database')
    }).catch(error=>{
        console.log('Error establishing database connection',error.stack)
    })
}