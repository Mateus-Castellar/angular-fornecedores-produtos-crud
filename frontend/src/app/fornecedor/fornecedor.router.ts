import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DetalhesComponent } from "./detalhes/detalhes.component";
import { EditarComponent } from "./editar/editar.component";
import { ExcluirComponent } from "./excluir/excluir.component";
import { FornecedorAppComponent } from "./fornecedor.app.component";
import { ListaComponent } from "./lista/lista.component";
import { NovoComponent } from "./novo/novo.component";
import { FornecedorGuard } from "./services/fornecedor.guard";
import { FornecedorResolve } from "./services/fornecedor.resolve";

const fornecedorRouterConfig: Routes = [
  {
    path: "", component: FornecedorAppComponent,
    children: [
      { path: "listar-todos", component: ListaComponent },
      {
        path: "adicionar-novo",
        component: NovoComponent,
        canActivate: [FornecedorGuard],
        data: [{ claim: { nome: "Fornecedor", valor: "Adicionar" } }],
      },
      {
        path: "editar/:id",
        component: EditarComponent,
        canActivate: [FornecedorGuard],
        data: [{ claim: { nome: "Fornecedor", valor: "Atualizar" } }],
        resolve: { fornecedor: FornecedorResolve }
      },
      {
        path: "excluir/:id",
        component: ExcluirComponent,
        canActivate: [FornecedorGuard],
        data: [{ claim: { nome: "Fornecedor", valor: "Excluir" } }],
        resolve: { fornecedor: FornecedorResolve }
      },
      { path: "detalhes/:id", component: DetalhesComponent, resolve: { fornecedor: FornecedorResolve } },
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