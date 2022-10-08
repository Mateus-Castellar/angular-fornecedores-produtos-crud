import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { ToastrService } from 'ngx-toastr';


import { Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { CurrencyUtils } from 'src/app/utils/currency-utils';
import { ProdutoBaseComponent } from '../produto-form-base.component';
import { ProdutoService } from '../services/produto.service';


@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends ProdutoBaseComponent implements OnInit
{

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  //propriedades do componente de imagem
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWhitinAspectRatio = false;
  transform: ImageTransform = {};
  imagemURL: string;
  imagemNome: string;


  constructor(private fb: FormBuilder,
    private produtoService: ProdutoService,
    private router: Router,
    private toastr: ToastrService)
  {
    super();
  }

  ngOnInit(): void
  {

    this.produtoService.obterFornecedores()
      .subscribe(
        fornecedores => this.fornecedores = fornecedores);

    this.produtoForm = this.fb.group({
      fornecedorId: ['', [Validators.required]],
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      descricao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(1000)]],
      imagem: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      ativo: [true]
    });
  }

  ngAfterViewInit(): void
  {
    super.configurarValidacaoForm(this.formInputElements);
  }

  adicionarProduto()
  {
    if (this.produtoForm.dirty && this.produtoForm.valid)
    {
      this.produto = Object.assign({}, this.produto, this.produtoForm.value);

      this.produto.imagemUpload = this.croppedImage.split(',')[1];
      this.produto.imagem = this.imagemNome;
      this.produto.valor = CurrencyUtils.StringParaDecimal(this.produto.valor);

      this.produtoService.novoProduto(this.produto)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any)
  {
    this.produtoForm.reset();
    this.errors = [];

    let toast = this.toastr.success('Produto cadastrado com sucesso!', 'Sucesso!');
    if (toast)
    {
      toast.onHidden.subscribe(() =>
      {
        this.router.navigate(['/produtos/listar-todos']);
      });
    }
  }

  processarFalha(fail: any)
  {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  fileChangeEvent(event: any): void
  {
    this.imageChangedEvent = event;
    this.imagemNome = event.currentTarget.files[0].name;
  }

  imageCropped(event: ImageCroppedEvent)
  {
    this.croppedImage = event.base64;
  }

  imageLoad()
  {
    this.showCropper = true;
  }

  croppedReady(sourceImagemDimensions: Dimensions)
  {
    console.log("cropped read", sourceImagemDimensions);
  }

  loadImageFailed()
  {
    this.errors.push("o formato do arquivo " + this.imagemNome + " não é aceito");
  }
}