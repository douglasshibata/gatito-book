import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor(private httpClient: HttpClient, private usuarioService: UsuarioService) { }

  autentica(usuario: string, senha: string): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(`${environment.apiURL}/user/login`, {
      userName: usuario,
      password: senha
    },
      { observe: 'response' }
    )
      // Fazendo a operação para pegar o cabeçalho de retorno da requisição e pegar o token
      .pipe(
        // operador tap não muda o fluxo, apenas pega a resposta da requisição
        tap((res) => {
          const authToken = res.headers.get('x-access-token') ?? '';
          this.usuarioService.salvaToken(authToken);
        })
      );
  }
}
