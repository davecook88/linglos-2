import React from "react";
import "./IrregularVerbsGame.css";

const oVerbs = shuffle(require("./verbs.json"));

function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      word: props.word,
      flipped: props.flipped,
      counter: props.counter,
      answered: props.answered
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      flipped: nextProps.flipped,
      answered: nextProps.answered
    });
  }

  createClassList = type => {
    if (type === "card") {
      return "game-card " + (this.state.flipped ? "is-flipped " : " ");
    }
    if (type === "back") {
      return (
        "card__face card__face--back " +
        (this.state.answered ? "answered " : " ")
      );
    }
  };

  onClick = () => {
    this.props.flipCard(this.state.counter);
  };

  render() {
    return (
      <div className="scene">
        <div
          className={this.createClassList("card")}
          onClick={this.onClick}
          id={this.state.counter}
        >
          <div className="card__face card__face--front"> </div>
          <div className={this.createClassList("back")}>{this.state.word}</div>
        </div>
      </div>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
    //   verbs: props.verbs,
    //   deck: this.createDeckObj(props.verbs)
    };
  }
//   componentWillReceiveProps(nextProps) {
//     if (nextProps != this.props) {
//       const newDeck = this.createDeckObj(nextProps.verbs);
//       this.setState({
//         verbs: nextProps.verbs,
//         deck: newDeck
//       });
//     }
//   }
  checkWin = deck => {
    const selectedCards = deck.filter(card => {
      if (card.flipped && !card.answered) return card;
      return false  ;
    });
    if (selectedCards.length < 3) {
      return false;
    } else {
      const verbId = selectedCards[0].id;
      for (let i = 1; i < selectedCards.length; i++) {
        if (selectedCards[i].id !== parseInt(verbId)) {
          return false;
        }
      }
    }
    return true;
  };

  createCard = obj => {
    const w = obj.w;
    const id = obj.id;
    const c = obj.c;
    const flipped = obj.flipped;
    const answered = obj.answered;
    return (
      <Card
        word={w}
        id={id}
        counter={c}
        key={c}
        flipCard={this.flipCard}
        flipped={flipped}
        answered={answered}
      />
    );
  };

  createCardElements = () => {
    const deck = this.props.deck;
    let elArray = [];
    for (let i = 0; i < deck.length; i++) {
      elArray.push(this.createCard(deck[i]));
    }
    return elArray;
  };

  flipCard = counter => {
    let selected = this.state.selected;
    let deck = this.props.deck;
    selected++;

    for (let i = 0; i < deck.length; i++) {
      if (deck[i].c === counter) {
        deck[i].flipped = true;
        break;
      }
    }
    if (selected === 3) {
      if (this.checkWin(deck)) {
        this.props.addPoints(new Date());
        deck.forEach(card => {
          if (card.flipped) {
            card.answered = true;
          }
        });
        selected = 0;
      } else {
        setTimeout(() => {
          deck = this.unflipAll(deck);
          this.setState({
            selected: 0,
            deck: deck
          });
          return;
        }, 1000);
      }
    }
    for (let card of deck) {
      if (!card.answered) break;
    }

    this.setState({
      selected: selected,
    });
  };

  unflipAll = deck => {
    for (let i = 0; i < deck.length; i++) {
      if (!deck[i].answered) {
        deck[i].flipped = false;
      }
    }
    return deck;
  };

  render() {
    return <div className="Board">{this.createCardElements()}</div>;
  }
}

class SelectButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: props.direction
    };
  }

  onClick = () => {
    this.props.onClick(this.state.direction);
  };

  render() {
    return (
      <div className={"SelectButton"} onClick={this.onClick}>
        {this.state.direction === "up" ? ">" : "<"}
      </div>
    );
  }
}

class IrregularVerbsGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 0,
      seconds: 0,
      timerOn: false,
      gameOn: false,
      points: 0,
      verbs: oVerbs,
      numberOfCards: 6,
      startTime: new Date()
    };
    this.startTimer = this.startTimer.bind(this);
  }

  addPoints = d => {
    const base = 600;
    const secondsPassed = Math.floor((d - this.state.startTime) / 1000);
    const points = this.state.points + (base - secondsPassed);
    this.setState({ points: points });
  };

  chooseNumberOfCards = direction => {
    if (this.state.gameOn) return;

    let n = this.state.numberOfCards;
    if (direction === "up") {
      n++;
    } else {
      n--;
    }
    this.setState({ numberOfCards: n });
  };

  createDeckObj = () => {
    const createVerbSet = (v, counter) => {
      const infCard = {
        w: v.infinitive,
        id: v.id,
        c: counter,
        flipped: false,
        answered: v.answered
      };
      const pastCard = {
        w: v.past,
        id: v.id,
        c: counter + 1,
        flipped: false,
        answered: v.answered
      };
      const ppCard = {
        w: v.pastParticiple,
        id: v.id,
        c: counter + 2,
        flipped: false,
        answered: v.answered
      };

      return [infCard, pastCard, ppCard];
    };
    let deck = [];
    this.selectVerbs().forEach((verb, i) => {
      deck.push(...createVerbSet(verb, i * 3));
    });

    return shuffle(deck);
  };

  nextLevel = () => {
    const currentLevel = this.state.level;
    const newLevel = currentLevel + 1;
    this.state({ level: newLevel });
  };

  selectVerbs = () => {
    const level = this.state.level;
    return this.state.verbs.slice(level, level + this.state.numberOfCards);
  };

  startTimer() {
    if (!this.state.timerOn) {
      this.setState({
        timerOn: true,
        startTime: new Date()
      });
    }
  }
  stopTimer() {
    this.setState({
      timerOn: false
    });
  }
  render() {
    return (
      <div className="Game">
        <header className="Game-header">
          <div className={"select-div"}>
            <SelectButton
              direction={"down"}
              onClick={this.chooseNumberOfCards}
            />
            Number of cards
            <SelectButton direction={"up"} onClick={this.chooseNumberOfCards} />
          </div>
          <div className={"points-div"}>
            <span>{`Points ${this.state.points}`}</span>
          </div>
        </header>
        <Board
          deck={this.createDeckObj()}
          startGame={this.startTimer}
          stopGame={this.stopTimer}
          addPoints={this.addPoints}
          nextLevel={this.nextLevel}
        />
      </div>
    );
  }
}

export default IrregularVerbsGame;
