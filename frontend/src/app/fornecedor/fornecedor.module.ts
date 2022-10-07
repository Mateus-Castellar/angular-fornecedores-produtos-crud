import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TextMaskModule } from "angular2-text-mask";
import { NgBrazil } from "ng-brazil";
import { DetalhesComponent } from "./detalhes/detalhes.component";
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { FornecedorAppComponent } from "./fornecedor.app.component";
import { fornecedorRoutingModule } from "./fornecedor.router";
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
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
  ],
  imports: [
    fornecedorRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgBrazil,
    TextMaskModule,
  ],
  providers: [
    FornecedorService,
    FornecedorResolve,
  ],
})

export class FornecedorModule { };