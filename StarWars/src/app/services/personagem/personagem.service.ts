import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ROOT_CONTEXT_API } from '../starwars.api';

@Injectable({
    providedIn: 'root'
})
export class PersonagemService {

    constructor(private http: HttpClient) { }

    findFirst() {
        return this.http.get(`${ROOT_CONTEXT_API}people/`);
    }

    findByUrl(url: string) {
        return this.http.get(url);
    }
}
