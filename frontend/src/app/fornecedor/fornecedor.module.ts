import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TextMaskModule } from "angular2-text-mask";
import { NgBrazil } from "ng-brazil";
import { NgxSpinnerModule } from "ngx-spinner";
import { DetalhesComponent } from "./detalhes/detalhes.component";
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { FornecedorAppComponent } from "./fornecedor.app.component";
import { fornecedorRoutingModule } from "./fornecedor.router";
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { ListaProdutosComponent } from "./produtos/lista-produtos.component";
import { FornecedorGuard } from "./services/fornecedor.guard";
import { FornecedorResolve } from "./services/fornecedor.resolve";
import { FornecedorService } from "./services/fornecedor.service";

@NgModule({
  declarations: [
    FornecedorAppComponent,
    ListaComponent,
    DetalhesComponent,
    EditarComponent,
    ExcluirComponent,
    NovoComponent,
    ListaProdutosComponent,
  ],
  imports: [
    fornecedorRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgBrazil,
    TextMaskModule,
    NgxSpinnerModule,
  ],
  providers: [
    FornecedorService,
    FornecedorResolve,
    FornecedorGuard,
  ],
})

export class FornecedorModule { };