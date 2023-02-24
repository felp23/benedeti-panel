import { Injectable, Component } from '@angular/core';

import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})

export class SharedService {

    home: MenuItem;
    items: MenuItem[];

    constructor(
        private messageService: MessageService,
        private primengConfig: PrimeNGConfig
    ) { 
    }

    showDeleteConfirmToast() {
        this.messageService.clear();
        this.messageService.add({
            key: 'ct', 
            sticky: true, 
            severity:'warn', 
            summary:'Atenção!', 
            detail:'Tem certeza que deseja apagar?'});
    }

    toastAddSuccess() {
        console.log('Teste');
        this.messageService.add({
            severity: 'success', 
            summary: 'Cadastro realizdo com sucesso', 
            // detail:'Via MessageService',
            key:'globalToast'
        });
    }

    toastCustomSuccess(message) {
        console.log('Sucesso');
        this.messageService.add({
            severity: 'success', 
            summary: message, 
            // detail:'Via MessageService',
            key:'globalToast'
        });
    }


    toastCustomErrorAlert(message) {
        console.log('Teste');
        this.messageService.add({
            severity: 'danger', 
            summary: message, 
            // detail:'Via MessageService',
            key:'customError'
        });
    }

    addMultiple() {
        this.messageService.addAll([
            {
                severity:'success', 
                summary:'Service Message', 
                detail:'Via MessageService'
            },
            {
                severity:'info', 
                summary:'Info Message', 
                detail:'Via MessageService'
            }
        ]);
    }

    clear() {
        this.messageService.clear();
    }
}
