interface Card {
    id: number;
    value: string;
    isFlipped: boolean;
    isMatched: boolean;
}

class CardMatchGame {
    private cards: Card[] = [];
    private attemptsLeft: number = 3;
    private flippedCards: HTMLElement[] = [];
    private isChecking: boolean = false;
    private matchesFound: number = 0;

    private boardElement: HTMLElement;
    private attemptsElement: HTMLElement;
    private messageElement: HTMLElement;
    private restartButton: HTMLElement;

    private readonly CARD_VALUES = ['A', 'B', 'C'];

    constructor() {
        this.boardElement = document.getElementById('board')!;
        this.attemptsElement = document.getElementById('attempts-count')!;
        this.messageElement = document.getElementById('game-message')!;
        this.restartButton = document.getElementById('restart-btn')!;

        this.restartButton.addEventListener('click', () => this.initGame());
        this.initGame();
    }

    private initGame(): void {
        this.attemptsLeft = 3;
        this.matchesFound = 0;
        this.flippedCards = [];
        this.isChecking = false;

        this.messageElement.textContent = '';
        this.messageElement.className = 'game-message hidden';
        this.restartButton.classList.add('hidden');
        this.attemptsElement.textContent = this.attemptsLeft.toString();

        this.generateCards();
        this.renderBoard();
    }

    private generateCards(): void {
        let cardList: Card[] = [];
        let idCounter = 0;

        // Create 3 pairs (6 cards total)
        this.CARD_VALUES.forEach(value => {
            for (let i = 0; i < 2; i++) {
                cardList.push({
                    id: idCounter++,
                    value: value,
                    isFlipped: false,
                    isMatched: false
                });
            }
        });

        // Shuffle cards randomly (Fisher-Yates algorithm)
        for (let i = cardList.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cardList[i], cardList[j]] = [cardList[j], cardList[i]];
        }

        this.cards = cardList;
    }

    private renderBoard(): void {
        this.boardElement.innerHTML = '';

        this.cards.forEach((card, index) => {
            const cardElement = document.createElement('button');
            cardElement.classList.add('card');
            cardElement.dataset.index = index.toString();

            if (card.isFlipped || card.isMatched) {
                cardElement.classList.add('flipped');
            }

            cardElement.innerHTML = `
                <div class="card-inner">
                    <div class="card-back"></div>
                    <div class="card-front">${card.value}</div>
                </div>
            `;

            cardElement.addEventListener('click', () => this.handleCardClick(index, cardElement));
            this.boardElement.appendChild(cardElement);
        });
    }

    private handleCardClick(index: number, cardElement: HTMLElement): void {
        const clickedCard = this.cards[index];

        // Guard clauses against invalid clicks
        if (
            this.isChecking || 
            clickedCard.isFlipped || 
            clickedCard.isMatched || 
            this.attemptsLeft <= 0
        ) {
            return;
        }

        // Flip card visually and in state
        clickedCard.isFlipped = true;
        cardElement.classList.add('flipped');
        this.flippedCards.push(cardElement);

        // When 2 cards are selected, check for match
        if (this.flippedCards.length === 2) {
            this.isChecking = true;
            this.evaluateMatch();
        }
    }

    private evaluateMatch(): void {
        const [card1Element, card2Element] = this.flippedCards;
        const index1 = parseInt(card1Element.dataset.index!);
        const index2 = parseInt(card2Element.dataset.index!);

        const card1 = this.cards[index1];
        const card2 = this.cards[index2];

        if (card1.value === card2.value) {
            // Match found
            card1.isMatched = true;
            card2.isMatched = true;
            this.matchesFound++;
            this.resetTurnState();

            if (this.matchesFound === this.CARD_VALUES.length) {
                this.endGame(true);
            }
        } else {
            // No match -> Reduce attempt count
            this.attemptsLeft--;
            this.attemptsElement.textContent = this.attemptsLeft.toString();

            setTimeout(() => {
                card1.isFlipped = false;
                card2.isFlipped = false;
                card1Element.classList.remove('flipped');
                card2Element.classList.remove('flipped');
                this.resetTurnState();

                if (this.attemptsLeft <= 0) {
                    this.endGame(false);
                }
            }, 1000); // 1-second delay so user can see mismatched cards
        }
    }

    private resetTurnState(): void {
        this.flippedCards = [];
        this.isChecking = false;
    }

    private endGame(hasWon: boolean): void {
        if (hasWon) {
            this.messageElement.textContent = 'Congratulations! You found all the matches!';
            this.messageElement.className = 'game-message win';
        } else {
            this.messageElement.textContent = 'Game Over! Out of attempts.';
            this.messageElement.className = 'game-message lose';
        }
        this.restartButton.classList.remove('hidden');
    }
}

// Initialize the game when the DOM loads
document.addEventListener('DOMContentLoaded', () => {
    new CardMatchGame();
});