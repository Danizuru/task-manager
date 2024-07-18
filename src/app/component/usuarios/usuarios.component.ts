import { Component } from '@angular/core';
import { PeticionService } from '../../servicios/peticion.service';

declare let $:any
declare let Swal:any

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  ngOnInit(): void {
    this.cargarTodas
    this.cargarTodas()
  }
  
  constructor (private peticion:PeticionService){}

  email:string = ""
  password:any = ""
  nombre:string = ""
  rol:number = 2
  direccion: any = ""
  telefono:any = ""
  estado:boolean = true
  datos:any[] = []
  Idseleccionado:String =""

  cargarTodas(){

    let post = {
      host:this.peticion.urlHost,
      path:"/usuarios/listar",
      payload:{
      }
    }
  this.peticion.Post(post.host+post.path, post.payload).then(
    (res:any) => {
      console.log(res)
      this.datos = res.data
    }
  )
  }
  AbrirModal(){
    this.email = ""
    this.nombre = ""
    this.direccion = ""
    this.telefono = ""
    this.rol = 2
    this.estado 
    this.Idseleccionado = ""
    $('#modalNuevo').modal('show')
  }
  Guardar(){

    let post = {
      host:this.peticion.urlHost,
      path:"/usuarios/save",
      payload:{
        email:this.email,
        nombre:this.nombre,
        estado:this.estado,
        direccion:this.direccion,
        telefono:this.telefono,
        rol:this.rol,
        
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
        this.cargarTodas()
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
  EditarId(id:string){
    this.Idseleccionado =id
    let post = {
      host:this.peticion.urlHost,
      path:"/usuarios/listarid",
      
    }
  this.peticion.get(post.host+post.path + "/" + this.Idseleccionado).then(
    (res:any) => {
      console.log(res)
      this.email = res.data[0].email
      this.nombre = res.data[0].nombre
      this.estado = res.data[0].estado
      $('#modalNuevo').modal('show')
    }
  )
    
  }
  Eliminar(){
    let post = {
      host:this.peticion.urlHost,
      path:"/usuarios/delete",
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
          this.cargarTodas()
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
      path:"/usuarios/update",
      payload:{
        _id:this.Idseleccionado,
        nombre:this.nombre,
        rol:this.rol,
        direccion:this.direccion,
        telefono:this.telefono,
        estado:this.estado,
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
        this.cargarTodas()
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

}
