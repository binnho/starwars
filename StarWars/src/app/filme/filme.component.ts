import { Component, OnInit } from '@angular/core';
import { FilmeService } from '../services/filme/filme.service';
import { FilmeResponse } from '../model/filme-response.model';
import { FilmeApi } from '../model/filme.model';
import { FilmeView } from '../model/filme-table.model';

@Component({
    selector: 'app-filme',
    templateUrl: './filme.component.html',
    styleUrls: ['./filme.component.css']
})
export class FilmeComponent implements OnInit {

    title = 'app';
    public pieChartLabels: string[];
    public pieChartData: number[];
    public pieChartType = 'pie';
    public pieChartOptions: any = {
        'backgroundColor': [
            '#FF6384',
            '#4BC0C0',
            '#FFCE56',
            '#E7E9ED',
            '#36A2EB'
        ]
    };
    chartLoaded: Promise<boolean>;

    message: {};
    classCss: {};
    listFilmsApi: Array<FilmeApi>;
    listFilmsView: Array<FilmeView>;
    totalChars: number;
    constructor(
        private filmeService: FilmeService
    ) { }

    ngOnInit() {
        this.listFilmsApi = new Array();
        this.listFilmsView = new Array();
        this.totalChars = 0;
        this.loadPage();
    }

    loadPage() {
        this.filmeService.findFilms().subscribe((responseApi: FilmeResponse) => {
            this.listFilmsApi = responseApi['results'];

            if (typeof this.listFilmsApi === 'undefined' || this.listFilmsApi.length === 0) {
                return;
            }

            this.listFilmsView = new Array();
            this.listFilmsApi.forEach(element => {
                const film = new FilmeView();
                film.setTitle(element.title);
                film.setQtChars(element.characters.length);
                this.totalChars += element.characters.length;

                this.listFilmsView.push(film);
            });

            this.populateChart();
        }, err => {
            this.showMessage({
                tipo: 'error',
                text: err['error']['errors'][0]
            });
        });
    }

    private populateChart() {
        let index = 0;
        this.pieChartLabels = new Array();
        this.pieChartData = new Array();
        this.listFilmsView.forEach(element => {
            this.pieChartLabels[index] = element.getTitle();
            console.log(this.pieChartLabels[index]);
            this.pieChartData[index] = element.getQtChars();
            index++;
        });

        this.chartLoaded = Promise.resolve(true);
    }

    // events on slice click
    public chartClicked(e: any): void {
        console.log(e);
    }

    // event on pie chart slice hover
    public chartHovered(e: any): void {
        console.log(e);
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
