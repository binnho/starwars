import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ROOT_CONTEXT_API } from '../starwars.api';

@Injectable({
    providedIn: 'root'
})
export class FilmeService {

    constructor(private http: HttpClient) { }

    findFilms() {
        return this.http.get(`${ROOT_CONTEXT_API}films/`);
    }
}
