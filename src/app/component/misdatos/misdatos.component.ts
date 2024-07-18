import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { PeticionService } from 'src/app/servicios/peticion.service';

declare let $: any;
declare let Swal: any;

@Component({
  selector: 'app-misadatos',
  templateUrl: './misdatos.component.html',
  styleUrls: ['./misdatos.component.css'],
})
export class MisdatosComponent implements OnInit {
  listadata: any = [];
  datoscategorias: any[] = [];
  cod_cat: string = '';
  task: string = '';
  Idseleccionado: string = '';

  listProgreso: any = [];
  listCompletada: any = [];
  listPendiente: any = [];

  constructor(private peticion: PeticionService) {}

  ngOnInit() {
    this.cargarTodascategorias();
    this.cargarTodasdata();
  }
  /**Carga categorias (para uso de implementaciones futuras) */
  cargarTodascategorias() {
    this.peticion.Post(this.peticion.urlHost + '/categorias/listar', {}).then((res: any) => {
      this.datoscategorias = res.data;
    });
  }
  /**Organizar informacion  */
  cargarTodasdata() {
    this.listPendiente = [];
    this.listProgreso = [];
    this.listCompletada = [];

    this.peticion.Post(this.peticion.urlHost + '/Tags/listarPendiente', {}).then((res: any) => {
      this.listadata = res.data;
      this.classifyTasks(res.data);
    });
  }
  /**clasificar en listas de acuerdo al estado */
  classifyTasks(tasks: any[]) {
    tasks.forEach((tarea: any) => {
      switch (tarea.cod_cat) {
        case 'Pendiente': this.listPendiente.push(tarea);
          break;
        case 'En Progreso': this.listProgreso.push(tarea);
          break;
        case 'Completada': this.listCompletada.push(tarea);
          break;
      }
    });
  }
  /**Limpiar elementos(si existen) al crear nuevo modal */
  AbrirModal() {
    this.cod_cat = '';
    this.task = '';
    this.Idseleccionado = ''; 
  }
  /**Boton guardar dentro del modal */
  Guardar() {
    this.saveOrUpdateTask('/tags/save', { cod_cat: this.cod_cat, task: this.task });
  }
  /**Abrir modal y cargar datos para editar celda seleccionada al dar click */
  EditarId(id: string) {
    this.Idseleccionado = id;
    this.peticion.Post(this.peticion.urlHost + '/tags/listarid', { _id: id }).then((res: any) => {
      const data = res.data[0];
      this.cod_cat = data.cod_cat;
      this.task = data.task;
      $('#exampleModal').modal('show');
    });
  }
  Eliminar() {
    this.saveOrUpdateTask('/tags/delete', { _id: this.Idseleccionado });
    $('#exampleModal').modal('hide');
  }
  Actualizar() {
    this.saveOrUpdateTask('/tags/update', {
      _id: this.Idseleccionado,
      cod_cat: this.cod_cat,
      task: this.task,
    });
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
        event.currentIndex
      );
      const item = event.container.data[event.currentIndex];
      this.updateItemStatus(item, event.container.id);
    }
  }
  updateItemStatus(item: any, containerId: string) {
    const statusMap: { [key: string]: string } = {
      Pendientebox: 'Pendiente',
      Progresobox: 'En Progreso',
      Completadabox: 'Completada',
    };
    item.cod_cat = statusMap[containerId];
    this.saveOrUpdateTask('/tags/update', {
      _id: item._id,
      cod_cat: item.cod_cat,
      task: item.task,
    });
  }
  /**Tareas de guardar o actualizar */
  saveOrUpdateTask(path: string, payload: any) {
    this.peticion.Post(this.peticion.urlHost + path, payload).then((res: any) => {
      const messageType = res.state ? 'success' : 'error';
      const title = res.state ? 'Que Bien!' : 'Ouchh.';
      Swal.fire({
        icon: messageType,
        title: title,
        text: res.mensaje,
      });
      if (res.state) {
        $('#exampleModal').modal('hide');
        this.cargarTodasdata();
      }
    });
  }
}
