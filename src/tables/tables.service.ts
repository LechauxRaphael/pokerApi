import { Injectable, BadRequestException } from '@nestjs/common';
import { DecksService } from 'src/decks/decks.service';

@Injectable()
export class TablesService {
    private tables: {
        name: string;
        players: {
            userId: number;
            username: string;
            hand?: any[];
        }[]
        deck: any[];
    }[] = [];
    private deck: any[];

    constructor(private readonly decksService: DecksService) {
        console.log('Création des tables');
        this.tables = [
            {
                name: 'Table1',
                players: [],
                deck: this.decksService.shuffle(this.decksService.createDeck()),
            },
            {
                name: 'Table2',
                players: [],
                deck: this.decksService.shuffle(this.decksService.createDeck()),
            },
            {
                name: 'Table3',
                players: [],
                deck: this.decksService.shuffle(this.decksService.createDeck()),
            },
        ];
    }

    findAll() {
        return this.tables;
    }

    findTable(name: string) {
        return this.tables.find(t => t.name.toLowerCase() === name.toLowerCase());
    }

    joinTable(name: string, user: { userId: number; username: string }) {
        const table = this.findTable(name);
        if (!table) throw new Error('Table non trouvée');

        if (!table.players.find(p => p.userId === user.userId)) {
            table.players.push({
                ...user,
                hand: [],
            });
        }
        return table;
    }

    leaveTable(name: string, userId: number) {
        const table = this.findTable(name);
        if (!table) throw new Error('Table non trouvée');

        table.players = table.players.filter(p => p.userId !== userId);

        return table;
    }

    findDeck() {
        return this.deck;
    }

    getTableDeck(name: string) {
        const table = this.findTable(name);
        if (!table) {
            throw new Error('Table non trouvée');
        }
        return table.deck;
    }

    shuffle() {
        this.deck = this.decksService.shuffle(this.deck);
        return this.deck;
    }

    distributeHands(tableName: string) {
        const table = this.findTable(tableName);

        if (!table) {
            throw new BadRequestException('Table non trouvée');
        }

        if (table.players.length < 2) {
            throw new BadRequestException(
                `Pas assez de joueurs pour distribuer les cartes. Actuellement ${table.players.length}`
            );
        }

        table.players.forEach(player => {
            player.hand = [
                table.deck.shift(),
                table.deck.shift(),
            ];
        });

        return table.players.map(p => ({
            userId: p.userId,
            username: p.username,
            hand: p.hand,
        }));
    }
}
