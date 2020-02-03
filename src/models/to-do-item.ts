
export default class {
    name!:string;
    priority! : Priority;
    edit! : boolean;
    complete! : boolean;

    constructor(){
        this.priority = new Priority();
        this.name = '';

        //default to top 
        this.priority.id = 1;
    }

}

export class Priority {
    id! : number;
    name!: string;
    rank!: number;
}
        