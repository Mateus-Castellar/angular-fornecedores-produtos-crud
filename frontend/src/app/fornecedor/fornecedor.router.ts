import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const fornecedorRouterConfig: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild(fornecedorRouterConfig),
  ],
  exports: [RouterModule],
})

export class fornecedorRoutingModule { };