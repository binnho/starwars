export class Personagem {
    constructor(
        public name: string,
        public height: string,
        public mass: string,
        public hair_color: string,
        public skin_color: string,
        public eye_color: string,
        public birth_year: string,
        public gender: string,
        public homeworld: string,
        public films: Array<string>,
        public species: Array<string>,
        public vehicles: Array<string>,
        public starships: Array<string>,
        public created: string,
        public edited: string,
        public url: string
    ) { }
}
