import { Injectable } from '@nestjs/common';

@Injectable()
export class tablesService {
    tables: string[];

    constructor(){
        console.log('Création des tables');
        this.tables = ['Table1', 'Table2', 'Table3'];
    }

    findAll(): string[] {
        return this.tables;
    }
}
