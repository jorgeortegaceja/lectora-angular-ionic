import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { JwtResponseInterface } from "../models/jwt-response";
import { UserInterface } from "../models/user";
import { from, Observable, BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";


@Injectable()
export class AuthService {
  AUTH_SERVER: string = "http://127.0.0.1:8000/";
  authSubject = new BehaviorSubject(false);

  private token: string;

  constructor(private httpClient: HttpClient) {}

  login(user: UserInterface): Observable<JwtResponseInterface> {
    return this.httpClient
      .post<JwtResponseInterface>(`${this.AUTH_SERVER}/api/login`, user)
      .pipe(
        tap((res: JwtResponseInterface) => {
          if (res) {
            // this.saveToken(accessToken, expiresIn)
            console.log(res);
          }
        })
      );
  }

  register(user: UserInterface): Observable<JwtResponseInterface> {
    return this.httpClient
      .post<JwtResponseInterface>(`${this.AUTH_SERVER}/api/register`, user)
      .pipe(
        tap((res: JwtResponseInterface) => {
          if (res) {
            // this.saveToken(accessToken, expiresIn)
            console.log(res);
          }
        })
      );
  }

  logout(): void {
    this.token = "";
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
  }

  private saveToken(token: string, expiresIn: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }

    return this.token;
  }
}
