import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { EtudiantServices } from 'src/app/services/admin-etudiants.service';

@Component({
  selector: 'app-admin-documents',
  templateUrl: './admin-documents.component.html',
  styleUrls: ['./admin-documents.component.scss']
})
export class AdminDocumentsComponent implements OnInit {

  mode = 'list';
  pageOfItems: Array<any>;

  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  documents:any;

  constructor(private services:EtudiantServices,private route:ActivatedRoute) {
    this.services.loadDocs(this.route.snapshot.params.id).then(response=>{
      this.documents = response
    })
  }

  ngOnInit() {
  }

  public onNewDoc(){
    if (this.mode != 'new-doc') {
      this.mode = 'new-doc';
    } else {
      this.mode = 'list';
    }
  }

  public onSee(doc){
    console.log(doc);
    var image = new Image();
    image.src = doc
    console.log(image.outerHTML);
    var w = window.open(image.src);
    w.document.write(
      "<iframe width='100%' height='100%' src='" +
      encodeURI(image.src) + "'></iframe>"
   )
  }

  public onEdit(d){
    // this.editdoctorant=d;
    console.log(d);
    this.mode='edit-doc';
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }


  onCancel()
  {
    this.services.loadDocs(this.route.snapshot.params.id).then(response=>{
      this.documents = response
    })
    this.mode='list';
  }

  public onSaveDoc(){

    //console.log(btoa(this.cardImageBase64))
    console.log(this.cardImageBase64)
    this.services.addDoc({designation: this.cardImageBase64,extension:".pdf",etudiantId:this.route.snapshot.params.id}).then(()=>{
      alert("add successfull")
      this.onCancel()
    });
      
  }

  public onDel(documentId){
    this.services.deleteDoc(documentId)
    this.services.loadDocs(this.route.snapshot.params.id).then(response=>{
      this.documents = response
    })

    this.mode = 'list';
  }

  public fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = ['application/pdf'];
        const max_height = 15200;
        const max_width = 25600;

        if (fileInput.target.files[0].size > max_size) {
            this.imageError =
                'Maximum size allowed is ' + max_size / 1000 + 'Mb';

            return false;
        }

        if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
            this.imageError = 'Only DOC are allowed ( PDF )';
            return false;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            this.cardImageBase64 = ""+image.src
            console.log(image.src);

            image.onload = rs => {
                const img_height = rs.currentTarget['height'];
                const img_width = rs.currentTarget['width'];

                console.log(img_height, img_width);


                if (img_height > max_height && img_width > max_width) {
                    this.imageError =
                        'Maximum dimentions allowed ' +
                        max_height +
                        '*' +
                        max_width +
                        'px';
                    return false;
                } else {
                    let imgBase64Path = e.target.result;
                    this.cardImageBase64 = imgBase64Path;
                    this.isImageSaved = true;
                    // console.log(this.cardImageBase64);
                    // console.log(imgBase64Path)
                    // this.imgBase64Path = imgBase64Path;
                    // this.previewImagePath = imgBase64Path;
                }
            };

        };

        reader.readAsDataURL(fileInput.target.files[0]);

        // console.log(reader.readAsDataURL(fileInput.target.files[0]))
    }
}


}
