import { ApplicationConfig, EnvironmentProviders, makeEnvironmentProviders, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { RefreshInterceptor } from './infra/interceptor/refresh';
import { AuthInterceptor } from './infra/interceptor/auth';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const provideMaterialConfig = (): EnvironmentProviders => {
  return makeEnvironmentProviders([
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
  ]);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([RefreshInterceptor, AuthInterceptor])),
    provideMaterialConfig(),
    provideAnimationsAsync(),
  ]
};
