import React, { Component } from "react";
import { Link } from "react-router-dom";
import LoadingModal from "../LoadingModal";
import { connect } from "react-redux";
import {
  getDogListAndAnswers,
  setAnswers,
  addAnswerName,
  deleteAnswerName
} from "../../actions/GameOne";
import "../GameOne/GameOne.css";

class GameTwo extends Component {
  componentDidMount() {
    this.props.getDogListAndAnswers();
  }
  handleClick = dog => {
    if (this.props.answer === dog) {
      return this.props.setAnswers();
    } else {
      this.props.addAnswerName(this.props.answer);
      setTimeout(() => {
        this.props.setAnswers();
        this.props.deleteAnswerName();
      }, 2000);
    }

    // alert('Wrong!')
  };

  render() {
    console.log(this.props);
    const rightAnswer = this.props.answerName;
    if (this.props.loading) {
      return <LoadingModal />;
    }

    return (
      <div className="game-one">
        <h1>GAME TWO</h1>
        <Link to="/">
          <button className="GameOneButtons">HOME</button>
        </Link>
        <Link to="/dog-breeds/">
          <button className="GameOneButtons">STUDY</button>
        </Link>
        <div>
          <img
            className="AnswerImage"
            src={this.props.answerImage}
            alt={this.props.answer}
          />
        </div>
        <div>
          <h2>Directions:</h2>
          <p>Select the correct dog breed</p>
        </div>
        <div>
          {this.props.answers &&
            this.props.answers.map(dog => {
              return (
                <button
                  className="GameOneButtons"
                  onClick={() => this.handleClick(dog)}
                  key={this.props.breeds.breeds}
                >
                  {dog.charAt(0).toUpperCase() + dog.slice(1)}
                </button>
              );
            })}
          {this.props.breeds.length === 0 && "Loading..."}
          {this.props.addAnswerName && (
            <div className="answer_name">
              <h2>{rightAnswer}</h2>
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    breeds: state.dogs.breeds,
    answers: state.dogs.answers,
    answer: state.dogs.answer,
    loading: state.appStatus.loading,
    answerImage: state.dogs.answerImage,
    answerName: state.dogs.answerName
  };
};

export default connect(
  mapStateToProps,
  { getDogListAndAnswers, setAnswers, addAnswerName, deleteAnswerName }
)(GameTwo);