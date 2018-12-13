import { FilmeApi } from './filme.model';

export class FilmeResponse {
    constructor(
        public count: number,
        public next: string,
        public previous: string,
        public results: Array<FilmeApi>
    ) { }
}
