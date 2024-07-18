const tagsModel = require("../modelos/tagsModel.js").tagsModel;
const tagsController = {};

tagsController.save = function(request, response) {
    let post = { 
        cod_cat: request.body.cod_cat,
        task: request.body.task, 
        
    };

    // Validar cod_cat
    if (!post.cod_cat) {
        return response.json({ state: false, mensaje: "el campo cod_cat es obligatorio", campo: "cod_cat" });
    }

    // Validar task
    if (!post.task) {
        return response.json({ state: false, mensaje: "el campo task es obligatorio", campo: "task" });
    }
    if (post.task.length < 4) {
        return response.json({ state: false, mensaje: "el campo task debe contener minimo 4 caracteres", campo: "task" });
    }
    if (post.task.length > 50) {
        return response.json({ state: false, mensaje: "el campo task debe contener maximo 50 caracteres", campo: "task" });
    }



    // Crear objeto post después de todas las validaciones
    
    tagsModel.crear(post, function(respuesta) {
        if (respuesta.state === true) {
            return response.json({ state: true, mensaje: "Tarea creada correctamente" });
        } else {
            return response.json({ state: false, mensaje: "Error al guardar" });
        }
    });


    // tagsModel.buscarcodigo(post, function(resultado) {
    //     if (resultado.posicion == -1) {
    //         tagsModel.crear(post, function(respuesta) {
    //             if (respuesta.state === true) {
    //                 return response.json({ state: true, mensaje: "producto creado correctamente" });
    //             } else {
    //                 return response.json({ state: false, mensaje: "Error al guardar" });
    //             }
    //         });
    //     } else {
    //         return response.json({ state: false, mensaje: "el codigo ya existe" });
    //     }
    // });
};
tagsController.listar = function(request, response) {
    tagsModel.listar(null, function(respuesta) {
        response.json(respuesta);
    });
};
tagsController.listarid = function(request, response) {

    let post = { 
        _id:request.body._id,
    }

    if (!post._id) {
        return response.json({ state: false, mensaje: "el campo id es obligatorio", campo: "_id" });
    }

    tagsModel.listarid(post, function(respuesta) {
        response.json(respuesta);
    });
};
tagsController.listarPendiente = function(request, response) {

    let post = { 
        cod_cat:request.body.cod_cat,
    }

    tagsModel.listarid(post, function(respuesta) {
        response.json(respuesta);
    });
};
tagsController.listarProgreso = function(request, response) {

    let post = { 
        cod_cat:request.body.cod_cat,
    }

    tagsModel.listarProgreso(post, function(respuesta) {
        response.json(respuesta);
    });
};
tagsController.listarCompletada = function(request, response) {

    let post = { 
        cod_cat:request.body.cod_cat,
    }

    tagsModel.listarCompletada(post, function(respuesta) {
        response.json(respuesta);
    });
};
tagsController.update = function(request, response) {
    let post = { 
        _id:request.body._id,
        task:request.body.task,
        cod_cat:request.body.cod_cat,
        
    }

    if (!post._id) {
        return response.json({ state: false, mensaje: "el campo id es obligatorio", campo: "_id" });
    }
    if (!post.task) {
        return response.json({ state: false, mensaje: "el campo task es obligatorio", campo: "task" });
    }
    if (!post.cod_cat) {
        return response.json({ state: false, mensaje: "el campo cod_cat es obligatorio", campo: "cod_cat" });
    }


    tagsModel.update(post, function(respuesta) {
        if (respuesta.state == true) {
            response.json({ state: true, mensaje: "se actualizo el elemento correctamente" });
        } else {
            response.json({ state: false, mensaje: "se presento un error al actualizar el elemento", error: respuesta });
        }
    });
};
tagsController.delete = function(request, response) {
    let post = { 
        _id:request.body._id,
        task:request.body.task,
        estado:request.body.estado
    }

    if (!post._id) {
        return response.json({ state: false, mensaje: "el campo id es obligatorio", campo: "_id" });
    }

    tagsModel.delete(post, function(respuesta) {
        if (respuesta.state == true) {
            response.json({ state: true, mensaje: "se elimino el elemento correctamente" });
        } else {
            response.json({ state: false, mensaje: "se presento un error al eliminar el elemento", error: respuesta });
        }
    });
};

module.exports.tagsController = tagsController;








