// Service for APIs call
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';

// rxjs require methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService {

  constructor(private http: Http) { }

	sendRequest(parameters, server) {
		var url = "";
		var data = parameters.data;

		// set headers
		const headers = new Headers({
			'Authorization': parameters.token,
			'Client': "web"
		});

		// get server param (if dynamic)
		if (server == 'core') {
			url = environment.base_api_main + parameters.url;
		
		}
		else if(server == 'main'){
			url = environment.py_learning + parameters.url;
	
		}
		else if(server == 'account'){
			url = environment.account_api_main + parameters.url;
		}

		var url = url;
		var data = data;

		// POST request w/o token
		if (parameters.method == 'POST' && parameters.token == undefined) {
			
			return this.http.post(url, data, { headers: headers })
				.map((response: Response) => response.json())
				.catch((error) => Observable.throw(error.json().message || 'Server error'));
		}
		// POST with token
		else if (parameters.method == 'POST' && parameters.token != undefined) {
			const headers = new Headers({

				'Authorization': 'Bearer ' +  parameters.token,
				'key': 'TcS99L07QkDezB5n4Qdw'
			});
			return this.http.post(url, data, { headers: headers })
				.map((response: Response) => response.json())
				.catch((error) => Observable.throw(error.json().message || 'Server error'));
		}
		// GET request
		else if (parameters.method == 'GET') {
			const headers = new Headers({
				'Authorization': 'Bearer ' + parameters.token,
				'Client': "web",
				'key': 'TcS99L07QkDezB5n4Qdw',
				'content-type': 'application/x-www-form-urlencoded'
			});
			//console.log('cehck')
			return this.http.get(url, { headers: headers })
				.map((response: Response) => response.json())
				.catch((error) => error.json());
		}
		// GET Request with file object
		else if (parameters.method == 'GET' && parameters.file == true) {
			const headers = new Headers({
				
			});
			return this.http.get(url, { headers: headers })
				.map((response: Response) => response.json())
				.catch((error) => error.json());
		}
		// Delete request
		else if (parameters.method == 'DELETE') {
			const headers = new Headers({
				'Authorization': parameters.token
			});

			let options = new RequestOptions({
				headers: headers,
				body: parameters.data
			});
			return this.http.delete(url, options)
				.map((response: Response) => response.json())
				.catch((error) => error.json());
		}
		// PUT request
		else if (parameters.method == 'PUT') {

			const headers = new Headers({
				'Authorization':  parameters.token
			});
			return this.http.put(url, data, { headers: headers })
				.map((response: Response) => response.json())
				.catch((error) => Observable.throw(error.json().message || 'Server error'));
		}



	}

}
