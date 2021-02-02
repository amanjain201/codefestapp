import { Component, OnInit } from '@angular/core';
import Webex from 'webex';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  webex:any;
  constructor() { }

  ngOnInit() {
    let redirect_uri = `${window.location.protocol}//${window.location.host}`;

    if (window.location.pathname) {
      redirect_uri += window.location.pathname;
    }
    this.webex = Webex.init({
      config: {
        meetings: {
          deviceType: 'WEB'
        },
        credentials: {
          client_id: 'C8f20caef1eb03216e384e32ee6d4940c23ebee1a9a5c133c2c0e4bb6c7238a2b',
          redirect_uri: redirect_uri,
          scope: 'spark:all spark:kms'
        }
      }
    });
    this.webex.once('ready', ()=>{
      console.log(this.webex.canAuthorize);
      // To Login
      // this.webex.authorization.initiateLogin();
      // To Logout
      // this.webex.logout();
      if(this.webex.canAuthorize){
        // Get Login info if authorised
        this.webex.people.get('me').then(data=>{
          console.log(data);
        })
      }
    });
  }

}
