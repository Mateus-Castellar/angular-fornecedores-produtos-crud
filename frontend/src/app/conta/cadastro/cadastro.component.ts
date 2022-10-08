import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from '@narik/custom-validators';
import { ToastrService } from 'ngx-toastr';
import { FormBaseComponent } from 'src/app/base-components/form-base.components';
import { Usuario } from '../models/usuario';
import { ContaService } from '../services/conta.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
})
export class CadastroComponent extends FormBaseComponent implements OnInit, AfterViewInit
{
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  cadastroForm: FormGroup;
  usuario: Usuario;

  constructor(private fb: FormBuilder, private contaService: ContaService, private router: Router,
    private toastrService: ToastrService)
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
      confirmPassword: {
        required: 'Informe a senha novamente',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
        equalTo: 'As senhas não conferem'
      }
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);
  }

  ngOnInit(): void
  {
    let senha = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15])]);
    let senhaConfirm = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15]), CustomValidators.equalTo(senha)]);

    this.cadastroForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: senha,
      confirmPassword: senhaConfirm,
    })
  }

  ngAfterViewInit(): void
  {
    super.configurarValidacaoFormularioBase(this.formInputElements, this.cadastroForm);
  }

  adicionarConta()
  {
    if (this.cadastroForm.dirty && this.cadastroForm.valid)
    {
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);
      this.contaService.registrarUsuario(this.usuario)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarfalha(falha) },
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any)
  {
    this.cadastroForm.reset();
    this.errors = [];

    this.contaService.localStorage.salvarDadosLocaisUsuario(response);
    let toast = this.toastrService.success("registro realizado com sucesso", "Bem Vindo :)")

    if (toast)
    {
      toast.onHidden.subscribe(() =>
      {
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
