import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';

import CategoryFilterComponent from '../components/category/CategoryFilterComponent';
import QuestionListComponent from '../components/question/QuestionListComponent';
import { startRound } from '../actions/quiznightActions';
import { fetchCategories, fetchQuestions } from '../actions/questionActions';

const styles = {
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  }
};

const MINIMUM_AMOUNT_OF_QUESTIONS_PER_ROUND = 3;
const MAXIMUM_AMOUNT_OF_QUESTIONS_PER_ROUND = 12;

class CategoryQuestionOverviewContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategories: [],
      selectedQuestions: []
    };

    this.onCategoriesSelect = this.onCategoriesSelect.bind(this);
    this.selectQuestion = this.selectQuestion.bind(this);
    this.deselectQuestion = this.deselectQuestion.bind(this);
  }

  componentDidMount() {
    this.props.fetchCategories();
  }

  selectQuestion(selectedQuestion) {
    this.setState({
      selectedQuestions: [...this.state.selectedQuestions, selectedQuestion]
    });
  }

  deselectQuestion(deselectedQuestion) {
    const newState = this.state.selectedQuestions.filter(question => (question.id !== deselectedQuestion.id));
    this.setState({
      selectedQuestions: newState
    });
  }

  onCategoriesSelect(selectedCategories) {
    this.setState({
      selectedCategories
    }, () => {
      this.props.fetchQuestions(selectedCategories);
    });
  }

  renderStartRoundButtonIfCorrectAmountOfQuestionAreSelected(correctAmount) {
    const amountOfQuestions = this.state.selectedQuestions.length;
    
    if (correctAmount < MINIMUM_AMOUNT_OF_QUESTIONS_PER_ROUND 
      || correctAmount > MAXIMUM_AMOUNT_OF_QUESTIONS_PER_ROUND) {
      throw new Error('2 < amount of questions < 13');
    }

    if ((amountOfQuestions >= correctAmount && amountOfQuestions <= MAXIMUM_AMOUNT_OF_QUESTIONS_PER_ROUND) && this.allCategoriesArePresent()) {
      return (
        <FlatButton
          backgroundColor="#f2f2f2"
          label="Start round!!"
          labelPosition="before"
          primary={true}
          onClick={() => this.handleRoundStart()}
        />
      );
    }
  }

  allCategoriesArePresent() {
    let allPresent = [];
    this.state.selectedCategories.forEach(category => {
      if (this.state.selectedQuestions.filter(question => (question.category === category._id)).length === 0) {
        allPresent.push(false);
      }
    });
    return allPresent.length < 1;
  }

  handleRoundStart() {
    this.props.startRound(this.state.selectedQuestions);
  }

  renderCategoryFilterIfNoCategoriesAreSelected() {
    if (this.state.selectedCategories.length < 3) {
      return (
        <CategoryFilterComponent
          availableCategories={this.props.availableCategories}
          onMultipleCategorySelect={this.onCategoriesSelect}
        />
      );
    }
  }

  renderQuestionLists() {
    if (this.state.selectedCategories.length > 0) {
      return (
        <div>
          <h2>Choose between {MINIMUM_AMOUNT_OF_QUESTIONS_PER_ROUND} and {MAXIMUM_AMOUNT_OF_QUESTIONS_PER_ROUND} questions:</h2>
          <h3>(Each category must be present)</h3>
          <br />
          <div style={styles.wrapper}>
            {
              this.state.selectedCategories.map(category => (
                <QuestionListComponent
                  key={category._id}
                  category={category}
                  questions={this.getQuestionsOfCategory(category)}
                  selectQuestion={this.selectQuestion}
                  deselectQuestion={this.deselectQuestion}
                />
              ))
            }
          </div>
          {this.renderStartRoundButtonIfCorrectAmountOfQuestionAreSelected(MINIMUM_AMOUNT_OF_QUESTIONS_PER_ROUND)}
        </div>
      );
    }
  }

  getQuestionsOfCategory(category) {
    return this.props.availableQuestions.filter(question => (question.category === category._id));
  }

  render() {
    return (
      <div>
        {this.renderCategoryFilterIfNoCategoriesAreSelected()}
        {this.renderQuestionLists()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    availableCategories: state.questionReducer.availableCategories,
    availableQuestions: state.questionReducer.availableQuestions
  };
}

CategoryQuestionOverviewContainer.propTypes = {
  availableCategories: PropTypes.array,
  availableQuestions: PropTypes.array,
  selectedCategories: PropTypes.array,
  selectedQuestions: PropTypes.array,
  startRound: PropTypes.func,
  fetchCategories: PropTypes.func,
  fetchQuestions: PropTypes.func
};

export default connect(mapStateToProps, {startRound, fetchCategories, fetchQuestions})(CategoryQuestionOverviewContainer);