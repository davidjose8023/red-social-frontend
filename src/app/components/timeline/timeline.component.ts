import { Component , OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.services';
import { PublicationService } from '../../services/publications.services';
import { Publication } from '../../models/publication.model';
import * as $ from 'jquery';

@Component({
    selector: 'timeline',
    templateUrl: './timeline.component.html',
    providers: [UserService, PublicationService]

})

export class TimelineComponent implements OnInit {
    public title: string ;
    public status: string;
    public identity;
    public token;
    public stats;
    public url: string;
    public page;
    public next_page;
    public prev_page;
    public total;
    public pages;
    public itemsPerPage;
    public publications: Publication[];
    
    constructor( 
        private _route : ActivatedRoute,
        private _router : Router,
        private _userService: UserService,
        private _publicationService: PublicationService
        ){
        this.title = 'timeline';
        this.url= GLOBAL.url;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.stats = this._userService.getStats();
        this.page = 1;
 
      
    }
    ngOnInit(){
        console.log('componente timeline cargado');
        this.getPublications(this.page);
    }

    getPublications(page, adding = false){
        
        this._publicationService.getPublications(this.token, page).subscribe(
            response => {
                if(!response.publications){
                    this.status = 'error';
               
                }else{
                    this.total= response.total_items;
                    this.pages= response.pages;
                    this.itemsPerPage = response.itemsPerPage;
                    if(!adding){

                        this.publications= response.publications;
                
                    }else{
                        var arrayA = this.publications;
                        var arrayB = response.publications;
                        this.publications = arrayA.concat(arrayB);

                        $("html, body").animate( {
                            scrollTop: $("html").prop('scrollHeight')
                        }, 500);
                    }
       
                    // if(page > this.pages){
                    //     this._router.navigate(['/timeline', 1]);

                    // }
                    
                    console.log(response);
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
    public noMore =  false;
    viewMore(){
        this.page += 1;
        //console.log("tamaño pub "+ this.publications.length);
        //console.log("total - itemsPerPage " + " "+ this.total+ " - "+ this.itemsPerPage + " " +  (this.total - this.itemsPerPage));
        if(this.page == this.pages){
            this.noMore = true;
        }

        this.getPublications(this.page, true);
    }
    refresh(event){
       this.getPublications(1);
    }
}