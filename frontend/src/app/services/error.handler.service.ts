import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { LocalStorageUtils } from "../utils/local-storage";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor
{

  constructor(private router: Router) { }

  localStorage = new LocalStorageUtils();

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    return next.handle(req).pipe(
      catchError(error =>
      {
        if (error instanceof HttpErrorResponse)
        {
          if (error.status === 401)
          {
            this.localStorage.limparDadosLocaisUsuario();
            this.router.navigate(["/conta/login"]);
          }
          if (error.status === 403)
          {
            this.router.navigate(["/acesso-negado"]);
          }
        }

        return throwError(error);
      }));
  }
}