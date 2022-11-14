import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Players, QuestionState, Result } from './interface';
import CreateGame from './pages/CreateGame';
import HomePage from './pages/HomePage';
import Match from './pages/Match';
import QuizGame from './pages/QuizGame';
import ResultPage from './pages/ResultPage';

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
            times: [],
        },
        {
            id: 2,
            name: '',
            answers: [],
            result: [],
            times: [],
        },
    ]);

    const [listQuestion, setListQuestion] = React.useState<QuestionState[]>([]);
    const [number, setNumber] = React.useState<number>(0);
    const [userAnswer, setUserAnswer] = React.useState<AnswerObject[]>([]);
    const [score, setScore] = React.useState<number>(0);
    const [gameOver, setGameOver] = React.useState<boolean>(false);
    const [timeFinish, setTimeFinish] = React.useState<number>(0);
    const [turn, setTurn] = React.useState<number>(1);
    const [result, setResult] = React.useState<Result[]>([
        {
            id: 1,
            score: score,
        },
        {
            id: 2,
            score: score,
        },
    ]);

    const removeDuplicates = (arr: any) => {
        return arr.filter((item: string, index: number) => arr.indexOf(item) === index);
    };

    const scoreStorage = JSON.parse(localStorage.getItem('result') || '');
    const scoreTotal = scoreStorage.map((score: any) => score.results);

    const checkAnswer = (e: any) => {
        if (!gameOver) {
            const answer = e.currentTarget.value;
            const correct = listQuestion[number].correct_answer === answer;
            if (correct && turn === 1) {
                setScore((prev) => prev + 1);
                setResult([
                    {
                        id: 1,
                        score: score,
                    },
                    {
                        id: 2,
                        score: 0,
                    },
                ]);
            }

            if (correct && turn === 2) {
                setScore((prev) => prev + 1);
                setResult([
                    {
                        id: 1,
                        score: scoreTotal[0],
                    },
                    {
                        id: 2,
                        score: score,
                    },
                ]);
            }
            const answerObject = {
                question: listQuestion[number].question,
                answer,
                correct,
                correctAnswer: listQuestion[number].correct_answer,
            };
            setUserAnswer((p) => [...p, answerObject]);

            const loopAnswer = userAnswer.map((answer) => answer.answer);
            const finalAnswer = removeDuplicates(loopAnswer);
            const correctAnswers = userAnswer.map((answer: any) => answer.correctAnswer);
            const finalCorrect = removeDuplicates(correctAnswers);

            if (turn === 1) {
                setPlayers([
                    {
                        id: 1,
                        name: players[0].name,
                        answers: [...finalAnswer],
                        result: [...finalCorrect],
                        times: [],
                    },
                    {
                        id: 2,
                        name: players[1].name,
                        answers: [],
                        result: [],
                        times: [],
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
                        times: [],
                    },
                    {
                        id: 2,
                        name: players[1].name,
                        answers: [...finalAnswer],
                        result: [...finalCorrect],
                        times: [],
                    },
                ]);
            }
        }
        localStorage.setItem('player', JSON.stringify(players));
        localStorage.setItem('result', JSON.stringify(result));
    };

    return (
        <div className="App">
            <Switch>
                <Route path="/create">
                    <CreateGame players={players} setPlayers={setPlayers} />
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
                        result={result}
                        setResult={setResult}
                        players={players}
                    />
                </Route>
                <Route path="/result">
                    <ResultPage
                        players={players}
                        score={score}
                        turn={turn}
                        timeFinish={timeFinish}
                        setTimeFinish={setTimeFinish}
                    />
                </Route>
                <Route path="/match">
                    <Match turn={turn} />
                </Route>
                <Route exact path="/">
                    <HomePage />
                </Route>
            </Switch>
        </div>
    );
};

export default App;
