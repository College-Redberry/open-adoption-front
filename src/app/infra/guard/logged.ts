import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthHttpRepo } from "../../data/repository/auth/auth-http-repo";
import { AuthRepo } from "../../domain/auth/repository";

export const authenticationGuard = (): CanActivateFn => {
  return () => {
    const authRepo = inject<AuthRepo>(AuthHttpRepo);
    const router = inject(Router);

    if (!authRepo.token()) {
      router.navigate(["login"]);
      
      return false;
    }

    return true;
  };
}