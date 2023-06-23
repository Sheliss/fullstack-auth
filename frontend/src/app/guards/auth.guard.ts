import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const isUserLoggedInGuard = () => {
    const router = inject(Router);
    const userService = inject(UserService);

    let isLoggedIn: boolean = userService.getUser().isLogged;
    
    return isLoggedIn && isLoggedIn ? '' : router.navigate(['login'])

}