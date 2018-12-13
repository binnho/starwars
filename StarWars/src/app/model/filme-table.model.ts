export class FilmeView {
    private title: string;
    private qtChars: number;

    public getTitle(): string {
        return this.title;
    }
    public setTitle(title: string) {
        this.title = title;
    }
    public getQtChars(): number {
        return this.qtChars;
    }
    public setQtChars(qtChars: number) {
        this.qtChars = qtChars;
    }
}
