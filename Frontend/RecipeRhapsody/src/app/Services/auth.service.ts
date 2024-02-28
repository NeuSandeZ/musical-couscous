import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { User } from '../Models/user';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null!);
  private tokenExpirationTimer: any;

  constructor(
    private readonly _httpClient: HttpClient,
    @Inject('BASE_URL') public baseUrl: string
  ) {}

  signUp(email: string, password: string) {
    return this._httpClient
      .post(this.baseUrl + '/register', {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(catchError(this.handleError));
  }

  autoLogin() {
    const userDataString = localStorage.getItem('userData');
    if (!userDataString) {
      return;
    }
    const userData: {
      tokenType: string;
      accessToken: string;
      expiresIn: string;
      refreshToken: string;
    } = JSON.parse(userDataString);

    const loadedUser = new User(
      userData.tokenType,
      userData.accessToken,
      new Date(userData.expiresIn),
      userData.refreshToken
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);

      const expirationDuration =
        new Date(userData.expiresIn).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  login(email: string, password: string) {
    return this._httpClient
      .post<{
        tokenType: string;
        accessToken: string;
        expiresIn: number;
        refreshToken: string;
      }>(this.baseUrl + '/login', {
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
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    tokenType: string,
    accessToken: string,
    expiresIn: number,
    refreshToken: string
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const applicationUser = new User(
      tokenType,
      accessToken,
      expirationDate,
      refreshToken
    );

    this.user.next(applicationUser);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(applicationUser));
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
