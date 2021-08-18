import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { NovoUsuarioService } from './novo-usuario.service';
import { first, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsuarioExisteService {
  constructor(private novoUsuarioService: NovoUsuarioService) {}

  usuarioJaExite() {
    return (control: AbstractControl) => {
      // Pegando a mudança do input, e verificando se o usuário já existe, com a requisição do usuário
      return control.valueChanges.pipe(
        // Trocar o fluxo
        switchMap((nomeUsuario) =>
          this.novoUsuarioService.verificaUsuarioExistente(nomeUsuario)
        ),
        // Trocar o resultado
        map((usuarioExiste) =>
          usuarioExiste ? { usuarioExistente: true } : null
        ),
        // Fechar o observable
        first()
      );
    };
  }
}
