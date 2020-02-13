import { Injectable } from '@angular/core';
import { Router, ActivatedRoute,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.services';


@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(
    private _route : ActivatedRoute,
    private _router : Router,
    private _userService: UserService
  ){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      let identity = this._userService.getIdentity();
      if(identity && (identity.role == "ROLE_USER" || identity.role == "ROLE_ADMIN")){

        return true;
      }else{
        this._router.navigate(['/login']);
        return false;
      }
  }
  
}
