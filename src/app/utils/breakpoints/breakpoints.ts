import { BreakpointObserver, Breakpoints as CdkBreakpoints } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Breakpoints {
  private breakpointObserver = inject(BreakpointObserver);

  readonly isHandset = toSignal(this.breakpointObserver.observe(CdkBreakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay(),
  ));
}
