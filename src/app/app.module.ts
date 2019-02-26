import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppService } from './app.service';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PathologiesComponent } from './pathologies/pathologies.component';
import { MedicamentsComponent } from './medicaments/medicaments.component';
import { UiModule } from './ui/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MedicamentDetailComponent } from './medicament-detail/medicament-detail.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import {Medicament} from './../Medicament';


@NgModule({

  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    UiModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  declarations: [
    AppComponent,
    PathologiesComponent,
    MedicamentsComponent,
    MedicamentDetailComponent    
    ],

  providers: [
    NgbActiveModal,
    AppService,
    Medicament
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AppComponent,
    MedicamentDetailComponent
    ]
})
export class AppModule { }
