import { Controller, Dependencies, Get } from '@nestjs/common';
import { tablesService } from './tables.service';

@Controller('tables')
@Dependencies(tablesService)
export class TablesController {

    tablesService: tablesService;
    constructor(tablesService: tablesService){
        this.tablesService = tablesService;
    }

    @Get()
    findAll(){
        return this.tablesService.findAll();
    }
}
