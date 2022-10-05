import { NgModule } from "@angular/core";
import { FornecedorAppComponent } from "./fornecedor.app.component";
import { fornecedorRoutingModule } from "./fornecedor.router";

@NgModule({
  declarations: [
    FornecedorAppComponent,
  ],
  imports: [
    fornecedorRoutingModule,
  ],
  providers: [],
})

export class FornecedorModule { };