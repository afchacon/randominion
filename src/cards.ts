import { CardInfo } from './data/card-info';
import { Dictionary } from './models/dictionary';

export interface Expansion {
    name: string;
}

export interface Card {
    name: string;
    set: Expansion;
}

/**
 * Number that represents an index of the {@link AllCards} array.
 */
export type CardIndex = number;

const sets = CardInfo.reduce(
    (prevSets, card) => {
        return card.set in prevSets
            ? prevSets
            : { [card.set]: { name: card.set }, ...prevSets };
    },
    {} as Dictionary<Expansion>
);

export const AllCards: Card[] = CardInfo.map(card => ({
    name: card.name,
    set: sets[card.set]!
}));

export function getCardsToDisplay() {
    return Array(10)
        .fill(1) /* Not sure why this is needed O_o */
        .map(_ => Math.floor(Math.random() * AllCards.length));
}
