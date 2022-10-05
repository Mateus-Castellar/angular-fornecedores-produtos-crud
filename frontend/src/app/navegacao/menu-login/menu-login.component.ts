import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageUtils } from "src/app/utils/local-storage";


@Component({
  selector: "app-menu-login",
  templateUrl: "./menu-login.component.html"
})

export class MenuLoginComponent
{
  token: String = "";
  user: any;
  email: String = "";
  localStorageUtil = new LocalStorageUtils();

  constructor(private router: Router) { }

  usuarioLogado(): Boolean
  {
    this.token = this.localStorageUtil.obterTokenUsuario();
    this.user = this.localStorageUtil.obterUsuario();

    if (this.user)
      this.email = this.user.email;

    return this.token !== null;
  }

  logout()
  {
    this.localStorageUtil.limparDadosLocaisUsuario();
    this.router.navigate(["/home"]);
  }
} 