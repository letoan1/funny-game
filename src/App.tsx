import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Players, QuestionState } from './interface';
import CreateGame from './pages/CreateGame';
import HomePage from './pages/HomePage';
import QuizGame from './pages/QuizGame';
import ResultPage from './pages/ResultPage';

export interface AnswerObject {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
}

const App: React.FC = () => {
    const history = useHistory();
    const [player1, setPlayer1] = React.useState<string>('');
    const [listPlayer, setListPlayer] = React.useState<Players[]>([]);
    const [listQuestion, setListQuestion] = React.useState<QuestionState[]>([]);
    const [number, setNumber] = React.useState<number>(0);
    const [userAnswer, setUserAnswer] = React.useState<AnswerObject[]>([]);
    const [score, setScore] = React.useState<number>(0);
    const [gameOver, setGameOver] = React.useState<boolean>(false);
    const [timeFinish, setTimeFinish] = React.useState<number>(0);

    const handleCreateGame = (e: React.FormEvent) => {
        e.preventDefault();
        if (player1.trim()) {
            setListPlayer([...listPlayer, { id: 1, name: player1, score }]);
            history.push('/question');
        }
    };

    const checkAnswer = (e: any) => {
        if (!gameOver) {
            const answer = e.currentTarget.value;
            const correct = listQuestion[number].correct_answer === answer;
            if (correct) {
                setScore((prev) => prev + 1);
            }
            const answerObject = {
                question: listQuestion[number].question,
                answer,
                correct,
                correctAnswer: listQuestion[number].correct_answer,
            };
            setUserAnswer((prev) => [...prev, answerObject]);
        }
        localStorage.setItem('player', JSON.stringify(listPlayer));
    };

    return (
        <div className="App">
            <Switch>
                <Route path="/create">
                    <CreateGame player1={player1} setPlayer1={setPlayer1} handleCreateGame={handleCreateGame} />
                </Route>
                <Route path="/question">
                    <QuizGame
                        listQuestion={listQuestion}
                        setListQuestion={setListQuestion}
                        question={listQuestion[number]?.question}
                        questionNumber={number + 1}
                        answers={listQuestion[number]?.answers}
                        userAnswer={userAnswer ? userAnswer[number] : undefined}
                        number={number}
                        setGameOver={setGameOver}
                        setNumber={setNumber}
                        checkAnswer={checkAnswer}
                        score={score}
                        gameOver={gameOver}
                        setTimeFinish={setTimeFinish}
                    />
                </Route>
                <Route path="/result">
                    <ResultPage
                        listPlayer={listPlayer}
                        score={score}
                        timeFinish={timeFinish}
                        setTimeFinish={setTimeFinish}
                    />
                </Route>
                <Route exact path="/">
                    <HomePage />
                </Route>
            </Switch>
        </div>
    );
};

export default App;
