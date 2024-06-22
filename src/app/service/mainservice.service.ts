import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainserviceService {

  constructor(private http:HttpClient) { }

  getData(){
    return this.http.get('https://65c0cfa6dc74300bce8cc64d.mockapi.io/Contact/profile')
  }
  postData(reqBody:any){
    return this.http.post(`${environment.baseUrl}`,reqBody)
  }
  
  editData(id:String, reqBody:any){
    return this.http.put<any>(`${environment.baseUrl}/${id}`,reqBody)
  }
  deleteData(id:String){
    return this.http.delete<any>(`${environment.baseUrl}/${id}`)
  }
}
