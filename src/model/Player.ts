
export class Player {
    public score: number;
    public name: string;
    public word: string | undefined;
    public correctlyGuessedCommonWord: boolean = false;
    public isWolf: boolean = false;
    public voted: Player | undefined = undefined
    public votes: number = 0

    constructor(name: string, score: number) {
        this.name = name;
        this.score = score;
      }

      static getBySerialized(serializedString: string) {
        const [name, score] = serializedString.split('-')
        return new Player(name, parseInt(score))
      }

    toString() {
        return `${this.name}-${this.score}`
    }

    setWord(word: string) {
      this.word = word
    }

    addPoints(wolf: Player, generalVoteCorrect: boolean) {
      if (wolf !== this) {
        this.score += this.voted === wolf && generalVoteCorrect ? 5 : 0
      } else {
        this.score += generalVoteCorrect ? 0 : 5
      }
    }

 
}