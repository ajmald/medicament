import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppService } from './app.service';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MedicamentDetailComponent } from './medicament-detail/medicament-detail.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from  '@angular/material';
import {RouterModule} from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import {Medicament} from './../Medicament';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';




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
    NgxSpinnerModule,
    MatTableModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [
    AppComponent,
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
