import { AutenticacaoService } from './../../autenticacao/autenticacao.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: string = '';
  senha: string = '';

  constructor(private authService: AutenticacaoService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.autentica(this.usuario, this.senha).subscribe(
      () => {
        console.log('autenticou');
      },
      (err) => {
        console.log(err);

      }
    );
  }
}
