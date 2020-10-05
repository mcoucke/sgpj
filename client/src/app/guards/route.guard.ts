import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { TaskUtils } from 'src/app/utils/task.utils';
@Injectable({
    providedIn: 'root'
})
export class RouteGuard implements CanActivate {
    
    canActivate(activatedRoute: ActivatedRouteSnapshot): boolean {
        return TaskUtils.isDateRouteParameterValid(activatedRoute.params['date']);
    }
}