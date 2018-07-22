import { Injectable } from '@angular/core';
import { StorageService } from '../services/storage.service'

@Injectable()
export class AuthService {

  constructor(private storage: StorageService) { }

  get isLoggedIn() {
  	// check for token present
  	if(this.storage.getItem('token')){
  		return true
  	}
  	else{
  		return false;
  	}
  }

}
