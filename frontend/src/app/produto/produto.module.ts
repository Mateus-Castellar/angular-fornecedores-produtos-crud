import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';
import { NgBrazil } from 'ng-brazil';
import { NgxSpinnerModule } from "ngx-spinner";

import { DetalhesComponent } from './detalhes/detalhes.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { ProdutoAppComponent } from './produto.app.component';
import { ProdutoRoutingModule } from './produto.route';
import { ProdutoGuard } from './services/produto.guard';
import { ProdutoResolve } from './services/produto.resolve';
import { ProdutoService } from './services/produto.service';

@NgModule({
  declarations: [
    ProdutoAppComponent,
    ListaComponent,
    NovoComponent,
    EditarComponent,
    ExcluirComponent,
    DetalhesComponent
  ],
  imports: [
    CommonModule,
    ProdutoRoutingModule,
    NgBrazil,
    TextMaskModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ProdutoService,
    ProdutoResolve,
    ProdutoGuard
  ]
})
export class ProdutoModule { }
