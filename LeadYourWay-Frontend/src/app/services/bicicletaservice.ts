import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Bicicleta } from '../models/bicicleta';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})

export class Bicicletaservice {
  private url=`${base_url}/bicicletas`;

  private listaCambio = new Subject<Bicicleta[]>();
  constructor(private http: HttpClient){}
  list(){
    return this.http.get<Bicicleta[]>(this.url);
  }
  insert(b:Bicicleta){
    return this.http.post(this.url,b);
  }
  setList(listaNueva: Bicicleta[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Bicicleta>(`${this.url}/${id}`);
  }
  update(b:Bicicleta){
    return this.http.put(`${this.url}`, b, { responseType: 'text' });
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
