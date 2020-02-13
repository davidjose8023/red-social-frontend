import { Component, OnInit, DoCheck, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UploadService } from '../../services/upload.services';
import { Publication } from '../../models/publication.model';
import { UserService } from '../../services/user.services';
import { PublicationService } from '../../services/publications.services';
import { GLOBAL } from '../../services/global';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    providers: [UserService, PublicationService, UploadService]

})

export class SidebarComponent implements OnInit, DoCheck{
    public title: string ;
    public status: string;
    public identity;
    public token;
    public stats;
    public publication : Publication;
    public filesToUpload: Array<File>;
    public url: string;
    
    constructor( 
        private _route : ActivatedRoute, 
        private _router : Router,
        private _userService: UserService,
        private _publicationService: PublicationService,
        private _uploadService: UploadService
        ){
        this.title = 'sidebar';
        this.url= GLOBAL.url;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.stats = this._userService.getStats();
        this.publication = new Publication('',this.identity._id,'','','');
 
      
    }
    ngOnInit(){
        console.log('componente sidebar cargado');
        
    }
    ngDoCheck(){ // detecta si ha ocurrido un cambio y se le da intruccion de actulizar varibles y refresca los componente

        this.stats = this._userService.getStats();
        //console.log("sidebar.component.ts ngDoCheck");
        //console.log(this.identity);
        //console.log(this.stats);
    }

    onSubmit(newPubForm){
        console.log(this.publication);

        this._publicationService.addPublication(this.token, this.publication).subscribe(
            response => {
                if(!response.publication){
                    this.status = 'error';
                }else{
                  
                    this.status = 'success';
                    if(this.filesToUpload){
                        this._uploadService.makeFileRequest(this.url+'upload-image-pub/'+response.publication._id,[],this.filesToUpload,
                        this.token, 'image').then((result: any)=>{
                            console.log(result);
                        });
                    }
                    
                    
                    newPubForm.reset();
                    this.getCounters();
                    this._router.navigate(['/timeline']);
                   
                }
            },
            error => {
                var errorMessage =  <any>error;
                console.log(errorMessage);

                if(errorMessage != null){
                    this.status = 'error';
                }
            }
        );
    }

    getCounters = async () => {
 
        let response = await this._userService.getCounters().toPromise().then((response) => {
                
            return response;
        });

        localStorage.setItem('stats', JSON.stringify(response) );
     
        
    }

    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>> fileInput.target.files;

        console.log(this.filesToUpload);

    }

    // Output
    @Output() sended = new EventEmitter();
    sendPublication(event){
        console.log(event); 

        this.sended.emit({send:'true'});

    }
}