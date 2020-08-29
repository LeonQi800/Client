import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './components/create/create.component';
import { UpdateComponent } from './components/update/update.component';
import { MainComponent } from './components/main/main.component';
import { StatusDataService } from './services/status.service';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    UpdateComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [StatusDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
