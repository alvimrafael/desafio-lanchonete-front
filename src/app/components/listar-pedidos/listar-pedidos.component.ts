import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido.service';
import { Pedido } from 'src/app/models/pedido/pedido.model';
import { AdicionarProdutoDto } from 'src/app/models/adicionar-produto-dto/adicionar-produto-dto.model';

@Component({
  selector: 'app-listar-pedidos',
  templateUrl: './listar-pedidos.component.html',
  styleUrls: ['./listar-pedidos.component.scss']
})
export class ListarPedidosComponent implements OnInit {
  pedido: Pedido = {};
  adicionarProdutoDto: AdicionarProdutoDto = {};

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    // this.listarPedidos();
    this.criarNovoPedido();
  }

  // listarPedidos() {
  //   this.pedidoService.listarPedidos().subscribe(
  //     (response: Pedido[]) => {
  //       this.pedidos = response;
  //     },
  //     (error) => {
  //       console.error('Erro ao listar pedidos:', error);
  //     }
  //   );
  // }

  criarNovoPedido() {
    this.pedidoService.criarPedido().subscribe(
      (response: Pedido) => {
        this.pedido = response;
      },
      (error) => {
        console.error('Erro ao criar pedido:', error);
      }
    );
  }

  adicionarProduto() {
    const idPedido = this.pedido.id || 0; // Verifica se o ID do pedido está definido
    this.pedidoService.adicionarProduto(idPedido, this.adicionarProdutoDto).subscribe(
      (response: Pedido) => {
        this.pedido = response;
        // Limpa o objeto AdicionarProdutoDto após adicionar o produto
        this.adicionarProdutoDto = {};
      },
      (error) => {
        console.error('Erro ao adicionar produto ao pedido:', error);
      }
    );
  }

}
