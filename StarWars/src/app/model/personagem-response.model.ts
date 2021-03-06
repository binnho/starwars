import { Personagem } from './personagem.model';

export class PersonagemResponse {
    constructor(
        public count: number,
        public next: string,
        public previous: string,
        public results: Array<Personagem>
    ) { }
}
