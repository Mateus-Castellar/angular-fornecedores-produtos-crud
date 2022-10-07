import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Produto } from '../models/produto';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit
{

  imagens: string = environment.imagensUrl;

  public produtos: Produto[];
  errorMessage: string;

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void
  {
    this.produtoService.obterTodos()
      .subscribe(
        produtos => this.produtos = produtos,
        error => this.errorMessage);
  }
}
