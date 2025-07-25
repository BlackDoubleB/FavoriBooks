import { CanActivateFn, Router } from "@angular/router"
import { AuthStateService } from "../features/services/auth/auth-state.service";
import { inject } from "@angular/core";
import { map } from "rxjs";

export const privateGuard = (): CanActivateFn => {
    return () =>{
        const router = inject(Router);
        const authState = inject(AuthStateService);
        return authState.authState$.pipe(
            map((state)=>{
                if(!state){
                    router.navigateByUrl('/auth/sign-in');
                    return false;
                }
                return true;
            })
        )
    }
}

export const publicGuard = (): CanActivateFn => {
    return () =>{
        const router = inject(Router);
        const authState = inject(AuthStateService);
        return authState.authState$.pipe(
            map((state)=>{
                if(state){
                    router.navigateByUrl('/home');
                    return false;
                }
                return true;
            })
        )
    }
}