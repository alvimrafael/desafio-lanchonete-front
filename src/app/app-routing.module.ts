import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { NovoPedidoComponent } from './components/novo-pedido/novo-pedido.component';
import { ListarPedidosComponent } from './components/listar-pedidos/listar-pedidos.component';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'novo-pedido', component: NovoPedidoComponent },
  { path: 'pedidos', component: ListarPedidosComponent },
  { path: 'produtos', component: ProdutosComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
