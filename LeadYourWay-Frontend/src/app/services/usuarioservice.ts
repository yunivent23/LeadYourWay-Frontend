import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Users } from '../models/users';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Usuarioservice {
  private url=`${base_url}/usuarios`;

  private listaCambio = new Subject<Users[]>();
  constructor(private http: HttpClient){}
  list(){
    return this.http.get<Users[]>(this.url);
  }
  insert(u:Users){
    return this.http.post(this.url,u);
  }
  setList(listaNueva: Users[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Users>(`${this.url}/${id}`);
  }
  update(u:Users){
    return this.http.put(`${this.url}`, u, { responseType: 'text' });
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
  searchName(nombre: string) {
  const token = sessionStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };
  const params = { nombre: nombre };
  return this.http.get<Users[]>(`${this.url}/busquedas`, { params, headers });
  }

}

