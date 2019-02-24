import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicamentDetailComponent } from './medicament-detail/medicament-detail.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  { path: 'detail/:codeCIS', component: MedicamentDetailComponent },
  { path: 'acceuil', component: AppComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
