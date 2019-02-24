import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import {Pathologie} from '../Pathologie';
import {NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
import { ModalAboutComponent } from './modal-about/modal-about.component';
import {Medicament} from './../Medicament';
import {MedicamentDetailComponent} from './medicament-detail/medicament-detail.component';



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


  constructor(public appService: AppService,public response: Router, private formBuilder:FormBuilder,private modalService: NgbModal){

    this.pathologiesList = pathologiesList;
    this.medicamentsDetailsList = [];
    this.form = this.formBuilder.group({
      pathologiesList: new FormArray([]),
      medicamentsDetailsList : new FormArray([])
    });

    this.addButtons();
    

  }
  ngOnInit() {
    this.pathologiesList = pathologiesList;  
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
      this.appService.getMedicaments().subscribe(
        medicament => {
          this.medicamentslist=medicament;
          for (let i = 0; i < this.medicamentslist.length; i++) {
            let denomination = this.medicamentslist[i].denomination;
          }
        },
      );
    }



    public getMedicamentByPathology(name:string){
        this.appService.getMedicamentByPathology(name).subscribe(
          medicament =>{
            this.medicamentslist=medicament;
            for (let i = 0; i < this.medicamentslist.length; i++) {
              let codeCIS = this.medicamentslist[i].codeCIS;
              let nom = this.medicamentslist[i].denomination;

            }
          },
        );
        
    }
    
    
    public getMedicamentDetailsByCodeCis(id:number){
      this.appService.getMedicamentDetailsByCodeCis(id).subscribe(
        medicament =>{
          this.medicamentsDetailsList=medicament;
          for (let i = 0; i < this.medicamentsDetailsList.length; i++) {
            let formePharmaceutique = this.medicamentsDetailsList[i].formePharmaceutique;
            console.log(formePharmaceutique);
          }
        },
      );
      }




    public findColor(medicament: string): string {

      //var testString = new RegExp(medicament);;
      var regexpBuvable = medicament.match(/solution/);
      //console.log(regexpBuvable);
      var regexpComprime = medicament.match(/comprimé/);
      //console.log(testComprime);
      if(regexpBuvable) {
        return "#ff0000";
      }
      if(regexpComprime) {
        return "#0000ff";
      }
      return null;
    }

    open() {
       //const modalRef = this.modalService.open(ModalComponent);
      const modalRef = this.modalService.open(ModalAboutComponent); 
      //const modalRef = this.modalService.open(MedicamentDetailComponent);
      modalRef.componentInstance.title = 'Médicament';
    }

    





}

export const pathologiesList: Pathologie[] = [
  { nom: 'allergologie' },
  { nom: 'immunologie' },
  { nom: 'andrologie' },
  { nom: 'cardiologie' },
  { nom: 'chirurgie' },
  { nom: 'dermatologie' },
  { nom: 'endocrinologie' },
  { nom: 'gastro-entérologie' },
  { nom: 'gériatrie' },
  { nom: 'gynécologie' },
  { nom: 'hématologie' },
  { nom: 'hépatologie' },
  { nom: 'infectiologie' },
  { nom: 'térologie' },
  { nom: 'néonatologie' },
  { nom: 'néphrologie' },
  { nom: 'neurologie' },
  { nom: 'odontologie' },
  { nom: 'obstétrique' },
  { nom: 'infectiologie' },
  { nom: 'ophtalmologie' },
  { nom: 'orthopédie' },
  { nom: 'Oto-rhino-laryngologie' },
  { nom: 'pédiatrie' },
  { nom: 'pneumologie' },
  { nom: 'psychiatrie' },
  { nom: 'radiologie' },
  { nom: 'obstétrique' },
  { nom: 'radiothérapie' },
  { nom: 'rhumatologie' },
  { nom: 'urologie' }
];
