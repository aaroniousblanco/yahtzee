import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import classnames from 'classnames';

const diceImages = [
  '/images/dice1.png',
  '/images/dice2.png',
  '/images/dice3.png',
  '/images/dice4.png',
  '/images/dice5.png',
  '/images/dice6.png'
];

class Dice extends React.Component {
  constructor() {
    super();
    this.state = {
      die1: 6, die2: 6, die3: 6, die4: 6, die5: 6,
      spinCount: 0,
      rolls: 0,
      held: [false, false, false, false, false],
      roll_value: 0,
      user_score: 0,
      scoring_combo_selected: false,
      score_entered: false,
      ones: false, twos: false, threes: false, fours: false, fives: false, sixes: false,
      three_kind: false, four_kind: false, full: false, small: false, large: false, chance: false,
      yahtzee_real: 0,
      yahtzee_fake: 0,
      bonus: 0,
      top_level_score: 0,
      message: "",
      game_over_message: "",
      top_level_bonus_message: "",
      sub_total_toggle: true,
      high_score: 0
    };
  }

  upperSectionScoringChecker = (die_numeric_value, array) => {
    let upper_selected;
    if (die_numeric_value === 1) {
      upper_selected = 'ones';
    } else if (die_numeric_value === 2) {
      upper_selected = 'twos';
    } else if (die_numeric_value === 3) {
      upper_selected = 'threes';
    } else if (die_numeric_value === 4) {
      upper_selected = 'fours';
    } else if (die_numeric_value === 5) {
      upper_selected = 'fives';
    } else if (die_numeric_value === 6) {
      upper_selected = 'sixes';
    }
    let sorted_array = array.sort((a, b) => {
      return a - b;
    });
    let filtered_array = sorted_array.filter((number) =>
      number === die_numeric_value
    );
    this.setState({
      roll_value: filtered_array.length * die_numeric_value,
      scoring_combo_selected: upper_selected
    })
  }
  threeOfAKindScoringChecker = (array) => {
    let sorted_array = array.sort((a, b) => {
      return a - b;
    });
    let dice_sum = array.reduce((a, b) => {
      return a + b;
    }, 0);
    let score = 0;
    if (sorted_array[0] === sorted_array[2]) {
      score = dice_sum;
    }
    else if (sorted_array[1] === sorted_array[3]) {
      score = dice_sum;
    }
    else if (sorted_array[2] === sorted_array[4]) {
      score = dice_sum;
    }
    else if (sorted_array[3] === sorted_array[5]) {
      score = sorted_array[3] * 3;
    }
    else if (sorted_array[4] === sorted_array[6]) {
      score = dice_sum;
    }
    this.setState({
      roll_value: score,
      scoring_combo_selected: 'three_kind'
    })
  }
  fourOfAKindScoringChecker = (array) => {
    let sorted_array = array.sort((a, b) => {
      return a - b;
    });
    let dice_sum = array.reduce((a, b) => {
      return a + b;
    }, 0);
    let score = 0;
    if (sorted_array[0] === sorted_array[3]) {
      score = dice_sum;
    }
    else if (sorted_array[1] === sorted_array[4]) {
      score = dice_sum;
    }
    else if (sorted_array[2] === sorted_array[5]) {
      score = dice_sum;
    }
    else if (sorted_array[3] === sorted_array[6]) {
      score = dice_sum;
    }
    this.setState({
      roll_value: score,
      scoring_combo_selected: 'four_kind'
    })
  }
  largeStraightScoringChecker = (array) => {
    let roll_value = 0;
    let sorted_array = array.sort((a, b) => {
      return a - b;
    });
    if (sorted_array[0] === 1 && sorted_array[1] === 2 && sorted_array[2] === 3 && sorted_array[3] === 4 && sorted_array[4] === 5) {
      roll_value = 40;
    }
    else if (sorted_array[0] === 2 && sorted_array[1] === 3 && sorted_array[2] === 4 && sorted_array[3] === 5 && sorted_array[4] === 6) {
      roll_value = 40;
    }
    this.setState({
      roll_value: roll_value,
      scoring_combo_selected: 'large'
    })
  }
  smallStraightScoringChecker = (array) => {
    let roll_value = 0;
    let sorted_array = array.sort((a, b) => {
      return a - b;
    });
    let filtered_array = sorted_array.filter(function(item, position, arr) { //removes duplicate values from sorted_array
      return !position || item !== arr[position - 1];
    });
    if (filtered_array[0] === 1 && filtered_array[1] === 2 && filtered_array[2] === 3 && filtered_array[3] === 4) {
      roll_value = 30;
    }
    else if (filtered_array[0] === 2 && filtered_array[1] === 3 && filtered_array[2] === 4 && filtered_array[3] === 5) {
      roll_value = 30;
    }
    else if (filtered_array[0] === 3 && filtered_array[1] === 4 && filtered_array[2] === 5 && filtered_array[3] === 6) {
      roll_value = 30;
    }
    else if (filtered_array[1] === 1 && filtered_array[2] === 2 && filtered_array[3] === 3 && filtered_array[4] === 4) {
      roll_value = 30;
    }
    else if (filtered_array[1] === 2 && filtered_array[2] === 3 && filtered_array[3] === 4 && filtered_array[4] === 5) {
      roll_value = 30;
    }
    else if (filtered_array[1] === 3 && filtered_array[2] === 4 && filtered_array[3] === 5 && filtered_array[4] === 6) {
      roll_value = 30;
    }
    this.setState({
      roll_value: roll_value,
      scoring_combo_selected: 'small'
    });
  }
  fullHouseScoringChecker = (array) => {
    let roll_value = 0;
    let sorted_array = array.sort((a, b) => {
      return a - b;
    });
    if (sorted_array[0] === sorted_array[1] && sorted_array[2] === sorted_array[4] && sorted_array[0] !== sorted_array[2]) {
      roll_value = 25;
    }
    else if (sorted_array[0] === sorted_array[2] && sorted_array[3] === sorted_array[4] && sorted_array[0] !== sorted_array[3]) {
      roll_value = 25;
    }
    this.setState({
      roll_value: roll_value,
      scoring_combo_selected: 'full'
    });
  }
  yahtzeeScoringChecker = (array) => { //fix this so player can only enter a non-yahtzee score once
    let roll_value = 0;
    let sorted_array = array.sort((a, b) => {
      return a - b;
    });
    if (sorted_array[0] === sorted_array[4] && this.state.yahtzee_real === 0) {
      roll_value = 50;
      this.setState({
        roll_value: roll_value,
        scoring_combo_selected: 'yahtzee_real'
      });
    }
    else if (sorted_array[0] === sorted_array[4] && this.state.yahtzee_real === 1) {
      roll_value = 150;
      this.setState({
        roll_value: roll_value,
        scoring_combo_selected: 'yahtzee_real'
      });
    }
    else {
      this.setState({
         roll_value: 0,
         scoring_combo_selected: 'yahtzee_fake'
      });
    }
  }
  chanceScoringChecker = (array) => {
    let chance_sum = array.reduce((a, b) => {
      return a + b;
    }, 0);
    this.setState({
      roll_value: chance_sum,
      scoring_combo_selected: 'chance'
    })
  }
  enterScore = () => {
    let upper_score;
    if (this.state.scoring_combo_selected !== 'yahtzee_real' && this.state.scoring_combo_selected !== 'yahtzee_fake') {
          if (this.state.scoring_combo_selected === 'ones' || this.state.scoring_combo_selected === 'twos' || this.state.scoring_combo_selected === 'threes' || this.state.scoring_combo_selected === 'fours' || this.state.scoring_combo_selected === 'fives' || this.state.scoring_combo_selected === 'sixes') {
            upper_score = this.state.roll_value;
          } else {
            upper_score = 0;
          }
          var newState = {
            [this.state.scoring_combo_selected]: true,
            user_score: this.state.user_score + this.state.roll_value,
            roll_value: 0,
            score_entered: true,
            rolls: 0,
            held: [false, false, false, false, false],
            message: "",
            top_level_score: this.state.top_level_score + upper_score
          };
          this.setState(newState);
    } else if (this.state.scoring_combo_selected === 'yahtzee_real') {
        this.setState({
          user_score: this.state.user_score + this.state.roll_value,
          yahtzee_real: this.state.yahtzee_real + 1,
          yahtzee_fake: this.state.yahtzee_fake + 1,
          roll_value: 0,
          score_entered: true,
          rolls: 0,
          held: [false, false, false, false, false],
          message: ""
        });
    } else if (this.state.scoring_combo_selected === 'yahtzee_fake') {
        if (this.state.yahtzee_real > 0 || this.state.yahtzee_fake > 0) {
            this.setState({
                message: "NO MORE YAHTZEE SPACES. SCORE"
            });
        } else {
            this.setState({
                yahtzee_real: this.state.yahtzee_real + 1,
                yahtzee_fake: this.state.yahtzee_fake + 1,
                roll_value: 0,
                score_entered: true,
                rolls: 0,
                held: [false, false, false, false, false],
                message: ""
            });
        }
    }
  }

  gameOverChecker = () => { //returns true if all scoring combos and at least one yahtzee has been selected by the player
    let high_score;
    if (this.state.user_score > this.state.high_score) {
        high_score = this.state.user_score
    } else {
        high_score = this.state.high_score
    }
    let s = this.state;
    let array = [s.ones, s.twos, s.threes, s.fours, s.fives, s.sixes, s.three_kind, s.four_kind, s.full, s.small, s.large, s.chance];
    let game_over_indicator = array.every(bool => {return bool === true});
    if ((game_over_indicator && this.state.yahtzee_real > 0) || (game_over_indicator && this.state.yahtzee_fake > 0)) {
        this.bonusChecker();
        this.setState({
            game_over_message: 'GAME OVER!',
            high_score: high_score
        });
    }
  }
  roll = (held) => {
      this.gameOverChecker();
      if (this.state.game_over_message.length === 0) {
          var holding_status_array = held.map((held_array_bool, index) => {
            if (held_array_bool === false) {
              return Math.ceil(Math.random() * 6);
            }
            else {
              var scoring_array = [this.state.die1, this.state.die2, this.state.die3, this.state.die4, this.state.die5];
              return scoring_array[index];
            }
          });
          this.setState({
            die1: holding_status_array[0],
            die2: holding_status_array[1],
            die3: holding_status_array[2],
            die4: holding_status_array[3],
            die5: holding_status_array[4],
            spinCount: this.state.spinCount + 1,
            score_entered: false,
            scoring_combo_selected: false,
            roll_value: 0
          })
          if (this.state.spinCount <= 10) {
            setTimeout(() => {
              this.roll(held);
            }, 150);
          }
          else {
            this.setState({
              spinCount: 0,
              rolls: this.state.rolls + 1
            });
          }
      }
  }
  hold = (dieValue, index) => {
    let newHeld = this.state.held.slice();
    if (newHeld[index - 1] === true) {
      newHeld[index - 1] = false;
    } else {
      newHeld[index - 1] = true;
    }
    this.setState({
      held: newHeld
    });
  }
  newGame = () => {
    this.setState({
      die1: 6, die2: 6, die3: 6, die4: 6, die5: 6,
      spinCount: 0,
      rolls: 0,
      held: [false, false, false, false, false],
      roll_value: 0,
      user_score: 0,
      scoring_combo_selected: false,
      score_entered: false,
      ones: false, twos: false, threes: false, fours: false, fives: false, sixes: false,
      three_kind: false, four_kind: false, full: false, small: false, large: false, chance: false,
      yahtzee_real: 0,
      yahtzee_fake: 0,
      top_level_bonus_message: "",
      game_over_message: "",
      message: "",
      top_level_score: 0
    });
  }
  bonusChecker = () => { //this is called inside gameOverChecker
    if (this.state.ones && this.state.twos && this.state.threes && this.state.fours && this.state.fives && this.state.sixes) {
      if (this.state.top_level_score >= 63) {
        this.setState({
          bonus: 35,
          user_score: this.state.user_score + 35,
          top_level_bonus_message: 'BONUS WON!'
        });
      }
    }
  }
  showSubTotal = () => {
      if (this.state.sub_total_toggle) {
          this.setState({
             sub_total_toggle: false
          });
      } else if (this.state.sub_total_toggle === false) {
          this.setState({
             sub_total_toggle: true
          });
      }
  }

  render() {
    var scoring_array = [this.state.die1, this.state.die2, this.state.die3, this.state.die4, this.state.die5];
    return (
      <div>
        <div className="header">
        <h4>ELECTRONIC<br/>HAND-HELD</h4>
          Yahtzee!
        </div>
        <div className="game-play">
          <div className="top-scoreboard">
            <div>
                <input type="image" disabled={this.state.rolls === 0 || this.state.ones} src={this.props.diceImages[0]} className="btTxt submit" onClick={() => this.upperSectionScoringChecker(1, scoring_array)}/>
                {this.state.ones ? <img className="arrow" src="/images/caret-arrow-up.svg" alt=""/> : <img className="arrow-hidden" src="/images/caret-arrow-up-yellow.svg" alt=""/>}
            </div>
            <div>
                <input type="image" disabled={this.state.rolls === 0 || this.state.twos} src={this.props.diceImages[1]} className="btTxt submit" onClick={() => this.upperSectionScoringChecker(2, scoring_array)}/>
                {this.state.twos ? <img className="arrow" src="/images/caret-arrow-up.svg" alt=""/> : <img className="arrow-hidden" src="/images/caret-arrow-up-yellow.svg" alt=""/>}
            </div>
            <div>
                <input type="image" disabled={this.state.rolls === 0 || this.state.threes} src={this.props.diceImages[2]} className="btTxt submit" onClick={() => this.upperSectionScoringChecker(3, scoring_array)}/>
                {this.state.threes ? <img className="arrow" src="/images/caret-arrow-up.svg" alt=""/> : <img className="arrow-hidden" src="/images/caret-arrow-up-yellow.svg" alt=""/>}
            </div>
            <div>
                <input type="image" disabled={this.state.rolls === 0 || this.state.fours} src={this.props.diceImages[3]} className="btTxt submit" onClick={() => this.upperSectionScoringChecker(4, scoring_array)}/>
                {this.state.fours ? <img className="arrow" src="/images/caret-arrow-up.svg" alt=""/> : <img className="arrow-hidden" src="/images/caret-arrow-up-yellow.svg" alt=""/>}
            </div>
            <div>
                <input type="image" disabled={this.state.rolls === 0 || this.state.fives} src={this.props.diceImages[4]} className="btTxt submit" onClick={() => this.upperSectionScoringChecker(5, scoring_array)}/>
                {this.state.fives ? <img className="arrow" src="/images/caret-arrow-up.svg" alt=""/> : <img className="arrow-hidden" src="/images/caret-arrow-up-yellow.svg" alt=""/>}
            </div>
            <div>
                <input type="image" disabled={this.state.rolls === 0 || this.state.sixes} src={this.props.diceImages[5]} className="btTxt submit" onClick={() => this.upperSectionScoringChecker(6, scoring_array)}/>
                {this.state.sixes ? <img className="arrow" src="/images/caret-arrow-up.svg" alt=""/> : <img className="arrow-hidden" src="/images/caret-arrow-up-yellow.svg" alt=""/>}
            </div>
            <div className={classnames("sub_total_toggle_false", {'sub_total_toggle' : this.state.sub_total_toggle})}>
                SUB<br/>TOTAL
            </div>
            <div className={classnames("sub_total_toggle_false_value", {'sub_total_toggle' : this.state.sub_total_toggle, 'roll-value-actual' : this.state.sub_total_toggle,})}>
                {this.state.top_level_score}
            </div>
            <div className="roll-value">
                ROLL<br/>VALUE
            </div>
            <div className="roll-value-actual">
                {this.state.roll_value === 0 ? "00" : this.state.roll_value < 10 ? "0" + this.state.roll_value : this.state.roll_value}
            </div>
          </div>
          <div className="bottom-scoreboard">
            <div>
                <button disabled={this.state.rolls === 0 || this.state.three_kind} type="submit" className="bottom-scoreboard_button btn btn-primary" onClick={() => this.threeOfAKindScoringChecker(scoring_array)}>
                    3 OF<br/>A KIND
                </button>
                {this.state.three_kind ? <img className="arrow-bottom" src="/images/caret-arrow-up.svg" alt=""/> : <img className="arrow-bottom-hidden" src="/images/caret-arrow-up-yellow.svg" alt=""/>}
            </div>
            <div>
                <button disabled={this.state.rolls === 0 || this.state.four_kind === true} type="submit" className="bottom-scoreboard_button btn btn-primary" onClick={() => this.fourOfAKindScoringChecker(scoring_array)}>
                    4 OF<br/>A KIND
                </button>
                {this.state.four_kind ? <img className="arrow-bottom" src="/images/caret-arrow-up.svg" alt=""/> : <img className="arrow-bottom-hidden" src="/images/caret-arrow-up-yellow.svg" alt=""/>}
            </div>
            <div>
                <button disabled={this.state.rolls === 0 || this.state.full === true} type="submit" className="bottom-scoreboard_button btn btn-primary" onClick={() => this.fullHouseScoringChecker(scoring_array)}>
                    FULL<br/>HOUSE
                </button>
                {this.state.full ? <img className="arrow-bottom" src="/images/caret-arrow-up.svg" alt=""/> : <img className="arrow-bottom-hidden" src="/images/caret-arrow-up-yellow.svg" alt=""/>}
            </div>
            <div>
                <button disabled={this.state.rolls === 0 || this.state.small === true} type="submit" className="bottom-scoreboard_button btn btn-primary" onClick={() => this.smallStraightScoringChecker(scoring_array)}>
                    SMALL<br/>STRAIGHT
                </button>
                {this.state.small ? <img className="arrow-bottom" src="/images/caret-arrow-up.svg" alt=""/> : <img className="arrow-bottom-hidden" src="/images/caret-arrow-up-yellow.svg" alt=""/>}
            </div>
            <div>
                <button disabled={this.state.rolls === 0 || this.state.large === true} type="submit" className="bottom-scoreboard_button btn btn-primary" onClick={() => this.largeStraightScoringChecker(scoring_array)}>
                    LARGE<br/>STRAIGHT
                </button>
                {this.state.large ? <img className="arrow-bottom" src="/images/caret-arrow-up.svg" alt=""/> : <img className="arrow-bottom-hidden" src="/images/caret-arrow-up-yellow.svg" alt=""/>}
            </div>
            <div>
                <button disabled={this.state.rolls === 0 || this.state.chance === true} type="submit" className="bottom-scoreboard_button btn btn-primary" onClick={() => this.chanceScoringChecker(scoring_array)}>
                    CHANCE
                </button>
                {this.state.chance ? <img className="arrow-bottom" src="/images/caret-arrow-up.svg" alt=""/> : <img className="arrow-bottom-hidden" src="/images/caret-arrow-up-yellow.svg" alt=""/>}
            </div>
            <div>
                <button disabled={this.state.rolls === 0} type="submit" className="yahtzee btn btn-primary" onClick={() => this.yahtzeeScoringChecker(scoring_array)} >
                    YAHTZEE
                </button>
                {this.state.yahtzee_fake || this.state.yahtzee_real ? <img className="arrow-bottom" src="/images/caret-arrow-up.svg" alt=""/> : <img className="arrow-bottom-hidden" src="/images/caret-arrow-up-yellow.svg" alt=""/>}
            </div>
            <div className="roll-number">
                {this.state.game_over_message.length > 0 ? this.state.game_over_message + " " + this.state.top_level_bonus_message + " FINAL SCORE" : this.state.message.length > 0 ? this.state.message : "SCORE"}
            </div>
            <div className="roll-number-actual">
                {this.state.user_score === 0 ? "000" : this.state.user_score}
            </div>
            <div className="roll-number">
                ROLL
            </div>
            <div className="roll-number-actual">
                {this.state.rolls === 0 ? 1 : this.state.rolls <= 2 ? this.state.rolls + 1 : this.state.rolls === 4 ? 3 : ""}
            </div>

          </div>
          <div className="dice">
            <img src={"/images/dice" + this.state.die1 + ".png"} alt=""/>
            <br/>
            <button disabled={this.state.rolls === 0} className="hold btn btn-danger btn-lg" onClick={() => this.hold(this.state.die1, 1)}>
                {this.state.held[0] === true ? "HELD" : "HOLD"}
            </button>
          </div>
          <div className="dice">
            <img src={"/images/dice" + this.state.die2 + ".png"} alt=""/>
            <br/>
            <button disabled={this.state.rolls === 0} className="hold btn btn-danger btn-lg" onClick={() => this.hold(this.state.die2, 2)} >
                {this.state.held[1] === true ? "HELD" : "HOLD"}
            </button>
          </div>
          <div className="dice">
            <img src={"/images/dice" + this.state.die3 + ".png"} alt=""/>
            <br/>
            <button disabled={this.state.rolls === 0} className="hold btn btn-danger btn-lg" onClick={() => this.hold(this.state.die3, 3)} >
                {this.state.held[2] === true ? "HELD" : "HOLD"}
            </button>
          </div>
          <div className="dice">
            <img src={"/images/dice" + this.state.die4 + ".png"} alt=""/>
            <br/>
            <button disabled={this.state.rolls === 0} className="hold btn btn-danger btn-lg" onClick={() => this.hold(this.state.die4, 4)}>
                {this.state.held[3] === true ? "HELD" : "HOLD"}
            </button>
          </div>
          <div className="dice">
            <img src={"/images/dice" + this.state.die5 + ".png"} alt=""/>
            <br/>
            <button disabled={this.state.rolls === 0} className="hold btn btn-danger btn-lg" onClick={() => this.hold(this.state.die5, 5)}>
                {this.state.held[4] === true ? "HELD" : "HOLD"}
            </button>
          </div>
        </div>
        <div>
          <button type="button" className="high_score_button btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">
            High<br/>Scores
          </button>
          <button type="submit" className="new-game btn btn-primary btn-lg" onClick={() => this.newGame()}>
            New<br/>Game
          </button>
          <button type="submit" className="new-game btn btn-primary btn-lg" onClick={() => this.showSubTotal()}>
            Sub<br/>Total
          </button>
          <button disabled={this.state.rolls === 0 || this.state.score_entered === true || this.state.scoring_combo_selected === false} type="submit" className="enter btn btn-primary btn-lg" onClick={() => this.enterScore()}>
            Enter Score
          </button>
          <button disabled={this.state.rolls >= 3 || this.state.message.length > 0} className="roll btn btn-primary btn-lg" onClick={() => this.roll(this.state.held)}>
            {this.state.rolls === 3 ? "Out of Rolls" : "Roll"}
          </button>
        </div>


        <div id="myModal" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">HIGH SCORES</h4>
              </div>
              <div className="modal-body">
                <p>Session High Score: {this.state.high_score}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Dice diceImages={diceImages}/>,
  document.getElementById('root')
);
