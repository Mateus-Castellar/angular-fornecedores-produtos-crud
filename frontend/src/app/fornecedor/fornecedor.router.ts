import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FornecedorAppComponent } from "./fornecedor.app.component";
import { ListaComponent } from "./lista/lista.component";

const fornecedorRouterConfig: Routes = [
  {
    path: "", component: FornecedorAppComponent,
    children: [
      { path: "listar-todos", component: ListaComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(fornecedorRouterConfig),
  ],
  exports: [RouterModule],
})

export class fornecedorRoutingModule { };