import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from '@narik/custom-validators';
import { ToastrService } from 'ngx-toastr';
import { FormBaseComponent } from 'src/app/base-components/form-base.components';
import { Usuario } from '../models/usuario';
import { ContaService } from '../services/conta.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})

export class LoginComponent extends FormBaseComponent implements OnInit
{

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  returnUrl: string;

  errors: any[] = [];
  loginForm: FormGroup;
  usuario: Usuario;

  constructor(private fb: FormBuilder, private contaService: ContaService, private router: Router,
    private toastrService: ToastrService, private route: ActivatedRoute)
  {

    super();

    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido'
      },
      password: {
        required: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres'
      },
    };

    this.returnUrl = this.route.snapshot.queryParams["returnUrl"];
    super.configurarMensagensValidacaoBase(this.validationMessages);
  }

  ngOnInit(): void
  {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, CustomValidators.rangeLength([6, 15])]],
    })
  }

  ngAfterViewInit(): void
  {
    super.configurarValidacaoFormularioBase(this.formInputElements, this.loginForm);
  }

  login()
  {
    if (this.loginForm.dirty && this.loginForm.valid)
    {
      this.usuario = Object.assign({}, this.usuario, this.loginForm.value);
      this.contaService.login(this.usuario)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarfalha(falha) },
        );
    }
  }

  processarSucesso(response: any)
  {
    this.loginForm.reset();
    this.errors = [];

    this.contaService.localStorage.salvarDadosLocaisUsuario(response);
    let toast = this.toastrService.success("login realizado com sucesso", "Bem Vindo :)")

    if (toast)
    {
      toast.onHidden.subscribe(() =>
      {
        this.returnUrl ?
          this.router.navigate([this.returnUrl]) :
          this.router.navigate(["/home"]);
      });
    }
  }


  processarfalha(fail: any)
  {
    this.errors = fail.error.errors;
    this.toastrService.error("ocorreu um erro", "opa :(");
  }

}