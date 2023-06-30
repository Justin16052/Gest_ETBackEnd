import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EtudiantServices } from 'src/app/services/admin-etudiants.service';

@Component({
  selector: 'app-admin-absences',
  templateUrl: './admin-absences.component.html',
  styleUrls: ['./admin-absences.component.scss']
})
export class AdminAbsencesComponent implements OnInit {

  mode = 'list';
  pageOfItems: Array<any>;
  etudiantId:number;
  editabsence:any;
  absences:any;
  modules:any;

  constructor(private etdService:EtudiantServices,private route: ActivatedRoute) {
    this.etdService.loadAbsenceByEtudiant(this.route.snapshot.params.id1).then((response)=>{
      this.absences = response
      console.log(response)
    })

  }

  ngOnInit() {
  }

  public onNewAbsence(){
    if (this.mode != 'new-absence') {

      this.etudiantId = this.route.snapshot.params.id1;

      console.log(this.route.snapshot.params.id2)
      this.etdService.loadModulesByFiliere(this.route.snapshot.params.id2).then((response)=>{
         this.modules = response
      })
      this.mode = 'new-absence';

    } else {
      this.etdService.loadAbsenceByEtudiant(this.route.snapshot.params.id1).then((response)=>{
        console.log(response);
      })
      this.mode = 'list';
    }
  }


  public onEdit(d)
  {
    this.editabsence=d;
    console.log(this.editabsence)
    this.etdService.loadModulesByFiliere(this.route.snapshot.params.id2).then((response)=>{
      this.modules = response
   })
    this.mode='edit-absence';

  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

  public onSaveAbsence(value){
    this.etdService.createAbsence(value)
    // this.mode='list';
    /*this.etdService.loadAbsenceByEtudiant(this.route.snapshot.params.id1).then((response)=>{
      this.absences = response
    })*/
    alert("add successfull")
    
  }
  public onUpdateAbsence(value){
    console.log(value)
    this.etdService.UpdateAbsence(value);
    alert("update successfull")
  }

  public  delete(moduleId:number){
    this.etdService.DeleteAbsence(moduleId);
    
    alert("delete successfull")
    
    this.onCancel()
  }

  onCancel()
  {
    this.etdService.loadAbsenceByEtudiant(this.route.snapshot.params.id1).then((response)=>{
      this.absences = response
    })
    this.mode='list';
  }




}
