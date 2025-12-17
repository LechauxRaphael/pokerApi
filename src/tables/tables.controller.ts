import { Controller, Dependencies, Get, Post, Body, UseGuards } from '@nestjs/common';
import { TablesService } from './tables.service';

@Controller('tables')
@Dependencies(TablesService)
export class TablesController {

    tablesService: TablesService;
    constructor(tablesService: TablesService) {
        this.tablesService = tablesService;
    }

    @Get()
    findAll() {
        return this.tablesService.findAll();
    }

    @Get('deck')
    findDeck() {
        return this.tablesService.findDeck();
    }

    @Get('deckshuffle')
    shuffle() {
        return this.tablesService.shuffle();
    }

    @Post('distribute')
        distribute(@Body('deck') deck?: any[]) {
        return this.tablesService.distribute();
    }
}
