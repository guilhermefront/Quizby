import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Donut from './Donut';
import BackgroundContainer from '../../backgroundcontainer';
import { resetUserStats } from '../../../slices/quizzes-slice';
import { saveQuizResult } from '../../../async-actions';
import { setUser, selectUserReducer } from '../../../slices/user-slice';

const Done = () => {
  const { done, percentage } = useSelector(
    (state) => state.quizzesReducer.userStats
  );
  const { isAuthenticated } = useSelector(selectUserReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id: quizId } = useParams();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(setUser());
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(saveQuizResult({ percentage, quizId }));
    }
    if (!done) {
      history.goBack();
    }
  }, [done]);

  function conditionalPhrase() {
    if (percentage < 20) {
      return 'Next time you will do better!';
    }
    if (percentage < 45) {
      return 'Not so bad!';
    }
    if (percentage < 60) {
      return 'You can do better!';
    }
    if (percentage < 80) {
      return 'Nice result!';
    }
    return 'What a performance!';
  }

  function restartGame() {
    dispatch(resetUserStats());
    history.push(`/quizzes/play/${quizId}`);
  }

  return (
    <BackgroundContainer alignItems="center">
      <Donut value={percentage} />
      <div className="Done__phrase">{conditionalPhrase()}</div>
      <div className="Done__button">
        <button
          onClick={restartGame}
          className="Done__button--playagain"
          type="button"
        >
          <img alt="Play again" src="/playagain.svg" />
        </button>
        <button
          onClick={() => history.push('/')}
          className="Done__button--home"
          type="button"
        >
          Go home
        </button>
      </div>
    </BackgroundContainer>
  );
};

export default Done;