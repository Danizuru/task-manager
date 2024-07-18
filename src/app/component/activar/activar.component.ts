import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeticionService } from '../../servicios/peticion.service';


declare let $:any
declare let Swal:any


@Component({
  selector: 'app-activar',
  templateUrl: './activar.component.html',
  styleUrls: ['./activar.component.css']
})
export class ActivarComponent  {


email:String = ""
codigo:string = ""

constructor(private actroute:ActivatedRoute, private peticion:PeticionService, private router:Router){
}

ngOnInit(): void {
  this.email = this.actroute.snapshot.params["correo"]
  this.codigo = this.actroute.snapshot.params["codigo"]
}



Activar(){
  let post = {
    host:this.peticion.urlHost,
    path:"/usuarios/activar",
    payload:{
      email:this.email,
      codigoact:this.codigo
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
      
      this.router.navigate(["misdatos"])


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
