import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FornecedorAppComponent } from "./fornecedor.app.component";
import { fornecedorRoutingModule } from "./fornecedor.router";
import { ListaComponent } from './lista/lista.component';
import { FornecedorService } from "./services/fornecedor.service";

@NgModule({
  declarations: [
    FornecedorAppComponent,
    ListaComponent,
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