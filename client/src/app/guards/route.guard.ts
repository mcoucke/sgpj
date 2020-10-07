import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { TaskUtils } from 'src/app/utils/task.utils';
@Injectable({
    providedIn: 'root'
})
export class RouteGuard implements CanActivate {

    constructor(private _router: Router) {}
    
    canActivate(activatedRoute: ActivatedRouteSnapshot): boolean {
        if (!TaskUtils.isDateRouteParameterValid(activatedRoute.params['date'])) {
            this._router.navigateByUrl('/404');
            return false;
        } else {
            return true;
        }
    }
}