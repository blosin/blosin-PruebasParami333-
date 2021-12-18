import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { AppRoutingModule } from './app-routing.module';
import { FormCronComponent } from './Componentes/form-cron/form-cron.component';
import { ModalDialogComponent } from './Componentes/modal-dialog/modal-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    FormCronComponent,
    ModalDialogComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    //AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [FormCronComponent]
})
export class AppModule { }
