import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DetalhesComponent } from "./detalhes/detalhes.component";
import { EditarComponent } from './editar/editar.component';
import { FornecedorAppComponent } from "./fornecedor.app.component";
import { fornecedorRoutingModule } from "./fornecedor.router";
import { ListaComponent } from './lista/lista.component';
import { FornecedorService } from "./services/fornecedor.service";
import { ExcluirComponent } from './excluir/excluir.component';
import { NovoComponent } from './novo/novo.component';

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
  ],
  providers: [
    FornecedorService,
  ],
})

export class FornecedorModule { };