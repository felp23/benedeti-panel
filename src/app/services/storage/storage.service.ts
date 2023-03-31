import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

	storageKey: any = 'benedeti_panel';

  	constructor() { }

  	removeFromStorage(param) {
		let ref = this.storageKey + '_' + param;
		window.localStorage.removeItem(ref);
	}

	async getFromStorage(param) {
		let ref = this.storageKey + '_' + param;
		return await JSON.parse(window.localStorage.getItem(ref));
	}

	sendToStorage(param, data) {
		let ref = this.storageKey + '_' + param;
		window.localStorage.setItem(ref, JSON.stringify(data));
	}


}
