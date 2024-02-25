import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}
  data: any = { user: '', pass: '' };
  login(d: any) {
    if (d.pass != '' && d.pass != '' && d.user === d.pass) {
      localStorage.setItem('url', d.user);
      this.router.navigate(['/index', {}]);
    }
  }
  ngOnInit(): void {}
}
