import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable } from "rxjs";
import { BaseService } from "src/app/services/base.service";
import { CepConsulta } from "../models/endereco";
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
    return this.http
      .get<Fornecedor>(this.urlServiceV1 + "fornecedores/" + id, this.obterAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  novoFornecedor(fornecedor: Fornecedor): Observable<Fornecedor>
  {
    return this.http.post(this.urlServiceV1 + "fornecedores", fornecedor, this.obterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError));
  }

  atualizarFornecedor(fornecedor: Fornecedor): Observable<Fornecedor>
  {
    return this.http
      .put(this.urlServiceV1 + "fornecedores/" + fornecedor.id, fornecedor, this.obterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError));
  }

  excluirFornecedor(id: string): Observable<Fornecedor>
  {
    return new Observable<Fornecedor>();
  }

  consultarCep(cep: string): Observable<CepConsulta>
  {
    return this.http.get<CepConsulta>(`https://viacep.com.br/ws/${cep}/json/`)
      .pipe(catchError(super.serviceError));
  }
}