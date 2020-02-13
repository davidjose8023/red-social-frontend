import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user.model';
import { Follow } from '../../models/follow.model';
import { UserService } from '../../services/user.services';
import { FollowService } from '../../services/follow.services';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  providers: [UserService, FollowService]
})
export class ProfileComponent implements OnInit {

  public title: string ;
  public status: string;
  public identity;
  public token;
  public url: string;
  public user: User;
  public stats;

  constructor( 
    private _route : ActivatedRoute, 
    private _router : Router,
    private _userService: UserService,
    private _followService: FollowService
    ){
    this.title = 'Profile';
    this.url= GLOBAL.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

  
}

  ngOnInit() {
    console.log("componente Profile");
    this.loadPage();
    
  }

  loadPage = async () => {
    this._route.params.subscribe(params =>{
      let id = params['id'];
      this.getUser(id);
      this.stats = this.getCounters(id);
      console.log("counterr");
      console.log(this.stats );
    })
  }

  getUser(id){

    this._userService.getUser(id).subscribe(

      response => {
        if(response.user){
          this.user= response.user;
        }else{
          this.status = "error";
        }
      },
      error => {
        console.log(<any>error);
        this._router.navigate(['/profile', this.identity._id]);
      }

    );

  }


  getCounters = async (id) => {
 
    let response = await this._userService.getCounters(id).toPromise().then((response) => {
            
        return response;
    });
    console.log(response);
    return response;
    
 
    
}

}
