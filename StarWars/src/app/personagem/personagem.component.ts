import { Component, OnInit } from '@angular/core';
import { PersonagemService } from '../services/personagem/personagem.service';
import { Personagem } from '../model/personagem.model';
import { PersonagemResponse } from '../model/personagem-response.model';
import { PersonagemView } from '../model/personagem-table.model';
import { URL_PAGES_PEOPLE } from '../services/starwars.api';

@Component({
    selector: 'app-personagem',
    templateUrl: './personagem.component.html',
    styleUrls: ['./personagem.component.css']
})
export class PersonagemComponent implements OnInit {

    message: {};
    classCss: {};
    listPersonagensApi: Array<Personagem>;
    listPersonagensView: Array<PersonagemView>;
    mapHomeWorld: Map<number, string>;
    mapSpecies: Map<number, string>;
    totalPages: number;
    netxPage: string;
    previousPage: string;
    constructor(
        private personagemService: PersonagemService
    ) { }

    ngOnInit() {
        this.listPersonagensApi = new Array<Personagem>();
        this.listPersonagensView = new Array<PersonagemView>();
        this.mapHomeWorld = new Map<number, string>();
        this.mapSpecies = new Map<number, string>();
        this.findFirst();
    }

    findFirst() {
        this.personagemService.findFirst().subscribe((responseApi: PersonagemResponse) => {
            this.listPersonagensApi = responseApi['results'];

            this.totalPages = Math.ceil(responseApi['count'] / this.listPersonagensApi.length);
            this.netxPage = responseApi['next'];
            this.previousPage = responseApi['previous'];

            if (typeof this.listPersonagensApi == 'undefined' || this.listPersonagensApi.length === 0) {
                return;
            }
            this.listPersonagensView = new Array();
            this.listPersonagensApi.forEach(person => {
                const personagem = new PersonagemView();
                personagem.setName(person.name);
                personagem.setHeight(person.height);
                personagem.setGender(person.gender);
                personagem.setBirthYear(person.birth_year);
                this.getHomeWorldApi(person.homeworld, personagem);
                this.getSpecieApi(person.species, personagem);

                this.listPersonagensView.push(personagem);
            });

        }, err => {
            this.showMessage({
                tipo: 'error',
                text: err['error']['errors'][0]
            });
        });

    }

    private getHomeWorldApi(url: string, personagem: PersonagemView): void {

        const key = Number(url.substring(url.length - 2, url.length - 1));

        if (key !== NaN && this.mapHomeWorld.get(key) != null) {
            personagem.setHomeworld(this.mapHomeWorld.get(key));
        } else {

            this.personagemService.findByUrl(url).subscribe((responseApi: any) => {
                personagem.setHomeworld(responseApi['name']);
                if (key !== NaN) {
                    this.mapHomeWorld.set(key, responseApi['name']);
                }
            }, err => {
                this.showMessage({
                    tipo: 'error',
                    text: err['error']['errors'][0]
                });
            });
        }

    }

    private getSpecieApi(url: string[], personagem: PersonagemView): void {
        url.forEach(element => {
            const key = Number(element.substring(element.length - 2, element.length - 1));

            if (key !== NaN && this.mapSpecies.get(key) != null) {
                console.log(this.mapSpecies.get(key));
                personagem.setSpecies(personagem.getSpecies() + ' ' + this.mapSpecies.get(key));
            } else {

                this.personagemService.findByUrl(element).subscribe((responseApi: any) => {
                    personagem.setSpecies(personagem.getSpecies() + ' ' + responseApi['name']);
                    if (key !== NaN) {
                        this.mapSpecies.set(key, responseApi['name']);
                    }
                }, err => {
                    this.showMessage({
                        tipo: 'error',
                        text: err['error']['errors'][0]
                    });
                });
            }
        });

    }

    public arrayPages(): any[] {
        const retorno = new Array<number>();
        for (let index = 1; index <= this.totalPages; index++) {
            retorno.push(index);

        }

        return retorno;
    }

    public goNetxPage(event: any) {
        event.preventDefault();
        if (this.netxPage != null) {
            this.navigatePeople(this.netxPage);
        }
    }

    public goPreviousPage(event: any) {
        event.preventDefault();
        if (this.previousPage != null) {
            this.navigatePeople(this.previousPage);
        }
    }

    public goEspecificPage(i, event: any) {
        event.preventDefault();
        if (i != null && i > 0) {
            const url = URL_PAGES_PEOPLE + i;
            this.navigatePeople(url);
        }
    }

    private navigatePeople(url: string) {

        this.personagemService.findByUrl(url).subscribe((responseApi: PersonagemResponse) => {
            this.listPersonagensApi = responseApi['results'];

            this.netxPage = responseApi['next'];
            this.previousPage = responseApi['previous'];

            if (typeof this.listPersonagensApi == 'undefined' || this.listPersonagensApi.length === 0) {
                return;
            }
            this.listPersonagensView = new Array();
            this.listPersonagensApi.forEach(person => {
                const personagem = new PersonagemView();
                personagem.setName(person.name);
                personagem.setHeight(person.height);
                personagem.setGender(person.gender);
                personagem.setBirthYear(person.birth_year);
                this.getHomeWorldApi(person.homeworld, personagem);
                this.getSpecieApi(person.species, personagem);

                this.listPersonagensView.push(personagem);
            });

        }, err => {
            this.showMessage({
                tipo: 'error',
                text: err['error']['errors'][0]
            });
        });

    }

    private showMessage(message: { tipo: string, text: string }): void {
        this.message = message;
        this.buildClasses(message.tipo);
        setTimeout(() => {
            this.message = undefined;
        }, 10000);
    }

    private buildClasses(tipo: string): void {
        this.classCss = {
            'alert': true
        };
        this.classCss['alert' + tipo] = true;
    }
}
