import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { LocalStorageUtils } from "src/app/utils/local-storage";

@Injectable()
export class FornecedorGuard implements CanActivate
{

  constructor(private router: Router) { }

  localStorage = new LocalStorageUtils();

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  {

    if (!this.localStorage.obterTokenUsuario())
    {
      this.navegarAcessoNegado();
    }

    let user = this.localStorage.obterUsuario();
    let claim: any = route.data[0];

    if (claim !== undefined)
    {

      //verificar se "a rota/tela" necessita de claims especificas para acessa-lá
      let claim = route.data[0]["claim"];

      if (claim)
      {
        if (!user.claims)
        {
          this.navegarAcessoNegado();
        }

        let userClaims = user.claims.find(lbda => lbda.type === claim.nome);

        if (!userClaims)
        {
          this.navegarAcessoNegado();
        }

        let valoresClaim = userClaims.value as string;

        if (!valoresClaim.includes(claim.valor))
        {
          this.navegarAcessoNegado();
        }
      }
    }

    return true;
  }

  navegarAcessoNegado()
  {
    this.router.navigate(["/acesso-negado"]);
  }

}