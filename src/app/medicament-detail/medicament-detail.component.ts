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

  //@Input() codeCIS: number;
  medicamentsDetailsList : any =[];
  @Input() medicament: Medicament;
  constructor(private appService: AppService,public activeModal: NgbActiveModal,private route: ActivatedRoute,private location: Location) { }


  ngOnInit() {
    this.getMedicamentDetailsByCodeCis();
  }

  public getMedicamentDetailsByCodeCis():void{
    const codeCIS = +this.route.snapshot.paramMap.get('codeCIS');
    console.log(codeCIS);
    this.appService.getMedicamentDetailsByCodeCis(codeCIS).subscribe(
      medicament =>{
        this.medicamentsDetailsList=medicament;
        for (let i = 0; i < this.medicamentsDetailsList.length; i++) {
          let formePharmaceutique = this.medicamentsDetailsList[i].formePharmaceutique;
          console.log(formePharmaceutique);
        }
      },
    );
    
}

goBack(): void {
  this.location.back();
}






}
