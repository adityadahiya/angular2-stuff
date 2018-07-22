import { Injectable } from '@angular/core';
import { CanActivate, Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service'

@Injectable()
export class AuthGuard implements CanActivate, Resolve<any> {

	constructor(
		private auth: AuthService,
		private router: Router
	){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

  	if(!this.auth.isLoggedIn){
  		this.router.navigate(['auth/login']);
  		return false;
  	}
    return true
  }

  resolve(): void {
    if (this.auth.isLoggedIn) this.router.navigate(['guidelines'])
  }
}
