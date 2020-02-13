import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../app/services/user.services';
import { GLOBAL } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck{
  public title: string;
  public identity;
  public url: string;
  public stats;

  constructor(
    private _route : ActivatedRoute, 
    private _router : Router,
    private _userService: UserService
  ){
    this.title = 'NGSOCIAL';
    this.url= GLOBAL.url;
  }

  ngOnInit(){ //se ejecuta siempre ante de cualquier componente

    this.identity = this._userService.getIdentity();
    //console.log("app.component.ts ngOnInit");
    //console.log(this.identity);
  }

  ngDoCheck(){ // detecta si ha ocurrido un cambio y se le da intruccion de actulizar varibles y refresca los componente

    this.identity = this._userService.getIdentity();
    this.stats = this._userService.getStats();
    //console.log("app.component.ts ngDoCheck");
    //console.log(this.identity);
    //console.log(this.stats);
  }

  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/']);
  }
}
