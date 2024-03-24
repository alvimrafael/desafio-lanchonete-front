import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Pedido } from '../models/pedido/pedido.model';
import { AdicionarProdutoDto } from '../models/adicionar-produto-dto/adicionar-produto-dto.model';
import { ProdutoQuantidadeDto } from '../models/produto-quantidade-dto/produto-quantidade-dto.model';
import { FecharPedidoDto } from '../models/fechar-pedido-dto/fechar-pedido-dto.model';
import { FechamentoDto } from '../models/fechamento-dto/fechamento-dto.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiUrl = 'http://localhost:8080/api/pedidos';

  constructor(private http: HttpClient) { }

  criarPedido(): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.apiUrl}`, {}).pipe(
      catchError(error => {
        throw 'Erro ao criar pedido: ' + error;
      })
    );
  }

  adicionarProduto(idPedido: number, adicionarProdutoDTO: AdicionarProdutoDto): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.apiUrl}/${idPedido}/adicionar-produto`, adicionarProdutoDTO).pipe(
      catchError(error => {
        throw 'Erro ao adicionar produto ao pedido: ' + error;
      })
    );
  }

  retirarProduto(idPedido: number, produtoQuantidadeDTO: ProdutoQuantidadeDto): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.apiUrl}/${idPedido}/retirar-produto`, produtoQuantidadeDTO).pipe(
      catchError(error => {
        throw 'Erro ao retirar produto do pedido: ' + error;
      })
    );
  }

  calcularPrecoTotal(idPedido: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${idPedido}/calcular-preco-total`).pipe(
      catchError(error => {
        throw 'Erro ao calcular preço total do pedido: ' + error;
      })
    );
  }

  fecharPedido(idPedido: number, fecharPedidoDTO: FecharPedidoDto): Observable<FechamentoDto> {
    return this.http.post<FechamentoDto>(`${this.apiUrl}/${idPedido}/fechar`, fecharPedidoDTO).pipe(
      catchError(error => {
        throw 'Erro ao fechar pedido: ' + error;
      })
    );
  }

  calcularPrecoTotalPorLista(idPedido: number, produtosQuantidade: ProdutoQuantidadeDto[]): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/${idPedido}/calcular-preco-total-por-lista`, produtosQuantidade).pipe(
      catchError(error => {
        throw 'Erro ao calcular preço total por lista: ' + error;
      })
    );
  }

  buscarPedido(idPedido: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/${idPedido}`).pipe(
      catchError(error => {
        throw 'Erro ao buscar pedido: ' + error;
      })
    );
  }
}
