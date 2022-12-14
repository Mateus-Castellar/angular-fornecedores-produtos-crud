import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { utilsBr } from 'js-brasil';
import { NgBrazilValidators } from 'ng-brazil';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, merge, Observable } from 'rxjs';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { StringUtils } from 'src/app/utils/string-utils';
import { CepConsulta } from '../models/endereco';
import { Fornecedor } from '../models/fornecedor';
import { FornecedorService } from '../services/fornecedor.service';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styles: [
  ]
})
export class NovoComponent implements OnInit
{

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  fornecedorForm: FormGroup;
  fornecedor: Fornecedor = new Fornecedor();

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};
  textoDocumento: string = "CPF (requerido)";

  formResult: string = '';

  MASKS = utilsBr.MASKS;
  mudancasNaoSalvas: boolean;

  constructor(private fb: FormBuilder,
    private fornecedorService: FornecedorService,
    private router: Router,
    private toastr: ToastrService)
  {

    this.validationMessages = {
      nome: {
        required: 'Informe o Nome',
      },
      documento: {
        required: 'Informe o Documento',
        cpf: 'CPF em formato inválido',
        cnpj: 'CNPJ em formato inválido',
      },
      logradouro: {
        required: 'Informe o Logradouro',
      },
      numero: {
        required: 'Informe o Número',
      },
      bairro: {
        required: 'Informe o Bairro',
      },
      cep: {
        required: 'Informe o CEP',
        cep: 'CEP em formato inválido',
      },
      cidade: {
        required: 'Informe a Cidade',
      },
      estado: {
        required: 'Informe o Estado',
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit()
  {
    this.fornecedorForm = this.fb.group({
      nome: ['', [Validators.required]],
      documento: ['', [Validators.required, NgBrazilValidators.cpf]],
      ativo: ['', [Validators.required]],
      tipoFornecedor: ['', [Validators.required]],

      //aninhando dados do forms para outro nó json
      endereco: this.fb.group({
        logradouro: ["", [Validators.required]],
        numero: ["", [Validators.required]],
        complemento: [""],
        bairro: ["", [Validators.required]],
        cep: ["", [Validators.required, NgBrazilValidators.cep]],
        cidade: ["", [Validators.required]],
        estado: ["", [Validators.required]],
      })
    });

    //ja preenche/marca um campo por padrão
    this.fornecedorForm.patchValue({ tipoFornecedor: '1', ativo: true });
  }

  configurarElementosValidacao()
  {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() =>
    {
      this.validarFormulario();
    });
  }

  validarFormulario()
  {
    this.displayMessage = this.genericValidator.processarMensagens(this.fornecedorForm);
    this.mudancasNaoSalvas = true;
  }

  ngAfterViewInit(): void
  {
    //quando o valor de PessoaFisica/PessoaJuridica alterar
    this.tipoFornecedorForm().valueChanges
      .subscribe(() =>
      {
        this.trocarValidacaoDocumento();
        this.configurarElementosValidacao();
        this.validarFormulario();
      })

    this.configurarElementosValidacao();
  }

  trocarValidacaoDocumento()
  {
    //1 => Pessoa Fisica
    //2 => Pessoa Juridica

    if (this.tipoFornecedorForm().value === "1")
    {
      this.tipoDocumentoForm().clearValidators();
      this.tipoDocumentoForm().setValidators([Validators.required, NgBrazilValidators.cpf]);
      this.textoDocumento = "CPF (requerido)";
    }
    else
    {
      this.tipoDocumentoForm().clearValidators();
      this.tipoDocumentoForm().setValidators([Validators.required, NgBrazilValidators.cnpj]);
      this.textoDocumento = "CNPJ (requerido)";
    }
  }

  tipoDocumentoForm(): AbstractControl
  {
    return this.fornecedorForm.get("documento");
  }

  tipoFornecedorForm(): AbstractControl
  {
    return this.fornecedorForm.get("tipoFornecedor");
  }

  preencherEnderecoConsulta(cep: CepConsulta)
  {
    this.fornecedorForm.patchValue({
      endereco: {
        logradouro: cep.logradouro,
        bairro: cep.bairro,
        cep: cep.cep,
        cidade: cep.localidade,
        estado: cep.uf,
      }
    })
  }

  buscaCep(cep: string)
  {
    cep = StringUtils.somenteNumeros(cep);
    if (cep.length < 8) return;

    this.fornecedorService.consultarCep(cep)
      .subscribe(
        cepRetorno => this.preencherEnderecoConsulta(cepRetorno),
        erro => this.errors.push(erro)
      );
  }

  adicionarFornecedor()
  {
    if (this.fornecedorForm.dirty && this.fornecedorForm.valid)
    {
      this.fornecedor = Object.assign({}, this.fornecedor, this.fornecedorForm.value);
      this.formResult = JSON.stringify(this.fornecedor);

      this.fornecedor.endereco.cep = StringUtils.somenteNumeros(this.fornecedor.endereco.cep);
      this.fornecedor.documento = StringUtils.somenteNumeros(this.fornecedor.documento);

      this.fornecedorService.novoFornecedor(this.fornecedor)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any)
  {
    this.fornecedorForm.reset();
    this.errors = [];

    let toast = this.toastr.success('Fornecedor cadastrado com sucesso!', 'Sucesso!');
    if (toast)
    {
      toast.onHidden.subscribe(() =>
      {
        this.router.navigate(['/fornecedores/listar-todos']);
      });
    }
  }

  processarFalha(fail: any)
  {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}
