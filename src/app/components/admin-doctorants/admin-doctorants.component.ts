import { EtudiantServices } from './../../services/admin-etudiants.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-doctorants',
  templateUrl: './admin-doctorants.component.html',
  styleUrls: ['./admin-doctorants.component.scss']
})
export class AdminDoctorantsComponent implements OnInit {

  mode = 'list';
  pageOfItems: Array<any>;
  editdoctorant;
  filieres;

  constructor(private auth: AuthenticationService,private etdServ: EtudiantServices) {
    this.getAllUsers();
  }
  doctorants;
  ngOnInit() {

  }
  onEdit(d)
  {
    this.editdoctorant=d;


    console.log(d)
    this.etdServ.loadFilieres().then((response) => {

      this.filieres = response
      this.etdServ.loadIdentifiant(this.editdoctorant.identifiantId).then((identifiant) =>{
        this.editdoctorant.identifiant = identifiant

        console.log(this.editdoctorant)
        this.mode='edit-etudiant';
      })

    })
  }
  onCancel()
  {
    this.etdServ.loadEtudiants().then((response) => {
      this.doctorants = response
      console.log(response)
    })
    this.mode='list';
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  getAllUsers() {

      this.etdServ.loadEtudiants().then((response) => {
        this.doctorants = response
        console.log(response)
      })
  }
  onNewetudiant() {
    if (this.mode != 'new-etudiant') {

      this.etdServ.loadFilieres().then((response) => {
        this.filieres = response
        console.log(response)
      })

      this.mode = 'new-etudiant';

    } else {
      this.getAllUsers();
      this.mode = 'list';

    }
  }

  onSaveEtudiant(value) {

    value.identifiant = {"identifiantId": value.identifiantId,"pseudo": value.pseudo,"motDePasse": value.password}

    console.log(value)
    if(value.identifiant.identifiantId == undefined){
      this.etdServ.addEtudiant(value).then(() => {
        this.getAllUsers();
        this.mode = 'list';
      })

    }else{
      this.etdServ.UpdateEtudiant(value).then(() => {
        this.getAllUsers();
        this.mode = 'list';
      })
    }



  }


  OnDeleteDoctorant(d) {
    let c = confirm("Etes vous sûre ?");
    if (!c) return;
    console.log("Delete");
    this.auth.deleteRessource(d._links.self.href).
      subscribe(
        data => {
          this.getAllUsers();
        },
        err => { console.log(err); }
      )
  }

}
