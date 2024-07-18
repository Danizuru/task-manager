import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeticionService } from '../../servicios/peticion.service';
import { NgClass, NgIf } from '@angular/common';



declare let Swal:any


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],

})
export class RegistroComponent implements OnInit{

  constructor(private peticion:PeticionService , private router:Router ){
    
  }


  ngOnInit(): void {
   
  }

  nombre:string = ""
  email:any = ""
  password:any = ""
  confpassword:any = ""
  datos:any[] = []
  visible:boolean = true;
  changetype:boolean =true;

  
registrar(){

  let post = {
    Host:this.peticion.urlHost,
    path:"/usuarios/registro",
    payload:{
      nombre:this.nombre,
      email:this.email,
      password:this.password,
      confpassword:this.confpassword,
      estado: 0
  }}
  this.peticion.Post(post.Host + post.path,post.payload).then((res:any) =>{
    console.log(res)
    if(res.state == true){

      Swal.fire({
        icon: "success",
        title: "Bienvenido!",
        text: res.mensaje,
      });

    }
    else {

      Swal.fire({
        icon: "error",
        title: "Ouuch!",
        text: res.mensaje,
      });
    }
    }
  )
}



  viewpass(){
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

}
