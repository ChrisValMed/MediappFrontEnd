import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-infoperfil',
  templateUrl: './infoperfil.component.html',
  styleUrls: ['./infoperfil.component.css']
})
export class InfoperfilComponent implements OnInit {

  usuario: string;
  rolUs: string;

  constructor() { }

  ngOnInit() {

    const helper = new JwtHelperService();

    let token = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME));
    const decodedToken = helper.decodeToken(token.access_token);
    this.usuario = decodedToken.user_name;
    //console.log(decodedToken.authorities);
    this.rolUs = decodedToken.authorities;

  }

}
