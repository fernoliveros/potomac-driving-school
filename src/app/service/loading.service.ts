
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    isLoading = false;
    
    constructor() {}
    
    startLoading(): void {
      this.isLoading = true
    }

    endLoading(): void {
      this.isLoading = false
    }
}