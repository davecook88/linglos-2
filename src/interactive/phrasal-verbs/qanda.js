import './qanda.css';
import React from 'react';

const NUMBER_OF_OPTIONS = 3;
const questions = {
  "1": {
    id: 1,
    question: "What do you enjoy most about studying English?",
    answers: [
      "At the moment my studies centre around this exam, so I'm doing a lot of grammar and phrasal verbs. But what I like most is learning slang.",
      "I like that it isn't too hard to get started and you can just dive in. With some languages you have to learn the WHOLE grammar before you can even order a sandwich.",
      "I love the usefulness but hate the grammar, so it all sort of cancels out. Oh, I like my classmates. They're probably the best part of it.",
      "I like how you can set out to learn one thing, like phrasal verbs, and end up learning 6 other things too.",
      "The conversations that can spring up at any time. People asking for directions, someone overhearing you on a train. It doesn't happen in my own language."
    ]
  },
  "2": {
    id: 2,
    question: "Do you have the right balance between work and relaxation?",
    answers: [
      "No! My life centres around exams. All I do is study, study, study. There's no time to chill!",
      "Not at the moment because I have a lot of work to do and when I see something that needs to be done, I just dive in and don't think if I should or not.",
      "No! I'm worried about my exams and that cancels out any relaxation I do.",
      "At the start of the year I set out to spend more time relaxing and meditating but life always gets in the way. It's something I need to work on.",
      "Every time I decide to light some candles and have a bath, the phone rings or something springs up. I can't get a minute to myself!"
    ]
  },
  "3": {
    id: 3,
    question: "What would you change about the place where you live?",
    answers: [
      "Everything in my city centres around money. It's all people think about. There's no sense of culture. That's one thing I'd change.",
      "There's a lot of litter in the parks and everyone thinks everyone else will clean it up. I wish we could all just dive in and get it done.",
      "It's a poor area, but in my opinion the weather cancels it out. I wouldn't want to live somewhere cold. But if I could give everyone a bit more money, I would.",
      "A few years ago the council set out to make the town much greener, with parks and trees, but it hasn't happened yet. I'd fix that first.",
      "A lot of stupid shops have been springing up in my town. A restaurant that only serves breakfast cereal. Things like that. I'd close them all tomorrow!"
    ]
  },
  "4": {
    id: 4,
    question:
      "How important is it to have friends who share the same interests as you?",
    answers: [
      "My life centres around music, so it's VERY important to me to have friends that are also into music.",
      "I don't mind if people aren't into the same things as me, but I love my friends who are willing to dive in to a new hobby and just see if they like it.",
      "Being keen on the same things as me cancels out a lot of negative things. If you love Tears for Fears as much as me, I can forgive a lot.",
      "I don't set out to pick friends that way, but you do need something in common.",
      "Friendships can spring up anywhere for any reason. I don't think you need to have the same hobbies."
    ]
  },
  "5": {
    id: 5,
    question: "What would you do if you won the lottery?",
    answers: [
      "Right now, my life centres around paying bills and putting food on the table, so winning a lot of money would just give me a real sense of freedom.",
      "I would totally dive right in and build a new house. I love those TV shows where people build interesting homes.",
      "Wasting the money very quickly would cancel out the happiness it gave me, so I would be very slow to spend it.",
      "The day after getting the money I'd set out on a round-the-world trip.",
      "I'm sure a lot of opportunities would spring up. When you've got money a lot of people have a lot of advice for you!"
    ]
  }
};
// const oDefinitions = shuffle();

function shuffle(array) {
  var currentIndex = array.length,
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
class Answer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      word: props.word,
      answered: props.answered
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        answered: nextProps.answered,
        word: nextProps.word
      });
    }
  }

  render() {
    return <h3 className="answer">{this.state.word}</h3>;
  }
}

class Option extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: props.word,
      id: props.id,
      answered: false,
      alreadyAnswered: props.alreadyAnswered
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      if (nextProps.nextWord) {
        this.setState({
          id: nextProps.id,
          alreadyAnswered: nextProps.alreadyAnswered,
          answered: nextProps.answered,
          word: nextProps.word
        });
      } else {
        this.setState({
          alreadyAnswered: nextProps.alreadyAnswered
          //answered:nextProps.answered,
        });
      }
    }
  }

  createClassNames = () => {
    let classNames =
      this.state.answered === "correct"
        ? "Option answered"
        : this.state.answered === "wrong"
        ? "Option wrong"
        : "Option";
    if (!this.state.alreadyAnswered) classNames += " highlight";
    return classNames;
  };

  onClick = () => {
    this.props.makeNextWordFalse(); //stops the words from updating with every setState
    if (this.state.alreadyAnswered) return;
    const id = this.state.id;
    console.log("----------clicked------------");
    console.log(this.state);
    if (this.props.checkSelection(id)) {
      // this.props.findVerbForms(this.state.word.verb.split(" ")[0]);
      this.setState({ answered: "correct" });
    } else {
      this.setState({ answered: "wrong" });
    }
  };
  render() {
    return (
      <div className={this.createClassNames()} onClick={this.onClick}>
        <span className="option-text">{this.state.word}</span>
      </div>
    );
  }
}

class ControlPanel extends React.Component {
  onClick = () => {
    this.props.showNextQuestion();
  };
  render() {
    return (
      <div className="ControlPanel">
        <div className="next-question-btn" onClick={this.onClick}>
          Next question
        </div>
      </div>
    );
  }
}

class QandAGame extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: questions,
      questionNumber: 1,
      nextWord: false,
      questionAnswered: false,
      verbFormChoices: null,
      alreadyAnswered: false,
      showControlPanel: false
    };
  }

  checkSelection = id => {
    console.log("checkSelection");
    this.setState({
      alreadyAnswered: true,
      showDefinition: true
    });
    console.log(`id = ${id}`);
    console.log(`questionNumber = ${this.state.questionNumber}`);
    console.log(`this.state.questions`);
    console.log(this.state.questions);
    console.log("_----------------------------");
    if (id === this.state.questions[this.state.questionNumber].id) {
      this.setState({
        showControlPanel: true,
        questionAnswered: true
      });
      return true;
    }
    this.setState({
      showControlPanel: true,
      questionAnswered: true
    });
    return false;
  };

  checkVerbForm = selectedVerb => {
    console.log("checkVerbForm");
    const sentence = this.state.words[0].answer;
    if (~sentence.toLowerCase().indexOf(`${selectedVerb} `)) {
      this.setState({
        showControlPanel: true,
        questionAnswered: true
      });
    } else {
      alert("wrong");
      this.setState({
        showControlPanel: true,
        questionAnswered: true
      });
    }
  };

  createOptions = () => {
    function chooseRandomSentence(obj) {
      console.log(obj);
      const availableAnswers = obj.answers;
      return availableAnswers[
        Math.floor(Math.random() * availableAnswers.length)
      ];
    }

    let elArray = [];
    let questionsChosen = [this.state.questionNumber];
    let count = 1;
    while (questionsChosen.length < NUMBER_OF_OPTIONS) {
      if (!(count in this.state.questions)) count = 0;
      if (~~questionsChosen.indexOf(count)) questionsChosen.push(count);
      count++;
    }

    for (let i = 0; i < questionsChosen.length; i++) {
      let currentQuestion = this.state.questions[questionsChosen[i]];
      const el = (
        <Option
          makeNextWordFalse={this.makeNextWordFalse}
          alreadyAnswered={this.state.alreadyAnswered}
          nextWord={this.state.nextWord}
          questionAnswered={this.state.questionAnswered}
          checkSelection={this.checkSelection}
          id={currentQuestion.id}
          word={chooseRandomSentence(currentQuestion)}
          findVerbForms={this.findVerbForms}
        />
      );
      elArray.push(el);
    }

    return shuffle(elArray);
  };
  findDefinition = () => {
    const verb = this.state.words[0].verb;
    return this.state.definitions[verb];
  };

  findVerbForms = verb => {
    if (verb in this.state.verbForms) {
      this.setState({
        showVerbForms: true,
        verbFormChoices: this.state.verbForms[verb]
      });
    }
    console.log(`${verb} is not in verbForms list`);
  };

  makeNextWordFalse = () => {
    if (this.state.nextWord) {
      this.setState({ nextWord: false });
    }
  };

  showNextQuestion = () => {
    const questions = this.state.questions;
    const maxKey = Math.max.apply(Math, Object.keys(questions));
    const currentQuestionNumber = this.state.questionNumber;
    const newQuestionNumber =
      currentQuestionNumber < maxKey ? currentQuestionNumber + 1 : 1;
    this.setState({
      showControlPanel: false,
      questionAnswered: false,
      questionNumber: newQuestionNumber,
      alreadyAnswered: false,
      nextWord: true
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="title">Speaking test questions</h1>
        </header>
        <div className={"box control-panel-box"}>
          {this.state.showControlPanel ? (
            <ControlPanel showNextQuestion={this.showNextQuestion} />
          ) : (
            ""
          )}
        </div>
        <Answer
          word={this.state.questions[this.state.questionNumber].question}
          answered={this.state.questionAnswered}
        />
        <div className="options-box">{this.createOptions()}</div>
      </div>
    );
  }
}

export default QandAGame;
