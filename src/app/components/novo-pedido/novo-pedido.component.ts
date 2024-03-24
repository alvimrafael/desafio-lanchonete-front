import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/models/produto/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { AdicionarProdutoDto } from 'src/app/models/adicionar-produto-dto/adicionar-produto-dto.model';
import { ProdutoQuantidadeDto } from 'src/app/models/produto-quantidade-dto/produto-quantidade-dto.model';

@Component({
  selector: 'app-novo-pedido',
  templateUrl: './novo-pedido.component.html',
  styleUrls: ['./novo-pedido.component.scss']
})
export class NovoPedidoComponent implements OnInit {

  produtos: Produto[] = [];
  idPedido: number | undefined;
  mostrarBotaoFecharPedido: boolean = false;
  valorTotalPedido: number = 0;
  valorPago?: number;

  constructor(private router: Router, private produtoService: ProdutoService, private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.listarProdutos();
    this.criarNovoPedido();
  }

  listarProdutos(): void {
    this.produtoService.listarProdutos().subscribe(
      produtos => {
        this.produtos = produtos;
      },
      error => {
        console.error('Erro ao listar produtos:', error);
      }
    );
  }

  criarNovoPedido(): void {
    this.pedidoService.criarPedido().subscribe(
      pedido => {
        this.idPedido = pedido.id;
      },
      error => {
        console.error('Erro ao criar novo pedido:', error);
      }
    );
  }

  adicionarProduto(idProduto: number, quantidade: number): void {
    if (idProduto !== undefined && this.idPedido) {
      const adicionarProdutoDTO: AdicionarProdutoDto = { idProduto, quantidade };
      this.pedidoService.adicionarProduto(this.idPedido, adicionarProdutoDTO).subscribe(
        pedido => {
          console.log('Produto adicionado com sucesso:', pedido);
          this.produtos.forEach(produto => {
            if (produto.id === idProduto) {
              produto.quantidade = 0;
            }
          });
          this.calcularTotalPedido();
          this.mostrarBotaoFecharPedido = true;
        },
        error => {
          console.error('Erro ao adicionar produto ao pedido:', error);
        }
      );
    } else {
      console.error('ID do pedido não definido.');
    }
  }

  calcularTotalPedido(): void {
    if (this.idPedido) {
      this.pedidoService.calcularPrecoTotal(this.idPedido).subscribe(
        total => {
          this.valorTotalPedido = total;
        },
        error => {
          console.error('Erro ao calcular preço total do pedido:', error);
        }
      );
    } else {
      console.error('ID do pedido não definido.');
    }
  }

  abrirDetalhesPedido(): void {
    if (this.idPedido !== undefined) {
      this.router.navigate(['/detalhes-pedido', this.idPedido]);
    } else {
      console.error('ID do pedido não definido.');
    }
  }

  retirarProduto(idProduto: number): void {
    if (idProduto !== undefined && this.idPedido) {
      const produtoQuantidadeDTO: ProdutoQuantidadeDto = { idProduto, quantidade: 1 };
      this.pedidoService.retirarProduto(this.idPedido, produtoQuantidadeDTO).subscribe(
        pedido => {
          console.log('Produto removido com sucesso:', pedido);
          // Atualizar a lista de produtos no pedido, se necessário
        },
        error => {
          console.error('Erro ao retirar produto do pedido:', error);
        }
      );
    } else {
      console.error('ID do pedido não definido.');
    }
  }

  // fecharPedido(valorPago: number): void {
  //   if (this.idPedido) {
  //     const fecharPedidoDTO: FecharPedidoDto = { valorPago };
  //   this.pedidoService.fecharPedido(this.idPedido, fecharPedidoDTO).subscribe(
  //     fechamento => {
  //       console.log('Pedido fechado com sucesso:', fechamento);
  //       // Redirecionar para a página de compra feita
  //     },
  //     error => {
  //       console.error('Erro ao fechar pedido:', error);
  //     }
  //   );
  // } else {
  //   console.error('ID do pedido não definido.');
  // }
}
