import { Component, inject } from '@angular/core';
import { Toolbar } from "../toolbar/toolbar";
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthHttpRepo } from '../../../data/repository/auth/auth-http-repo';
import { AuthRepo } from '../../../domain/auth/repository';
import { Command } from '../../../utils/command';
import { NgTemplateOutlet } from '@angular/common';
import { Breakpoints } from '../../../utils/breakpoints/breakpoints';

interface Route {
  path: string;
  title: string;
  icon: string;
}

@Component({
  selector: 'app-logged',
  imports: [
    Toolbar, 
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    NgTemplateOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './logged.html',
  styleUrl: './logged.scss'
})
export class Logged {
  private authRepo = inject<AuthRepo>(AuthHttpRepo);
  private router = inject(Router);

  readonly isHandset = inject(Breakpoints).isHandset;

  readonly routes: Route[] = [
    {
      title: "Dashboard",
      path: "dashboard",
      icon: "dashboard",
    },
    {
      title: "Exams",
      path: "/exams",
      icon: "assignment",
    },
  ];

  readonly logOutCommand = new Command(() => this.logOut());
  
  private async logOut() {
    const result = await this.authRepo.logOut();
    if (result.isSuccess()) {
      this.router.navigate(["login"]);
    } 

    return result;
  }
}
