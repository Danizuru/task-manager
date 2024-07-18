import { Component } from '@angular/core';
import { PeticionService } from '../../../../servicios/peticion.service';

@Component({
  selector: 'app-navbar1',
  templateUrl: './navbar1.component.html',
  styleUrls: ['./navbar1.component.css']
})
export class Navbar1Component {

  constructor (private peticion:PeticionService){}

  ngOnInit(): void {
    
    this.cargarTodas()
  }

  datos:any[] = []
  estado:number = 1


  cargarTodas(){

    let post = {
      host:this.peticion.urlHost,
      path:"/categorias/listar",
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

}
