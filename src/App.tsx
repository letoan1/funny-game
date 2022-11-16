import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Players, QuestionState } from './interface';
import CreateGame from './pages/CreateGame';
import HomePage from './pages/HomePage';
import Match from './pages/Match';
import QuizGame from './pages/QuizGame';
import ResultPage from './pages/ResultPage';
import Winner from './pages/Winner';

export interface AnswerObject {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
}

const App: React.FC = () => {
    const [players, setPlayers] = React.useState<Players[]>([
        {
            id: 1,
            name: '',
            answers: [],
            result: [],
            times: 0,
            score: 0,
        },
        {
            id: 2,
            name: '',
            answers: [],
            result: [],
            times: 0,
            score: 0,
        },
    ]);

    const [listQuestion, setListQuestion] = React.useState<QuestionState[]>([]);
    const [number, setNumber] = React.useState<number>(0);
    const [userAnswer, setUserAnswer] = React.useState<AnswerObject[]>([]);
    const [gameOver, setGameOver] = React.useState<boolean>(false);
    const [timeFinish, setTimeFinish] = React.useState<number>(0);
    const [turn, setTurn] = React.useState<number>(1);
    const [score, setScore] = React.useState<number>(0);

    const removeDuplicates = (arr: any) => {
        return arr.filter((item: string, index: number) => arr.indexOf(item) === index);
    };

    const checkAnswer = (e: any) => {
        if (!gameOver) {
            const answer = e.currentTarget.value;
            const correct = listQuestion[number].correct_answer === answer;

            const loopAnswer = userAnswer.map((answer: any) => answer.answer);
            const finalAnswer = removeDuplicates(loopAnswer);

            const correctAnswers = userAnswer.map((answer: any) => answer.correctAnswer);
            const finalCorrect = removeDuplicates(correctAnswers);

            if (correct) {
                setScore((prev) => prev + 1);
            }

            const answerObject = {
                question: listQuestion[number].question,
                answer,
                correct,
                correctAnswer: listQuestion[number].correct_answer,
            };

            setUserAnswer((p) => [...p, answerObject]);

            if (turn === 1) {
                setPlayers([
                    {
                        id: 1,
                        name: players[0].name,
                        answers: [...finalAnswer],
                        result: [...finalCorrect],
                        times: timeFinish,
                        score: score,
                    },
                    {
                        id: 2,
                        name: players[1].name,
                        answers: [],
                        result: [],
                        times: 0,
                        score: 0,
                    },
                ]);
            }

            if (turn === 2) {
                setPlayers([
                    {
                        id: 1,
                        name: players[0].name,
                        answers: players[0].answers,
                        result: players[0].result,
                        times: players[0].times,
                        score: players[0].score,
                    },
                    {
                        id: 2,
                        name: players[1].name,
                        answers: [...finalAnswer],
                        result: [...finalCorrect],
                        times: timeFinish,
                        score: score,
                    },
                ]);
            }
        }
    };

    localStorage.setItem('players', JSON.stringify(players));

    return (
        <div className="App">
            <Switch>
                <Route path="/create">
                    <CreateGame
                        players={players}
                        setPlayers={setPlayers}
                        turn={turn}
                        setTimeFinish={setTimeFinish}
                        timeFinish={timeFinish}
                        gameOver={gameOver}
                    />
                </Route>
                <Route path="/question">
                    <QuizGame
                        listQuestion={listQuestion}
                        setListQuestion={setListQuestion}
                        questionNumber={number + 1}
                        question={listQuestion[number]?.question}
                        answers={listQuestion[number]?.answers}
                        userAnswer={userAnswer ? userAnswer[number] : undefined}
                        number={number}
                        setGameOver={setGameOver}
                        setNumber={setNumber}
                        checkAnswer={checkAnswer}
                        gameOver={gameOver}
                        setPlayers={setPlayers}
                        turn={turn}
                        setTurn={setTurn}
                        players={players}
                        setTimeFinish={setTimeFinish}
                        timeFinish={timeFinish}
                    />
                </Route>
                <Route path="/result">
                    <ResultPage
                        players={players}
                        score={score}
                        turn={turn}
                        timeFinish={timeFinish}
                        setTimeFinish={setTimeFinish}
                        setUserAnswer={setUserAnswer}
                        gameOver={gameOver}
                        setTurn={setTurn}
                    />
                </Route>
                <Route path="/match">
                    <Match
                        turn={turn}
                        setNumber={setNumber}
                        setUserAnswer={setUserAnswer}
                        setTurn={setTurn}
                        gameOver={gameOver}
                        setScore={setScore}
                        setTimeFinish={setTimeFinish}
                    />
                </Route>
                <Route path="/winner">
                    <Winner />
                </Route>
                <Route exact path="/">
                    <HomePage />
                </Route>
            </Switch>
        </div>
    );
};

export default App;
