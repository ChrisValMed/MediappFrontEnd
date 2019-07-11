import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not401',
  templateUrl: './not401.component.html',
  styleUrls: ['./not401.component.css']
})
export class Not401Component implements OnInit {

  usuario: string;

  constructor() { }

  ngOnInit() {
    const helper = new JwtHelperService();

    let token = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME));
    const decodedToken = helper.decodeToken(token.access_token);
    this.usuario = decodedToken.user_name;
  }

}
