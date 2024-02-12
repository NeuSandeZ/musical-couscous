import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/user';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  baseUrl: string = 'http://localhost:5162';
  user = new BehaviorSubject<User>(null!);

  constructor(private readonly _httpClient: HttpClient) {}

  signUp(email: string, password: string) {
    return this._httpClient
      .post(this.baseUrl + '/register', {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(catchError(this.handleError));
  }

  login(email: string, password: string) {
    return this._httpClient
      .post<User>(this.baseUrl + '/login', {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        tap((resData) => {
          this.handleAuthentication(
            resData.tokenType,
            resData.accessToken,
            resData.expiresIn,
            resData.refreshToken
          );
        }),
        catchError(this.handleError)
      );
  }

  logout() {
    this._httpClient.post(this.baseUrl + '/account/logout', {}).subscribe();
    this.user.next(null!);
  }

  private handleAuthentication(
    tokenType: string,
    accessToken: string,
    expiresIn: number,
    refreshToken: string
  ) {
    const applicationUser = new User(
      tokenType,
      accessToken,
      expiresIn,
      refreshToken
    );
    this.user.next(applicationUser);
  }

  private handleError(errorRes: HttpErrorResponse) {
    console.log('errorRes :>> ', errorRes);
    let errorMessage = 'Error occured!';

    //TODO better error handling and maybe display errors in toast?
    // if (errorRes.status != null) {
    //   switch (+errorRes.status) {
    //     case 401:
    //       errorMessage = 'Incorret password or login!';
    //       break;
    //     case 500:
    //       errorMessage = 'Incorrect password or login!';
    //   }
    // } else if (errorRes.error.errors != null) {
    //   switch(errorRes.error.errors) {
    //   }
    // } else {
    //   return throwError(() => errorMessage);
    // }

    if (!errorRes.error) {
      return throwError(() => errorMessage);
    }

    switch (+errorRes.status) {
      case 401:
        errorMessage = 'Incorret password or login!';
        break;
      case 500:
        errorMessage = 'Incorret password or login!';
        break;
      case 400:
        errorMessage = 'Invalid data!';
    }
    return throwError(() => errorMessage);
  }
}
