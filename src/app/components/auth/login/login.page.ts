import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validator,
  Validators
} from '@angular/forms';

import { UserInterface } from './../../../models/user';
import { JwtResponseInterface } from '../../../models/jwt-response';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  error_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'minlength', message: 'Email length must be longer or equal than 6 caracters' },
      { type: 'maxlength', message: 'Email length must be lower or equal than 60 caracters' },
      { type: 'pattern', message: 'Please enter a valid email address' }
    ],
    'password':[
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password length must be longer or equal than 8 caracters' },
      { type: 'maxlength', message: 'Password length must be lower or equal than 60 caracters' }
      
    ]
  }


  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
    ) {
    this.loginForm = this.formBuilder.group({
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(60)
        ])
      ),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(60),
          Validators.pattern(
            '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]+.[a-zA-Z0-9_.+-]+$'
          )
        ])
      )
    });
  }

  ngOnInit() {
  }
  onLogin(): void{
    console.log('email', this.loginForm.value.email);
    console.log('password', this.loginForm.value.password);
    this.authService.login(this.loginForm.value).subscribe(
      res => {
        this.router.navigateByUrl('/register');
      },
      err => {
        console.log(err);
      }
    );
  }
}
