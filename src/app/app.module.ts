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
import { ModalComponent } from './modal/modal.component';
import { AboutComponent } from './about/about.component';
import {RouterModule} from '@angular/router';
import { ModalAboutComponent } from './modal-about/modal-about.component';


@NgModule({

  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    UiModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    PathologiesComponent,
    MedicamentsComponent,
    MedicamentDetailComponent,
    ModalComponent,
    AboutComponent,
    ModalAboutComponent
    ],

  providers: [
    NgbActiveModal,
    AppService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalAboutComponent,
    MedicamentDetailComponent
    ]
})
export class AppModule { }
