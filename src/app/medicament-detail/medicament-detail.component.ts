import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../app.service';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Medicament} from '../../Medicament';



@Component({
  selector: 'app-medicament-detail',
  templateUrl: './medicament-detail.component.html',
  styleUrls: ['./medicament-detail.component.css']
})
export class MedicamentDetailComponent implements OnInit {
  @Input() public medicament;
  medicamentsDetailslist: Medicament[] =[];
  displayedColumns  :  string[] = ['Forme Pharmaceutique', 'Voies Administration','Denomination Substance'];


  constructor(private appService: AppService,
    public activeModal: NgbActiveModal,
    private route: ActivatedRoute,private location: Location,private Medicament:Medicament
   ) {
    }


  ngOnInit() {

    this.medicamentsDetailslist.push(this.medicament);
    //console.log(this.medicamentsDetailslist);

  }


 

goBack(): void {
  this.location.back();
}







}




