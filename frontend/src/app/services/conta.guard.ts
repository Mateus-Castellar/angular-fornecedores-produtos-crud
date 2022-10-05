import { Injectable } from "@angular/core";
import { CanActivate, CanDeactivate, Router } from "@angular/router";
import { CadastroComponent } from "../conta/cadastro/cadastro.component";
import { LocalStorageUtils } from "../utils/local-storage";

@Injectable()
export class ContaGuard implements CanDeactivate<CadastroComponent>, CanActivate
{

  localStorageUtils = new LocalStorageUtils();

  constructor(private router: Router) { }

  canDeactivate(component: CadastroComponent)
  {
    if (component.mudancasNaoSalvas)
    {
      return window.confirm("tem certeza que deseja sair do preenchimento do formulário ?")
    }

    return true;
  }

  canActivate()
  {
    if (this.localStorageUtils.obterTokenUsuario())
    {
      this.router.navigate(["/home"]);
    }

    return true;
  }

}