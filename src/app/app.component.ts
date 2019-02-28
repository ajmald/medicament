import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import {Pathologie} from '../Pathologie';
import {NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Medicament} from './../Medicament';
import {MedicamentDetailComponent} from './medicament-detail/medicament-detail.component';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})


export class AppComponent {
  title = 'Medicaments';
  form: FormGroup;
  medicamentslist: any =[];
  pathologiesList : any =[];
  medicamentsDetailsList : any =[];
  parentMessage : number = 999;
  


  constructor(public appService: AppService,public response: Router, 
    private formBuilder:FormBuilder,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,private Medicament:Medicament){

    this.pathologiesList = pathologiesList;
    this.medicamentsDetailsList = [Medicament];
    this.form = this.formBuilder.group({
      pathologiesList: new FormArray([]),
      medicamentsDetailsList : new FormArray([])
    });


    this.addButtons();
    

  }
  ngOnInit() {
    this.spinner.show(); 
    setTimeout(() => {
      this.pathologiesList = pathologiesList;  
      this.spinner.hide(); 
    }, 1000);
    
  }


   /*getMedicaments() {
    this.appService.getMedicaments()
    .subscribe((medicaments:any) =>
      {
        this.medicaments = medicaments;
        console.log(this.medicaments);
        localStorage.setItem("MedicamentsArray", JSON.stringify(this.medicaments));
      })
    }*/
  
    private addButtons() {
      this.pathologiesList.map((o, i) => {
        const control = new FormControl; // if first item set to true, else false
        (this.form.controls.pathologiesList as FormArray).push(control);
      });
    }
  



   
    public getMedicamentsList(){
      this.spinner.show();
      this.appService.getMedicaments().subscribe(
        medicament => {
          this.medicamentslist=medicament;
          for (let i = 0; i < this.medicamentslist.length; i++) {
            let denomination = this.medicamentslist[i].denomination;
            if(this.medicamentslist.length ===0)
              {
                this.spinner.hide();
              }
              this.spinner.hide();
          }
        },
      );
    }



    public getMedicamentByPathology(name:string){
      this.spinner.show();
        this.appService.getMedicamentByPathology(name).subscribe(
          medicament =>{
            this.medicamentslist=medicament;
            for (let i = 0; i < this.medicamentslist.length; i++) {
              let codeCIS = this.medicamentslist[i].codeCIS;
              let nom = this.medicamentslist[i].denomination;
              if(this.medicamentslist.length ===0)
              {
                this.spinner.hide();
              }
              this.spinner.hide();
            }
          }
        );
    }
    
     public getMedicamentDetailsByCodeCis(id:number):Medicament[]{
      this.appService.getMedicamentDetailsByCodeCis(id).subscribe(
        medicament =>{
          this.medicamentsDetailsList = medicament;
          this.open(); 
        }
      );
      return this.medicamentsDetailsList;
     } 

    

     
    public findColor(medicament: string): string {

      var regexpBuvable = medicament.match(/solution/);
      var regexpComprime = medicament.match(/comprimé/);
      if(regexpBuvable) {
        return "#ff0000";
      }
      if(regexpComprime) {
        return "#0000ff";
      }
      return null;
    }

    open() {
      const modalRef = this.modalService.open(MedicamentDetailComponent);
      modalRef.componentInstance.title = 'Médicament';
      modalRef.componentInstance.medicament = this.medicamentsDetailsList;

    }



}

export const pathologiesList: Pathologie[] = [
  { nom: 'allergologie' },
  { nom: 'cardiologie' },
  { nom: 'chirurgie' },
  { nom: 'dermatologie' },
  { nom: 'endocrinologie' },
  { nom: 'gastro-entérologie' },
  { nom: 'gynécologie' },
  { nom: 'hématologie' },
  { nom: 'infectiologie' },
  { nom: 'néonatologie' },
  { nom: 'néphrologie' },
  { nom: 'neurologie' },
  { nom: 'obstétrique' },
  { nom: 'infectiologie' },
  { nom: 'ophtalmologie' },
  { nom: 'pédiatrie' },
  { nom: 'pneumologie' },
  { nom: 'psychiatrie' },
  { nom: 'radiologie' },
  { nom: 'obstétrique' },
  { nom: 'radiothérapie' },
  { nom: 'rhumatologie' },
  { nom: 'urologie' }
];

