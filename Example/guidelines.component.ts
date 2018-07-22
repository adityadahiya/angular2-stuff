import { Component, OnInit } from '@angular/core';
import { Routes, Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';
/*import * as tf from '@tensorflow/tfjs';
import * as ui from '../ui';
import {Webcam} from '../webcam';
import { loadModel } from '@tensorflow/tfjs';

let mobilenet;
let isPredicting ;
let model;*/

@Component({
  selector: 'app-guidelines',
  templateUrl: './guidelines.component.html',
  styleUrls: ['./guidelines.component.scss']
})
export class GuidelinesComponent implements OnInit {

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private apiService: ApiService,
  	private storage: StorageService
  ) { }

  public token;
  public level;
  public message;
  public session=0;

  logout(){
    this.storage.reset();
    this.router.navigateByUrl('auth/login');
  }
  continue(){
    if(this.level == 1){
      this.router.navigateByUrl('modelling/level1');
    }
    else if(this.level == 2){
      this.router.navigateByUrl('modelling/level2');
    }
  }
  
  ngOnInit() {
    
    this.storage.setItem('session',this.session);
    this.storage.setItem('session2',this.session) ;
    this.token = this.storage.getItem('token');
    if(this.token == false){
      this.router.navigateByUrl('auth/login');
    }
    
    let parameters:any = {};
    parameters.method  = 'GET';
    parameters.url = 'college/assessment/check';

    parameters.token = this.storage.getItem('token');
    // = "email=" + email + "&password=" + password ;

    this.apiService.sendRequest(parameters, 'main')
      .subscribe(
        (data:any) => {
          console.log(data.message);
         
          this.storage.setItem('college_assessement_id',data.result.assessment_details.id);
          this.storage.setItem('level',data.result.assessment_details.level);
          this.storage.setItem('university_course',data.result.assessment_details.university_course);
          this.level = data.result.assessment_details.level;
          console.log(data.result.assessment_details);
          if(data.result.assessment_details.id == undefined || data.result.assessment_details.id == null){
            this.message = data.message;
            
            alert(this.message); 
            this.storage.reset();           
            this.router.navigateByUrl('auth/login');
          }
        },
        (error:any) => {
          alert(error)
          console.log(error);
        }
      );
     
     
      
  }
 
}
