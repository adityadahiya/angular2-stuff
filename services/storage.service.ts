import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }


	setItem(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	}

	getItem(key) {
		if (localStorage.getItem(key) == null) {
			return false;
		} else {
			return JSON.parse(localStorage.getItem(key));
		}
	}

	removeItem(key) {
		localStorage.removeItem(key);
	}
	reset() {
		localStorage.clear();
	}
	isAuthenticated() {
		if (this.getItem('token')) {
			return true
		}
		else {
			return false
		}
	}

}
