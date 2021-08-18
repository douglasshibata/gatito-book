import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from '../token.service';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // Behavior subject é um observale que guarda estado, vai retronar o ultimo estado salvo nele
  private usuarioSubject = new BehaviorSubject<Usuario>({});

  constructor(private tokenService: TokenService) {
    // verifica se tem token no local storage
    if (this.tokenService.possuiToken()) {
      this.decodificaJWT();
    }
  }

  private decodificaJWT() {
    const token = this.tokenService.retornaToken();
    const usuario = jwtDecode(token) as Usuario;
    this.usuarioSubject.next(usuario);
  }

  // retorna o subkect para quem chamar ele, mas não poderá manipular os dados, será apenas retornado o valor
  retornaUsuario() {
    return this.usuarioSubject.asObservable();
  }

  salvaToken(token: string) {
    this.tokenService.salvaToken(token);
    this.decodificaJWT();
  }

  // Limpando o token
  logout(){
    this.tokenService.exluiToken();
    this.usuarioSubject.next({});
  }

  // verifica se está logado
  estaLogado(){
    return this.tokenService.possuiToken();
  }
}
