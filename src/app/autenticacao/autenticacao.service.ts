import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor(private httpClient: HttpClient) { }

  autentica(usuario: string, senha: string): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/user/login`, {
      userName: usuario,
      password: senha
    });
  }
}
