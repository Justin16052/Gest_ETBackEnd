import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})



export class EtudiantServices {

  host_etudiant = 'http://localhost:8084';

  host_document = 'http://localhost:8085';

  host_filiere = 'http://localhost:8082';

  host_filiereModule = 'http://localhost:8083';

  host_identifiant = 'http://localhost:8081';

  host_module = 'http://localhost:8080';

  host_absence = 'http://localhost:8087';

  constructor(private httpClient: HttpClient, private auth: AuthenticationService) {

  }

async loadEtudiants(): Promise<any>{

  try{
    return this.httpClient.get(this.host_etudiant+"/etudiant/").toPromise();
  }catch(error){

  }
}

async addEtudiant(data): Promise<any>{

  try{
    return this.httpClient.post(this.host_etudiant+"/etudiant/",data,{ responseType: 'text' }).toPromise();
  }catch(error){

  }
}

async UpdateEtudiant(data): Promise<any>{

  try{
    return this.httpClient.put(this.host_etudiant+"/etudiant/edit/",data,{ responseType: 'text' }).toPromise();
  }catch(error){

  }
}

async loadFilieres(): Promise<any>{

  try{
    return this.httpClient.get(this.host_filiere+"/filiere/").toPromise();
  }catch(error){

  }
}

async loadIdentifiant(id): Promise<any>{

  try{
    return this.httpClient.get(this.host_identifiant+"/identifiant/?identifiantId="+id).toPromise();
  }catch(error){

  }
}

async loadModulesByFiliere(id): Promise<any>{

  try{
    return this.httpClient.get(this.host_module+"/module/"+id).toPromise();
  }catch(error){

  }
}

async loadAbsenceByEtudiant(id): Promise<any>{

  try{
    return this.httpClient.get(this.host_absence+"/absence/?etudiantId="+id).toPromise();
  }catch(error){

  }
}

//

async createAbsence(data): Promise<any>{

  try{
    return this.httpClient.post(this.host_absence+"/absence/",data).toPromise();
  }catch(error){

  }
}

async UpdateAbsence(data): Promise<any>{

  try{
    return this.httpClient.put(this.host_absence+"/absence/",data).toPromise();
  }catch(error){

  }
}

async DeleteAbsence(absenceId:number): Promise<any>{

  try{
    return this.httpClient.delete(this.host_absence+"/absence/?absenceId="+absenceId).toPromise();
  }catch(error){

  }
}

//

async addNote(data): Promise<any>{

  try{
    return this.httpClient.post(this.host_filiereModule+"/filiere-module/",data).toPromise();
  }catch(error){

  }
}

async updateNote(data): Promise<any>{
  try{
    return this.httpClient.put(this.host_filiereModule+"/filiere-module/",data).toPromise();
  }catch(error){

  }
}

async GetNotesByFiliereId(filiereId:number): Promise<any>{

  try{
    return this.httpClient.get(this.host_filiereModule+"/filiere-module/?filiereId="+filiereId).toPromise();
  }catch(error){

  }
}

//

async addDoc(data): Promise<any>{

  try{
    return this.httpClient.post(this.host_document+"/document/",data).toPromise();
  }catch(error){

  }
}

async loadDocs(etudiantId): Promise<any>{

  try{
    return this.httpClient.get(this.host_document+"/document/?etudiantId="+etudiantId).toPromise();
  }catch(error){

  }
}

async deleteDoc(documentId): Promise<any>{

  try{
    return this.httpClient.delete(this.host_document+"/document/?documentId="+documentId).toPromise();
  }catch(error){

  }
}

}
