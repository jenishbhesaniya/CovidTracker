import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { map , tap} from "rxjs/operators";
import { AuthService } from "./auth.service";
@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate {
  constructor(private aus:AuthService,private router:Router){
    console.log('we came to here to check ');

  }
  canActivate(route:ActivatedRouteSnapshot,router:RouterStateSnapshot): boolean | Promise<boolean>| Observable<boolean>{
    if(this.aus.gettoken()){
      console.log(this.aus.gettoken())
      return true;
    }
    this.router.navigate(['VaccineLogin']);
    return false;
  }
}
