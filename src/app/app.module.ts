import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarPedidosComponent } from './components/listar-pedidos/listar-pedidos.component';
import { PedidoService } from './services/pedido.service';
import { HomeComponent } from './components/home/home.component';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { NovoPedidoComponent } from './components/novo-pedido/novo-pedido.component';

@NgModule({
  declarations: [
    AppComponent,
    ListarPedidosComponent,
    HomeComponent,
    ProdutosComponent,
    NotFoundComponent,
    NovoPedidoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'listar-pedidos', component: ListarPedidosComponent },
      { path: 'produtos', component: ProdutosComponent },
      { path: '**', component: NotFoundComponent }
    ])
  ],
  providers: [
    PedidoService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
