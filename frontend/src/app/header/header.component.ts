import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {User} from "../models/user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user: User;

  constructor(
    private authService: AuthService
  ) {
    this.user = this.authService.getUser();
  }

  ngOnInit(): void {
  }

}
