import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class GenericService<T> {
  constructor(private http: HttpClient, public dialog: MatDialog) {}

  private generateHeaders = (token: string) => {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    };
  };

  // LOGIN
  LoginCall(url: string, item: T): Observable<T> {
    return this.http
      .post<T>(url, item, {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      })
      .pipe(
        retry(1),
        catchError((error) => throwError(() => error))
      );
  }

  //-------------GENERIC API--------------//
  // FETCH
  getGeneric(token: string, url: string, queryString: string): Observable<T> {
    return this.http
      .get<T>(url + queryString, this.generateHeaders(token))
      .pipe(
        retry(1),
        catchError((error) => throwError(() => error))
      );
  }

  // CREATE
  createGeneric(token: string, url: string, item: T): Observable<T> {
    return this.http.post<T>(url, item, this.generateHeaders(token)).pipe(
      retry(1),
      catchError((error) => throwError(() => error))
    );
  }

  //PUT
  updateGeneric(token: string, url: string, item: T): Observable<T> {
    if (item == null)
      return this.http.put<T>(url, this.generateHeaders(token)).pipe(
        retry(1),
        catchError((error) => throwError(() => error))
      );

    return this.http.put<T>(url, item, this.generateHeaders(token)).pipe(
      retry(1),
      catchError((error) => throwError(() => error))
    );
  }

  //DELETE
  removeGeneric(token: string, url: string): Observable<T> {
    return this.http.delete<T>(url, this.generateHeaders(token)).pipe(
      retry(1),
      catchError((error) => throwError(() => error))
    );
  }
}
