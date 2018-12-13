export class FilmeApi {
    constructor(
        public title: string,
        public episode_id: number,
        public opening_crawl: string,
        public director: string,
        public producer: string,
        public release_date: string,
        public characters: Array<string>,
        public planets: Array<string>,
        public starships: Array<string>,
        public vehicles: Array<string>,
        public species: Array<string>,
        public created: string,
        public edited: string,
        public url: string
    ) { }
}
