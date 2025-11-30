import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Alquiler } from '../models/alquiler';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
const base_url = environment.base

@Injectable({
  providedIn: 'root',
})
export class Alquilerservice {
  private url=`${base_url}/alquileres`;

  private listaCambio = new Subject<Alquiler[]>();
  constructor(private http: HttpClient){}
  list(){
    return this.http.get<Alquiler[]>(this.url);
  }
  insert(b:Alquiler){
    return this.http.post(this.url,b);
  }
  setList(listaNueva: Alquiler[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Alquiler>(`${this.url}/${id}`);
  }
  update(b:Alquiler){
    return this.http.put(`${this.url}`, b, { responseType: 'text' });
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
