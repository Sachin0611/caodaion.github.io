import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../services/auth/auth.service";
import {Observable} from "rxjs";

@Injectable()
export class AssessGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const find = (array: any, key: any) => {
      let result: any;
      array.some((o: any) => result = o.key === key ? o : find(o.children || [], key));
      return result;
    }
    // @ts-ignore
    let path = state.url.slice(1, state.url.length)?.split('?')[0]?.replaceAll('/', '.')
    if (find(this.authService.currentUser?.children, path)) {
      return true
    }
    this.router.navigate([`/${state.url.split('/')[1]}`]);
    return false
  }
}
