import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable } from "rxjs";
import { BaseService } from "src/app/services/base.service";
import { Usuario } from "../models/usuario";

@Injectable()
export class ContaService extends BaseService
{

  constructor(private http: HttpClient)
  {
    super();
  }

  registrarUsuario(usuario: Usuario): Observable<Usuario>
  {
    let response = this.http.post(this.urlServiceV1 + "nova-conta", usuario, this.obterHeaderJson())
      .pipe(
        map(this.extractData),
        catchError(this.serviceError),
      );

    return response;
  }

  login(usuario: Usuario): Observable<Usuario>
  {
    let response = this.http.post(this.urlServiceV1 + "login", usuario, this.obterHeaderJson())
      .pipe(
        map(this.extractData),
        catchError(this.serviceError),
      );

    return response;
  }
}