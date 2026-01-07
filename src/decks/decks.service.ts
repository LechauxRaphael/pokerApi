import { Injectable } from '@nestjs/common';

@Injectable()
export class DecksService {
  private suits = ['♠️ pique', '♥️ coeur', '♦️ carreau', '♣️ trèfle'];
  private values = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];

  createDeck() {
    const deck = [];
    for (const suit of this.suits) {
      for (const value of this.values) {
        deck.push({ suit, value });
      }
    }
    return deck;
  }

  shuffle(deck: any[]) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  // 🔥 burn = retire la première carte
  burn(deck: any[]) {
    if (!deck.length) {
      throw new Error('Le deck est vide');
    }
    return deck.shift();
  }

  // 🎯 usage interne
  getCardById(deck: any[], id: number) {
    if (id < 0 || id >= deck.length) {
      throw new Error('Carte inexistante');
    }
    return deck[id];
  }
}
