import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { ConfigService } from '../config/config.service';
import { MessageService } from 'primeng/api';
// import { NbToastrService, NbIconConfig, NbGlobalLogicalPosition } from '@nebular/theme';

@Injectable({
    providedIn: 'root'
})

export class ToasterService {

    private index: number = 0;
    toasterDuration: number = 60000;

    constructor(private http: HttpClient,
                public configService: ConfigService,
                public messageService: MessageService
                // private toastrService: NbToastrService
                ) 
    { 
    }  

    showSuccessToast(label) {
        this.messageService.add(
            {
                severity:'success', 
                summary: 'Sucesso!', 
                detail: label
            }
        );
    };

    showErrorToast(label) {
        this.messageService.add(
            {
                severity:'error', 
                summary: 'Atenção!', 
                detail: label
            }
        );
    };
}
