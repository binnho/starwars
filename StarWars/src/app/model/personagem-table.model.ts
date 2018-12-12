export class PersonagemView {

    private name: string;
    private height: string;
    private gender: string;
    private birthYear: string;
    private homeworld: string;
    private species: string;

    constructor() {
        this.species = '';
     }

    public getName(): string {
        return this.name;
    }
    public setName(name: string) {
        this.name = name;
    }

    public getHeight(): string {
        return this.height;
    }
    public setHeight(height: string) {
        this.height = height;
    }

    public getGender(): string {
        return this.gender;
    }
    public setGender(gender: string) {
        this.gender = gender;
    }

    public getBirthYear(): string {
        return this.birthYear;
    }
    public setBirthYear(birthYear: string) {
        this.birthYear = birthYear;
    }

    public getHomeworld(): string {
        return this.homeworld;
    }
    public setHomeworld(homeworld: string) {
        this.homeworld = homeworld;
    }

    public getSpecies(): string {
        return this.species;
    }
    public setSpecies(species: string) {
        this.species = species;
    }

}
