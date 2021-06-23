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
    return this.aus.user.pipe(map(user => {
      console.log('we came to here to check '+user)
      return !!user;

    }),tap(isAuth => {
      if(!isAuth){
          console.log('no login')
          this.router.navigate(['/login']);
      }
    }));
  }
}
