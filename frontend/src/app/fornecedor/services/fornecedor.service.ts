import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { BaseService } from "src/app/services/base.service";
import { Fornecedor } from "../models/fornecedor";

@Injectable()
export class FornecedorService extends BaseService
{

  fornecedor: Fornecedor = new Fornecedor();

  constructor(private http: HttpClient)
  {
    super();

    //dados mock
    this.fornecedor.nome = "Teste Fake"
    this.fornecedor.documento = "32165498754"
    this.fornecedor.ativo = true
    this.fornecedor.tipoFornecedor = 1
  }

  obterTodos(): Observable<Fornecedor[]>
  {
    return this.http
      .get<Fornecedor[]>(this.urlServiceV1 + "fornecedores")
      .pipe(catchError(super.serviceError));
  }

  obterPorId(id: string): Observable<Fornecedor>
  {
    return new Observable<Fornecedor>();
  }

  novoFornecedor(fornecedor: Fornecedor): Observable<Fornecedor>
  {
    return new Observable<Fornecedor>();
  }

  atualizarFornecedor(fornecedor: Fornecedor): Observable<Fornecedor>
  {
    return new Observable<Fornecedor>();
  }

  excluirFornecedor(id: string): Observable<Fornecedor>
  {
    return new Observable<Fornecedor>();
  }
}