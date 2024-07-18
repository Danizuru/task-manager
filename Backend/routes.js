//Admin middlewar//
let soloadmin = function(request,response, next){
    let rol = request.session.rol
    if(rol == 1){
        next()
    } else {
        response.json({state:false, mensaje:"Esta Api solo la pueden usar los Administradores"})
    }
}
//Logeados Middlewar//
let solologueados = function(request,response, next){
  
    if(request.session._id != undefined){
        next()
    } else {
        response.json({state:false, mensaje:"debe iniciar sesion"})
    }
}

//categorias//

const categoriasController = require("./api/controladores/categoriasController").categoriasController

app.post("/categorias/save", function(request,response){
    categoriasController.save(request,response)
})
app.post("/categorias/listar",  function(request, response) {
    categoriasController.listar(request,response)
})
app.post("/categorias/listarid", function(request, response) {
    categoriasController.listarid(request,response)
})
app.post("/categorias/update",  function(request,response){
    categoriasController.update (request,response)
})
app.post("/categorias/delete",  function(request,response){
    categoriasController.delete (request,response)
})

// tags

const tagsController = require("./api/controladores/tagsController").tagsController


app.post("/tags/save", function(request,response){
    tagsController.save(request,response)
})
app.get("/tags/listar", function(request, response) {
    tagsController.listar(request,response)
})
app.post("/tags/listarPendiente", function(request, response) {
    tagsController.listar(request,response)
})
app.post("/tags/listarProgreso", function(request, response) {
    tagsController.listar(request,response)
})
app.post("/tags/listarCompletada", function(request, response) {
    tagsController.listar(request,response)
})
app.post("/tags/listarid", function(request, response) {
    tagsController.listarid(request,response)
})
app.post("/tags/update",  function(request,response){
    tagsController.update (request,response)
})
app.delete("/tags/delete", function(request,response){
    tagsController.delete (request,response)
})

// api usuarios

const usuariosController = require("./api/controladores/usuariosController").usuariosController


app.post("/usuarios/save",  function(request,response){
    usuariosController.save(request,response)
})
app.post("/usuarios/registro",function(request,response){
    usuariosController.registro(request,response)
})
app.post("/usuarios/listar", function(request, response) {
    usuariosController.listar(request,response)
})
app.get("/usuarios/listarid/:_id" , function(request, response) {
    usuariosController.listarid(request,response)
})
app.post("/usuarios/update", function(request,response){
    usuariosController.update (request,response)
})
app.post("/usuarios/delete", function(request,response){
    usuariosController.delete (request,response)
})
app.post("/usuarios/login", function(request,response){
    usuariosController.login (request,response)
})
app.post("/usuarios/actualizardatos", function(request,response){
    usuariosController.actualizardatos (request,response)
})
app.post("/usuarios/state", function(request,response){
    response.json(request.session)
})
app.post("/usuarios/logout", solologueados, function(request,response){
    response.session.destroy
    response.json({state:true, mensaje: "session cerrada correctamente"})
})
app.post("/usuarios/activar", function(request,response){
    usuariosController.activar (request,response)
})
app.get("/usuarios/misdatos" , solologueados,  function(request, response) {
    usuariosController.misdatos(request,response)
})

