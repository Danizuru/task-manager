import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  constructor(private breakpointObserver: BreakpointObserver) { }

  isMobile(): Observable<boolean> {
    return this.breakpointObserver.observe([Breakpoints.Handset])
      .pipe(
        map((result: BreakpointState) => result.matches)
      );
  }

  getScreenSize(): Observable<string> {
    return this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ])
      .pipe(
        map((result: BreakpointState) => {
          if (result.breakpoints[Breakpoints.XSmall]) {
            return 'XSmall';
          } else if (result.breakpoints[Breakpoints.Small]) {
            return 'Small';
          } else if (result.breakpoints[Breakpoints.Medium]) {
            return 'Medium';
          } else if (result.breakpoints[Breakpoints.Large]) {
            return 'Large';
          } else if (result.breakpoints[Breakpoints.XLarge]) {
            return 'XLarge';
          } else {
            return 'Unknown';
          }
        })
      );
  }
}