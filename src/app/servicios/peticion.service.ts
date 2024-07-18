import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


declare let $:any
declare let Swal:any

@Injectable({
  providedIn: 'root'
})
export class PeticionService {

  constructor(private http: HttpClient) { }

  urlHost:string = 'http://localhost:3000'


  Post(url:string, data:{}){

    let promise = new Promise ((resolve, reject) => {

      this.http.post(url,data).toPromise().then(
        (res:any) => {
          if(res.permisos == true){
            Swal.fire({
              icon: "Error",
              title: "Error",
              text: res.mensaje,
            });


          }
          resolve(res)
        }
        ).catch((error) => {
          reject(error)
        })
      })
    return promise
  }

  Put(url:string, data:{}){
    
    let promise = new Promise ((resolve, reject) => {

      this.http.put(url,data).toPromise().then(
        (res:any) => {
          resolve(res)
        }
        ).catch((error) => {
          reject(error)
        })
      

    })
    return promise
  }

  delete(url:string, data:{}){
    
    let promise = new Promise ((resolve, reject) => {

      this.http.delete(url,data).toPromise().then(
        (res:any) => {
          resolve(res)
        }
        ).catch((error) => {
          reject(error)
        })
      

    })
    return promise
  }

  get(url:string){
    
    let promise = new Promise ((resolve, reject) => {

      this.http.get(url).toPromise().then(
        (res:any) => {
          resolve(res)
        }
        ).catch((error) => {
          reject(error)
        })
      

    })
    return promise
  }

}






// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class PeticionService {
//   private urlHost: string = "http://localhost:3000";

//   constructor(private http: HttpClient) { }

//   private handleError(error: any) {
//     console.error('An error occurred:', error);
//     return throwError('Something went wrong; please try again later.');
//   }

//   post(endpoint: string, data: any): Observable<any> {
//     const url = `${this.urlHost}${endpoint}`;
//     console.log('POST URL:', url);
//     return this.http.post(url, data).pipe(
//       catchError(this.handleError)
//     );
//   }

//   put(endpoint: string, data: any): Observable<any> {
//     const url = `${this.urlHost}${endpoint}`;
//     console.log('PUT URL:', url);
//     return this.http.put(url, data).pipe(
//       catchError(this.handleError)
//     );
//   }

//   delete(endpoint: string, data: any): Observable<any> {
//     const url = `${this.urlHost}${endpoint}`;
//     console.log('DELETE URL:', url);
//     return this.http.request('delete', url, { body: data }).pipe(
//       catchError(this.handleError)
//     );
//   }

//   get(endpoint: string): Observable<any> {
//     const url = `${this.urlHost}${endpoint}`;
//     console.log('GET URL:', url);
//     return this.http.get(url).pipe(
//       catchError(this.handleError)
//     );
//   }
// }

