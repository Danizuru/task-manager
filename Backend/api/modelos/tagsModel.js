var tagsModel = {}
const mongoose = require("mongoose")
const Schema = mongoose.Schema

let tagsSchema = new Schema({
    cod_cat: String,
    task: String,
})

const myModel = mongoose.model("tags", tagsSchema)

tagsModel.buscarcodigo = function(post, callback){
    myModel.find({ cod_cat: post.cod_cat}, {task:1, cod_cat: 1}).then((respuesta) => {
        console.log(respuesta)
        if(respuesta.length == 0) {
            return callback({ posicion: -1})
        } else {
            return callback({ posicion: respuesta.length})
        }
    }).catch((error) => {
        console.log(error)
        return callback({ posicion: 0, state: false, mensaje: error})
    })
}
tagsModel.crear = function(post,callback) {

    const instancia = new myModel 
    instancia.cod_cat = post.cod_cat
    instancia.task = post.task
    

    instancia.save().then((respuesta) => {
        return callback({ state:true })
    }).catch((error) => {
        return callback({ state:false, mensaje:error })
    })




    // tags.push({ cod_cat: post.cod_cat, task: post.task})
    // return callback ({ state: true })
}
tagsModel.listar = function (post, callback) { 
    myModel.find({}, {}).then((respuesta) => {
        return callback({state: true, data: respuesta})
    })
}
tagsModel.listarid = function (post, callback) { 
    myModel.find({_id:post._id}, {}).then((respuesta) => {
        return callback({state: true, data: respuesta})
    })
}
tagsModel.listarPendiente = function (post, callback) { 
    myModel.find({cod_cat:'Pendiente'}, {}).then((respuesta) => {
        return callback({state: true, data: respuesta})
    })
}
tagsModel.listarProgreso = function (post, callback) { 
    myModel.find({cod_cat:'Progreso'}, {}).then((respuesta) => {
        return callback({state: true, data: respuesta})
    })
}
tagsModel.listarCompletada = function (post, callback) { 
    myModel.find({cod_cat:'Completa'}, {}).then((respuesta) => {
        return callback({state: true, data: respuesta})
    })
}
tagsModel.update = function(post, callback) {
    myModel.updateOne({_id:post._id},{task:post.task, cod_cat:post.cod_cat}).then((respuesta) => {
        console.log(respuesta)
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state: false, mensaje: error})
    })
}

tagsModel.delete = function(post, callback) {
    myModel.deleteOne({_id:post._id}).then((respuesta) => {
        console.log(respuesta)
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state: false, mensaje: error})
    })
}

module.exports.tagsModel = tagsModel
