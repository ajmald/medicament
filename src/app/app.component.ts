import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import {Pathologie} from '../Pathologie';
import {NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Medicament} from './../Medicament';
import {PrincipeActif} from './../PrincipeActif';
import {MedicamentDetailComponent} from './medicament-detail/medicament-detail.component';
import { NgxSpinnerService } from 'ngx-spinner';
import {NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbPopoverConfig]
  
})


export class AppComponent {
  title = 'Medicaments';
  form: FormGroup;
  medicamentslist: any =[];
  pathologiesList : any =[];
  medicamentsDetailsList : any =[];
  principesActifsList:any =[];
  principeActifSummaryList: any =[];
  parentMessage : number = 999;
  public showSpecialites = false;
  public showPrincipesActifs=false;
  public principeActifExists= false;
  public medicamentExists = false;
  
  


  constructor(public appService: AppService,public response: Router, 
    private formBuilder:FormBuilder,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,private Medicament:Medicament,
    config:NgbPopoverConfig){

    this.pathologiesList = pathologiesList;
    this.principesActifsList = principesActifsList;
    this.medicamentsDetailsList = [Medicament];
    this.form = this.formBuilder.group({
      pathologiesList: new FormArray([]),
      principesActifsList:new FormArray([]),
      medicamentsDetailsList : new FormArray([])
    });


    this.addButtons();
    config.placement ='right';
    config.triggers ='hover';

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
      this.principesActifsList.map((o,i)=>{
        const control = new FormControl;
        (this.form.controls.principesActifsList as FormArray).push(control);
      })
    }
   
    public setFormVisibility(event:any){
      var idAttr = event.currentTarget.id;
  this.showSpecialites = (idAttr ==="specialites");
  this.showPrincipesActifs = (idAttr ==="principesactifs");
  console.log(idAttr);
  console.log("Specialite",this.showSpecialites);
  console.log("PrincipesActifs",this.showPrincipesActifs);
    }



   
    public getMedicamentsList(){
      this.spinner.show();
      this.appService.getMedicaments().subscribe(
        medicament => {
          if(medicament){
          this.medicamentslist=medicament;
          for (let i = 0; i < this.medicamentslist.length; i++) {
            let denomination = this.medicamentslist[i].denomination;
              this.medicamentExists = true;
              this.spinner.hide();   
              this.spinner.hide();
           }
          } else {
            console.log("No data to display moron");
            this.medicamentExists = false;
            this.spinner.hide();
          }
        },
      );
    }



    public getMedicamentByPathology(name:string){
      this.spinner.show();
        this.appService.getMedicamentByPathology(name).subscribe(
          medicament =>{
            if(medicament){
            this.medicamentslist=medicament;
            for (let i = 0; i < this.medicamentslist.length; i++) {
              let codeCIS = this.medicamentslist[i].codeCIS;
              let nom = this.medicamentslist[i].denomination;
              this.medicamentExists = true;
              this.spinner.hide();
            }
          } else {
            console.log("No data to display moron");
            this.medicamentExists = false;
            this.spinner.hide();
          }
          }
        );
    }
    
     public getMedicamentDetailsByCodeCis(id:number):Medicament[]{
      this.appService.getMedicamentDetailsByCodeCis(id).subscribe(
        medicament =>{
          if(medicament){
          this.medicamentsDetailsList = medicament;
          this.open();
          } else {
            console.log("No data to display moron");
            this.medicamentExists = false;
            this.spinner.hide();
          } 
        }
      );
      return this.medicamentsDetailsList;
     } 

    public getPrincipeActifSummaryByName(id:string):PrincipeActif[]{
      this.appService.getPrincipeActifSummaryByName(id).subscribe(
        principeActif =>{
          if(principeActif){
            this.principeActifSummaryList = principeActif;
            this.principeActifExists = true;
          } else {
            console.log("No data to display moron");
            this.principeActifExists = false;
            this.spinner.hide();
          } 
        }
      );
      return this.principeActifSummaryList;
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
      const modalRef = this.modalService.open(MedicamentDetailComponent,{size:"lg"});
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

export const principesActifsList : PrincipeActif[] = [
  { nom: 'Abacavir' },
{ nom: 'Abatacept' },
{ nom: 'Abciximab' },
{ nom: 'Acamprosate' },
{ nom: 'Acarbose' },
{ nom: 'Acébutolol' },
{ nom: 'Acéclidine' },
{ nom: 'Acéclofénac' },
{ nom: 'Acédobène' },
{ nom: 'Acénocoumarol' },
{ nom: 'Acépromazine' },
{ nom: 'Acétarsol' },
{ nom: 'Acétazolamide' },
{ nom: 'Acétorphan' },
{ nom: 'Acétylcholine' },
{ nom: 'Acétylcystéine' },
{ nom: 'Acétylleucine' },
{ nom: 'Aciclovir' },
{ nom: 'Acide acétylsalicylique' },
{ nom: 'Acide acéxamique' },
{ nom: 'Acide alendronique' },
{ nom: 'Acide alginique' },
{ nom: 'Acide amidotrizoïque' },
{ nom: 'Acide ascorbique' },
{ nom: 'Acide aspartique' },
{ nom: 'Acide azélaïque' },
{ nom: 'Acide borique' },
{ nom: 'Acide canrénoïque' },
{ nom: 'Acide chondroïtine sulfurique' },
{ nom: 'Acide clavulanique' },
{ nom: 'Acide clodronique' },
{ nom: 'Acide cromoglicique' },
{ nom: 'Acide désoxyribonucléique' },
{ nom: 'Acide dimécrotique' },
{ nom: 'Acide édétique' },
{ nom: 'Acide étidronique' },
{ nom: 'Acide flavodique' },
{ nom: 'Acide folinique' },
{ nom: 'Acide folique' },
{ nom: 'Acide fusidique' },
{ nom: 'Acide gabodénique' },
{ nom: 'Acide gadopenténique' },
{ nom: 'Acide gadotérique' },
{ nom: 'Acide glutamique' },
{ nom: 'Acide ibandronique' },
{ nom: 'Acide ioxaglique' },
{ nom: 'Acide ioxitalamique' },
{ nom: 'Acide méfénamique' },
{ nom: 'Acide N-aspartylglutamique' },
{ nom: 'Acide nicotinique' },
{ nom: 'Acide niflumique' },
{ nom: 'Acide oxoglurique' },
{ nom: 'Acide pamidronique' },
{ nom: 'Acide panthoténique' },
{ nom: 'Acide para-aminobenzoïque' },
{ nom: 'Acide para-aminosalicylique' },
{ nom: 'Acide pipémidique' },
{ nom: 'Acide résidronique' },
{ nom: 'Acide salicylique' },
{ nom: 'Acide ténoïque' },
{ nom: 'Acide tiaprofénique' },
{ nom: 'Acide tiludronique' },
{ nom: 'Acide tranexamique' },
{ nom: 'Acide undécylénique' },
{ nom: 'Acide ursodésoxycholique' },
{ nom: 'Acide valproïque' },
{ nom: 'Acide zolédronique' },
{ nom: 'Acide gras oméga 3' },
{ nom: 'Acitrétine' },
{ nom: 'Acriflavine' },
{ nom: 'Actinoquinol' },
{ nom: 'Adalimumab' },
{ nom: 'Adapalène' },
{ nom: 'Adéfovir' },
{ nom: 'Adénine' },
{ nom: 'Adénosine' },
{ nom: 'Adrafinil' },
{ nom: 'Adrénaline' },
{ nom: 'Aescine' },
{ nom: 'Albendazole' },
{ nom: 'Albumine' },
{ nom: 'Alcool benzylique' },
{ nom: 'Adesleukine' },
{ nom: 'Alemtuzumab' },
{ nom: 'Alfacalcidol' },
{ nom: 'Alfentanil' },
{ nom: 'Alfuzosine' },
{ nom: 'Alimémazine' },
{ nom: 'Altrétinoïne' },
{ nom: 'Alizapride' },
{ nom: 'Allantoïne' },
{ nom: 'Allopurinol' },
{ nom: 'Alminiprofène' },
{ nom: 'Almitrine' },
{ nom: 'Almotriptan' },
{ nom: 'Aloès' },
{ nom: 'Alpha-amylase' },
{ nom: 'Alpha hydroxyvitamineD3' },
{ nom: 'Alpha-tocophérol' },
{ nom: 'Alprazolam' },
{ nom: 'Alprostadil' },
{ nom: 'Altéplase' },
{ nom: 'Altizide' },
{ nom: 'Aluminium' },
{ nom: 'Alvérine' },
{ nom: 'Amantadine' },
{ nom: 'Ambémonium chlorure' },
{ nom: 'Ambroxol' },
{ nom: 'Amifostine' },
{ nom: 'Amiloride' },
{ nom: 'Amiodarone' },
{ nom: 'Amisulpride' },
{ nom: 'Amitryptiline' },
{ nom: 'Amlodipine' },
{ nom: 'Amodiaquine' },
{ nom: 'Amorolfine' },
{ nom: 'Amoxapine' },
{ nom: 'Amoxicilline' },
{ nom: 'Amphotéricine B' },
{ nom: 'Ampicilline' },
{ nom: 'Aprénavir' },
{ nom: 'Amyléine' },
{ nom: 'Amylmétacrésol' },
{ nom: 'Anagrélide' },
{ nom: 'Anakinra' },
{ nom: 'Anastrozole' },
{ nom: 'Androstanolone' },
{ nom: 'Anétholtrithione' },
{ nom: 'Antithrombine humaine' },
{ nom: 'Apraclonidine' },
{ nom: 'Aprépitant' },
{ nom: 'Aprotinine' },
{ nom: 'Argent' },
{ nom: 'Arginine' },
{ nom: 'Aripiprazole' },
{ nom: 'Arnica extrait' },
{ nom: 'Arnica teinture' },
{ nom: 'Arsenic' },
{ nom: 'Artéméther' },
{ nom: 'Articaïne' },
{ nom: 'Asparaginase' },
{ nom: 'Atazanvir' },
{ nom: 'Aténolol' },
{ nom: 'Atorvastatine' },
{ nom: 'Atosiban' },
{ nom: 'Atovaquone' },
{ nom: 'Atracurium bésilate' },
{ nom: 'Atropine' },
{ nom: 'Auranofine' },
{ nom: 'Aurithiopropanolsulfonate' },
{ nom: 'Azathioprine' },
{ nom: 'Azélastine' },
{ nom: 'Azithromycine' },
{ nom: 'AZR' },
{ nom: 'Aztréonam' },
{ nom: 'Baclofene' },
{ nom: 'Benazapril' },
{ nom: 'Betahistine' },
{ nom: 'Bethamethasone' },
{ nom: 'Bicalutamide' },
{ nom: 'Bisoprolol' },
{ nom: 'Borax' },
{ nom: 'Bromazepam' },
{ nom: 'Bromocriptine' },
{ nom: 'Budesonide' },
{ nom: 'Buprenorphine' },
{ nom: 'Buspirone' },
{ nom: 'Candesartan' },
{ nom: 'Captopril' },
{ nom: 'Carbamazepine' },
{ nom: 'Carbidopa' },
{ nom: 'Carbocisteine' },
{ nom: 'Carvedilol' },
{ nom: 'Cefaclor' },
{ nom: 'Cefixime' },
{ nom: 'Cefpodoxime' },
{ nom: 'Cefuroxime' },
{ nom: 'Celiprolol' },
{ nom: 'Chlorhexidine' },
{ nom: 'Chlormadinone' },
{ nom: 'Ciclétanine' },
{ nom: 'Ciclopirox' },
{ nom: 'Ciclopiroxolamine' },
{ nom: 'Ciprofloxacine' },
{ nom: 'Citalopram' },
{ nom: 'Clarithromycine' },
{ nom: 'Clobétasol' },
{ nom: 'Clopidogrel' },
{ nom: 'Clozapine' },
{ nom: 'Codeine' },
{ nom: 'Cotrimoxazole' },
{ nom: 'Cyproterone' },
{ nom: 'Desloratadine' },
{ nom: 'Desogestrel' },
{ nom: 'Diacereine' },
{ nom: 'Diazepam' },
{ nom: 'Diclofenac' },
{ nom: 'Diltiazem' },
{ nom: 'Diosmine' },
{ nom: 'Domperidone' },
{ nom: 'Donezepil' },
{ nom: 'Doxycycline' },
{ nom: 'Dorzolamide' },
{ nom: 'Drosera teinture' },
{ nom: 'Ebastine' },
{ nom: 'Econazole' },
{ nom: 'Enalapril' },
{ nom: 'Esomeprazole' },
{ nom: 'Ethinylestradiol' },
{ nom: 'Exemestane' },
{ nom: 'Fenofibrate' },
{ nom: 'Fentanyl' },
{ nom: 'Fexofenadine' },
{ nom: 'Finasteride' },
{ nom: 'Flecainide' },
{ nom: 'Fluconazole' },
{ nom: 'Fluoxetine' },
{ nom: 'Fluvastatine' },
{ nom: 'Fosfomycine' },
{ nom: 'Fosinopril' },
{ nom: 'Furosemide' },
{ nom: 'Fusidate de sodium' },
{ nom: 'Gabapentine' },
{ nom: 'Gestodene' },
{ nom: 'Glibenclamide' },
{ nom: 'Glicazide' },
{ nom: 'Glimeripide' },
{ nom: 'Hexamidine' },
{ nom: 'Hexetidine' },
{ nom: 'Hydrocortancyl' },
{ nom: 'Hydrochlorothiazide' },
{ nom: 'Hydroxyzine' },
{ nom: 'Ibuprofene' },
{ nom: 'Indapamide' },
{ nom: 'Ipratropium' },
{ nom: 'Irbesartan' },
{ nom: 'Isotretinoine' },
{ nom: 'Ketoconazole' },
{ nom: 'Ketoprofene' },
{ nom: 'Lactulose' },
{ nom: 'Lamotrigine' },
{ nom: 'Lansoprazole' },
{ nom: 'Latanoprost' },
{ nom: 'Lercanidipine' },
{ nom: 'Levetiracetam' },
{ nom: 'Levocetirizine' },
{ nom: 'Levodopa' },
{ nom: 'Levofloxacine' },
{ nom: 'Levonorgestrel' },
{ nom: 'Levothyroxine' },
{ nom: 'Loperamide' },
{ nom: 'Loratadine' },
{ nom: 'Lorazepam' },
{ nom: 'Losartan' },
{ nom: 'Macrogol' },
{ nom: 'Magnesium' },
{ nom: 'Manidipine' },
{ nom: 'Mebeverine' },
{ nom: 'Meloxicam' },
{ nom: 'Memantine' },
{ nom: 'Metformine' },
{ nom: 'Metoclopramide' },
{ nom: 'Metroprolol' },
{ nom: 'Mianserine' },
{ nom: 'Minoxidil' },
{ nom: 'Mirtazapine' },
{ nom: 'Madofinil' },
{ nom: 'Molsidomine' },
{ nom: 'Montelukast' },
{ nom: 'misoprostol' },
{ nom: 'Nebivolol' },
{ nom: 'Nifuroxazide' },
{ nom: 'Ofloxacine' },
{ nom: 'Olmesartan' },
{ nom: 'Omeprazole' },
{ nom: 'Ondansetron' },
{ nom: 'Oxomemazine' },
{ nom: 'Oxybutynine' },
{ nom: 'Pantoprazole' },
{ nom: 'Paracetamol' },
{ nom: 'Paroxetine' },
{ nom: 'Perindopril' },
{ nom: 'Phloroglucinol' },
{ nom: 'Pinaverium' },
{ nom: 'Piracétam' },
{ nom: 'Piroxicam' },
{ nom: 'Pravastatine' },
{ nom: 'Prazepam' },
{ nom: 'Prednisolone' },
{ nom: 'Prednisone' },
{ nom: 'Progesterone' },
{ nom: 'Propanolol' },
{ nom: 'Quinapril' },
{ nom: 'Quinine' },
{ nom: 'Rabeprazole' },
{ nom: 'Raloxifene' },
{ nom: 'Ramipril' },
{ nom: 'Ranitidine' },
{ nom: 'Repaglinide' },
{ nom: 'Rosuvastatine' },
{ nom: 'Sotalol' },
{ nom: 'Spiramycine' },
{ nom: 'Spironolactone' },
{ nom: 'Sulfamethoxazole' },
{ nom: 'Sulpiride' },
{ nom: 'Sumatriptan' },
{ nom: 'Tamoxifene' },
{ nom: 'Tamsulosine' },
{ nom: 'Terazosine' },
{ nom: 'Terbinafine' },
{ nom: 'Terbutaline' },
{ nom: 'Tetrazepam' },
{ nom: 'Thiocolchicoside' },
{ nom: 'Tiapride' },
{ nom: 'Timolol' },
{ nom: 'Tobramycine' },
{ nom: 'Topiramate' },
{ nom: 'Tramadol' },
{ nom: 'Trimebutine' },
{ nom: 'Trimetadizine' },
{ nom: 'Trolamine' },
{ nom: 'Valaciclovir' },
{ nom: 'Valproate de sodium' },
{ nom: 'Valsartan' },
{ nom: 'Venlafaxine' },
{ nom: 'Vérapamil' },
{ nom: 'Zolmitriptan' },
{ nom: 'Zolpidem' },
{ nom: 'Zopiclone' },
];