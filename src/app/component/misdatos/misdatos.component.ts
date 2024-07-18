import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { PeticionService } from 'src/app/servicios/peticion.service';


declare let $:any
declare let Swal:any


@Component({
  selector: 'app-misadatos',
  templateUrl: './misdatos.component.html',
  styleUrls: ['./misdatos.component.css'],
})
export class MisdatosComponent {

  constructor (private peticion:PeticionService){}

  ngOnInit() {
    this.cargarTodascategorias()
    this.cargarTodasdata()
  }

  listadata:any = []
  datoscategorias:any[] = []
  cod_cat:string = ""
  task:string = ""
  Idseleccionado:String =""

  listProgreso:any = []
  listCompletada:any = []
  listPendiente:any = []

/**Carga categorias (para uso de implementaciones futuras) */
  cargarTodascategorias(){

    let post = {
      host:this.peticion.urlHost,
      path:"/categorias/listar",
      payload:{
      }
    }
  this.peticion.Post(post.host+post.path, post.payload).then(
    (res:any) => {
      console.log(res)
      
      this.datoscategorias = res.data
      console.log(this.datoscategorias)
    }
    
  )
  }
/**Organizar informacion y clasificar en listas de acuerso al estado */
  cargarTodasdata(){

    let post = {
      host:this.peticion.urlHost,
      path:"/Tags/listarPendiente",
      payload:{
      }
    }
  this.peticion.Post(post.host+post.path, post.payload).then(
    (res:any) => {
      console.log('------->',res.data)
      this.listadata = res.data

      res.data.forEach((tarea:any) => {
        if(tarea.cod_cat === 'Pendiente'){
          this.listPendiente.push(tarea)
      
        }
        if(tarea.cod_cat === 'En Progreso'){
          this.listProgreso.push(tarea)
      
        }
        if(tarea.cod_cat === 'Completada'){
          this.listCompletada.push(tarea)
      
        }
        
      });
    }
  )
  }
/**Abrir ventana para modificar informacion */
  AbrirModal(){
    this.cod_cat = ""
    this.Idseleccionado = ""
    $('#modalNuevo').modal('show')
  }
/**Boton guardar dentro del modal */
  Guardar(){

    let post = {
      host:this.peticion.urlHost,
      path:"/tags/save",
      payload:{
        cod_cat:this.cod_cat,
        task:this.task,
      }
    }
  this.peticion.Post(post.host+post.path, post.payload).then(
    (res:any) => {
      if(res.state == true){

        Swal.fire({
          icon: "success",
          title: "Que Bien!",
          text: res.mensaje,
        });

        $('#modalNuevo').modal('hide')
        this.cargarTodascategorias()
      }
      else{
        Swal.fire({
          icon: "error",
          title: "Ouchh.",
          text: res.mensaje,
        });
      }
    })
  }
/**Abrir modal para editar celda seleccionada al dar click*/
  EditarId(id:string){
    
    console.log('punch',this.Idseleccionado)
    this.Idseleccionado = id
    let post = {
      host:this.peticion.urlHost,
      path:"/tags/listarid",
      payload:{
        _id:id
      }
    }
  this.peticion.Post(post.host+post.path, post.payload).then(
    (res:any) => {
      console.log(res)
        this.cod_cat = res.data[0].cod_cat
        this.task = res.data[0].task
        
        $('#modalNuevo').modal('show')
      // if(res.data != undefined){
      // }
    }
  )
    
  }
  Eliminar(){
    let post = {
      host:this.peticion.urlHost,
      path:"/tags/delete",
      payload:{
        _id:this.Idseleccionado
      }
    }
    this.peticion.Post(post.host+post.path, post.payload).then(
      (res:any) => {
        console.log(res)
        if(res.state == true){

          Swal.fire({
            icon: "success",
            title: "Que Bien!",
            text: res.mensaje,
          });

          $('#modalNuevo').modal('hide')
          this.cargarTodascategorias()
        }
        else{
          Swal.fire({
            icon: "error",
            title: "Ouchh.",
            text: res.mensaje,
          });
        }
      })
  }
  Actualizar(){

    let post = {
      host:this.peticion.urlHost,
      path:"/tags/update",
      payload:{
        _id:this.Idseleccionado,
        cod_cat:this.cod_cat,
        task:this.task,

      }
    }
  this.peticion.Post(post.host+post.path, post.payload).then(
    (res:any) => {
      console.log(res)
      if(res.state == true){

        Swal.fire({
          icon: "success",
          title: "Que Bien!",
          text: res.mensaje,
        });

        $('#modalNuevo').modal('hide')
        this.cargarTodascategorias()
      }
      else{
        Swal.fire({
          icon: "error",
          title: "Ouchh.",
          text: res.mensaje,
        });
      }
    })
  }
/**Actualizar elementos en pantalla */
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.updateItemStatus
      console.log(this.listCompletada,this.listPendiente,this.listProgreso)
      
    }
    this.Actualizar();
  }

  updateItemStatus(item: any, containerId: string,) {
    let updatedStatus;
    switch (containerId) {
      case 'Pendientebox':
        updatedStatus = 'Pendiente';
        break;
      case 'Progresobox':
        updatedStatus = 'En progreso';
        break;
      case 'Completadabox':
        updatedStatus = 'Completada';
        break;
    }
    item.data = updatedStatus;
    this.updateItemOnServer
  }

  updateItemOnServer(item: any) {
    let post = {
      host:this.peticion.urlHost,
      path:"/tags/update",
      payload:{
        _id:this.Idseleccionado,
        cod_cat:this.cod_cat,
        task:this.task,

      }
    }
  this.peticion.Post(post.host+post.path, post.payload).then(
    (res:any) => {
      console.log(res)
      if(res.state == true){

        Swal.fire({
          icon: "success",
          title: "Que Bien!",
          text: res.mensaje,
        });

        $('#modalNuevo').modal('hide')
        this.cargarTodascategorias()
      }
      else{
        Swal.fire({
          icon: "error",
          title: "Ouchh.",
          text: res.mensaje,
        });
      }
    })

  // Actualizartask(){

  //   let post = {
  //     host:this.peticion.urlHost,
  //     path:"/tags/update",
  //     payload:{
  //       _id:this.Idseleccionado,
  //       cod_cat:this.cod_cat,
  //       task:this.task,

  //     }
  //   }
  // this.peticion.Post(post.host+post.path, post.payload).then(
  //   (res:any) => {
  //     console.log(res)
  //     if(res.state == true){

  //       Swal.fire({
  //         icon: "success",
  //         title: "Que Bien!",
  //         text: res.mensaje,
  //       });

  //       $('#modalNuevo').modal('hide')
  //       this.cargarTodascategorias()
  //     }
  //     else{
  //       Swal.fire({
  //         icon: "error",
  //         title: "Ouchh.",
  //         text: res.mensaje,
  //       });
  //     }
  //   })


  }


























}
