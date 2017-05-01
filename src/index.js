import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const diceImages = [
  '/images/dice1.png',
  '/images/dice2.png',
  '/images/dice3.png',
  '/images/dice4.png',
  '/images/dice5.png',
  '/images/dice6.png'
];

class Dice extends React.Component {
  constructor(props) {
    super();
    this.state = {
      die1: 1, die2: 2, die3: 3, die4: 4, die5: 6, die6: 5,
      spinCount: 0,
      rolls: 0,
      held: [false, false, false, false, false, false]
    };
  }

  roll = (held) => {
    // console.log(typeof held[0]);
    //   var testing_array = held.map((held_array_bool) => { //got to fix this
    //     if (held_array_bool === false) {
    //       return "false";
    //     }
    //     else {
    //       return "true";
    //     }
    //   }); //need to pull out the held dice here to set their state differently below
      this.setState({
        die1: Math.ceil(Math.random() * 6),
        die2: Math.ceil(Math.random() * 6),
        die3: Math.ceil(Math.random() * 6),
        die4: Math.ceil(Math.random() * 6),
        die5: Math.ceil(Math.random() * 6),
        die6: Math.ceil(Math.random() * 6),
        spinCount: this.state.spinCount + 1
      })
      if (this.state.spinCount <= 10) {
        setTimeout(() => {
          this.roll();
        }, 150);
      }
      else {
        this.setState({
          spinCount: 0,
          rolls: this.state.rolls + 1
        });
      }
  }

  hold = (dieValue, index) => {
    let newHeld = this.state.held.slice();
    newHeld[index - 1] = true;
    this.setState({
      held: newHeld
    });
  }

  render() {
    // var test;
    // this.state.held.map(function(item, index) {
    //   if (item === false) {
    //     test = ("/images/dice" + this.state.die1 + ".png"); //having issues with this
    //     return;
    //   }
    //   // else if (item === false) {
    //   //   test = ("/images/dice" + this.state.die1 + ".png");
    //   //   return;
    //   // }
    // });
    return (
      <div>
        <div className="header">
        <h4>ELECTRONIC<br/>HAND-HELD</h4>
          Yahtzee!
        </div>
        <div className="game-play">
          <div className="top-scoreboard">
            <img src={this.props.diceImages[0]} alt=""/><img src={this.props.diceImages[1]} alt=""/>
            <img src={this.props.diceImages[2]} alt=""/><img src={this.props.diceImages[3]} alt=""/>
            <img src={this.props.diceImages[4]} alt=""/><img src={this.props.diceImages[5]} alt=""/>
            <div className="roll-value">Roll<br/>Value</div>
            <div className="roll-value-actual">00</div>
          </div>
          <div className="bottom-scoreboard">
            <div className="three-of-a-kind">3 OF<br/> A KIND</div>
            <div className="four-of-a-kind">4 OF<br/> A KIND</div>
            <div className="full-house">FULL<br/>HOUSE</div>
            <div className="small-straight">SMALL<br/>STRAIGHT</div>
            <div className="large-straight">LARGE<br/>STRAIGHT</div>
            <div className="chance">CHANCE<br/><br/></div>
            <div className="yahtzee">YAHTZEE</div>
          </div>
          <div className="dice">
            <img src={"/images/dice" + this.state.die1 + ".png"} alt=""/><br/>
            <button className="hold btn btn-danger btn-lg" onClick={() => this.hold(this.state.die1, 1)}>Hold</button>
          </div>
          <div className="dice">
            <img src={"/images/dice" + this.state.die2 + ".png"} alt=""/><br/>
            <button className="hold btn btn-danger btn-lg" onClick={() => this.hold(this.state.die2, 2)} >Hold</button>
          </div>
          <div className="dice">
            <img src={"/images/dice" + this.state.die3 + ".png"} alt=""/><br/>
            <button className="hold btn btn-danger btn-lg" onClick={() => this.hold(this.state.die3, 3)} >Hold</button>
          </div>
          <div className="dice">
            <img src={"/images/dice" + this.state.die4 + ".png"} alt=""/><br/>
            <button className="hold btn btn-danger btn-lg" onClick={() => this.hold(this.state.die4, 4)}>Hold</button>
          </div>
          <div className="dice">
            <img src={"/images/dice" + this.state.die5 + ".png"} alt=""/><br/>
            <button className="hold btn btn-danger btn-lg" onClick={() => this.hold(this.state.die5, 5)} >Hold</button>
          </div>
          <div className="dice">
            <img src={"/images/dice" + this.state.die6 + ".png"} alt=""/><br/>
            <button className="hold btn btn-danger btn-lg" onClick={() => this.hold(this.state.die6, 6)} >Hold</button>
          </div>
        </div>
        <div>
          <button disabled={this.state.rolls === 3} className="roll btn btn-primary btn-lg" onClick={() => this.roll(this.state.held)}>{this.state.rolls === 3 ? "Out of Rolls" : "Roll"}</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Dice diceImages={diceImages}/>,
  document.getElementById('root')
);
