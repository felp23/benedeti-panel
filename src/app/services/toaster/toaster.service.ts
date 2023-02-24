import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { ConfigService } from '../config/config.service';
// import { NbToastrService, NbIconConfig, NbGlobalLogicalPosition } from '@nebular/theme';

@Injectable({
    providedIn: 'root'
})

export class ToasterService {

    private index: number = 0;
    toasterDuration: number = 60000;

    constructor(private http: HttpClient,
                public configService: ConfigService,
                // private toastrService: NbToastrService
                ) 
    { 
    }  

    showToast(title, subtitle, style) {
        // this.toastrService.show(
        //     subtitle,
        //     title,
        //     {   
        //         position: NbGlobalLogicalPosition.TOP_END, 
        //         status: style,
        //         destroyByClick: true,
        //         icon: 'alert-circle-outline'
        //     },
        // );
    };
}
