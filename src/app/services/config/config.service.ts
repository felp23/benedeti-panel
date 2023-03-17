import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})

export class ConfigService {

    modalIsActive: boolean = false;

    baseURL: string = "http://localhost:3030/";
    imageURL: string = "http://localhost:3030/images/";
    viewURL: string = "";

    currentPage: any = [];

	constructor() { }

    // === DEFAULT

    formatTimeWithSecondsToFront(datetime: any) {
        console.log('DATETIME.CONFIG: ', datetime);
        const data = new Date(datetime);
        const hora = data.getHours();
        const minutos = data.getMinutes();
        const segundos = data.getSeconds();
        const response: any = {
            hour: hora,
            minuts: minutos,
            seconds: segundos
        }
        return response;
    }

    formatTimeToFront(datetime: any) {
        console.log('DATETIME.CONFIG: ', datetime);
        const data = new Date(datetime);
        const hora = data.getHours();
        const minutos = data.getMinutes();
        const response: any = {
            hour: hora,
            minuts: minutos
        }
        return `${hora}:${minutos}`;
    }

    getToday() {
        var today: any = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        return today = mm + '' + dd + '' + yyyy;
    }

    newDate(date) {
        var today: any = new Date(date);
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        return yyyy + '-' + mm + '-' + dd;
    }

    moneyFormat(n) {
        // console.log(n);
        n = parseFloat(n);
        return "R$ " + n.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
    }

    insert(str, index, value) {
      return str.substr(0, index) + value + str.substr(index);
    }

    formatDate(d) {
        let date = this.insert(d, 2, '-');
        date = this.insert(date, 5, '-');
        date = date.split('-')[2] + '-' + date.split('-')[1] + '-' + date.split('-')[0];
        return date;
    }

    formatDatetimeToText(dateTime) {
        // console.log(dateTime);
        let data = new Date(dateTime.split(" ")[0].replace(/ /g, "T"));
        data.setDate(data.getDate() + 1);
        var day = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"][data.getDay()];
        var date = data.getDate();
        var month = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"][data.getMonth()];
        var year = data.getFullYear();
        return day + ", " + date + " de " + month + " de " + year;
    }

    formatDatetimeToFront(datetime) {
        return this.formatDateToFront(datetime) + ' ' + 'às' + ' ' + this.formatHourToFront(datetime);
    }

    formatDateToFront(datetime) {
        let newDate = datetime.split(' ')[0];
        newDate = newDate.split('-')[2] + '/' + newDate.split('-')[1] +  '/' + newDate.split('-')[0];
        return newDate;
    }

    formatHourToFront(datetime) {
        let newHour = datetime.split(' ')[1];
        newHour = newHour.split(':')[0] + ':' + newHour.split(':')[1];
        return newHour;
    }

    formatDateToMySQL(date) {
        var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    // translateConsumptionType(type) {
    //     if (type == 'consumption') {
    //         return 'Consumo';
    //     } else if (type == 'manual') {
    //         return 'Manual';
    //     } else if (type == 'giveaway') {
    //         return 'Sorteio';
    //     }
    // }

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    checkIfDocumentIsValid(cpf: string): boolean {
        if (cpf == null) {
            return false;
        }
        if (cpf.length != 11) {
            return false;
        }
        if ((cpf == '00000000000') || (cpf == '11111111111') || (cpf == '22222222222') || (cpf == '33333333333') || (cpf == '44444444444') || (cpf == '55555555555') || (cpf == '66666666666') || (cpf == '77777777777') || (cpf == '88888888888') || (cpf == '99999999999')) {
            return false;
        }
        let numero: number = 0;
        let caracter: string = '';
        let numeros: string = '0123456789';
        let j: number = 10;
        let somatorio: number = 0;
        let resto: number = 0;
        let digito1: number = 0;
        let digito2: number = 0;
        let cpfAux: string = '';
        cpfAux = cpf.substring(0, 9);
        for (let i: number = 0; i < 9; i++) {
            caracter = cpfAux.charAt(i);
            if (numeros.search(caracter) == -1) {
                return false;
            }
            numero = Number(caracter);
            somatorio = somatorio + (numero * j);
            j--;
        }
        resto = somatorio % 11;
        digito1 = 11 - resto;
        if (digito1 > 9) {
            digito1 = 0;
        }
        j = 11;
        somatorio = 0;
        cpfAux = cpfAux + digito1;
        for (let i: number = 0; i < 10; i++) {
            caracter = cpfAux.charAt(i);
            numero = Number(caracter);
            somatorio = somatorio + (numero * j);
            j--;
        }
        resto = somatorio % 11;
        digito2 = 11 - resto;
        if (digito2 > 9) {
            digito2 = 0;
        }
        cpfAux = cpfAux + digito2;
        if (cpf != cpfAux) {
            return false;
        }
        else {
            return true;
        }
    }

    formatCPF(document){   
        //retira os caracteres indesejados...
        document = document.replace(/[^\d]/g, "");
      
        //realizar a formatação...
          return document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    fortmatPhone(number) {
        //normalize string and remove all unnecessary characters
        number = number.replace(/[^\d]/g, "");
    
        //check if number length equals to 10
        if (number.length == 11) {
            //reformat and return phone number
            return number.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        }
    
        return null;
    }
    cloneObject(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
}
