import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PersonagemComponent } from './personagem/personagem.component';
import { routes } from './app.routes';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { PersonagemService } from './services/personagem/personagem.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FilmeComponent } from './filme/filme.component';
import { FilmeService } from './services/filme/filme.service';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    PersonagemComponent,
    MenuComponent,
    HomeComponent,
    FilmeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ChartsModule,
    routes
  ],
  providers: [
      PersonagemService,
      FilmeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
