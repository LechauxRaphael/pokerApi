import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MoneyService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
      ) {}

    async getMoney(userId: number): Promise<{ username: string; argent: number }> {
        const user = await this.usersRepository.findOne({ where: { userId: userId } });
        const money = user?.money;
        return {
            username: user?.username ?? 'Inconnu',
            argent: money ?? 0
        };
      }

    async findOnePlayer(userId: number): Promise<User | undefined> {
        const user = await this.usersRepository.findOne({ where: { userId: userId } });
        return user ?? undefined;
      }
}
