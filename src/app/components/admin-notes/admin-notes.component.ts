import { EtudiantServices } from './../../services/admin-etudiants.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-notes',
  templateUrl: './admin-notes.component.html',
  styleUrls: ['./admin-notes.component.scss']
})
export class AdminNotesComponent implements OnInit {

  mode = 'list';
  pageOfItems: Array<any>;
  modules:any;
  notes:any;
  editnote:any;
  constructor(private services:EtudiantServices,private route: ActivatedRoute) {
    this.services.GetNotesByFiliereId(this.route.snapshot.params.id).then((notes) => {
      this.notes = notes
    })
   }

  ngOnInit() {
  }

  public onNewNote(){
    if (this.mode != 'new-note') {
      this.services.loadModulesByFiliere(this.route.snapshot.params.id).then((response)=>{
        this.modules = response
     })
      this.mode = 'new-note';
    } else {
      this.mode = 'list';
    }
  }

  public onEdit(d){
    this.editnote=d;
    this.services.loadModulesByFiliere(this.route.snapshot.params.id).then((response)=>{
      this.modules = response
   })
    this.mode='edit-note';
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  onCancel()
  {
    this.services.GetNotesByFiliereId(this.route.snapshot.params.id).then((notes) => {
      this.notes = notes
    })
    this.mode='list';
  }

  public onSaveNote(d){
    this.services.addNote(d).then(() =>{
      alert("add successful")
      this.onCancel()
    })
  }

  public onUpdateNote(d){
    console.log(d)
    this.services.updateNote(d).then(()=>{
      alert("update successful")
      this.onCancel()
    });
    
  }

}
