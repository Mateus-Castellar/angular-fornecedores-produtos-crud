import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { BaseGuard } from "src/app/services/base.guard";
import { NovoComponent } from "../novo/novo.component";

@Injectable()
export class FornecedorGuard extends BaseGuard implements CanActivate
{

  constructor(protected rota: Router) 
  {
    super(rota);
  }

  canDeactivate(component: NovoComponent)
  {
    if (component.mudancasNaoSalvas)
    {
      return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulario?');
    }

    return true
  }

  canActivate(routeAc: ActivatedRouteSnapshot)
  {
    return super.validarClaims(routeAc);
  }
}