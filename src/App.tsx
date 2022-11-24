import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
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
    const history = useHistory();
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
    const [timeFinish, setTimeFinish] = React.useState<number[]>([]);
    const [turn, setTurn] = React.useState<number>(1);
    const [score, setScore] = React.useState<number>(0);
    const [count, setCount] = React.useState<number>(10);
    const [value, setValue] = React.useState<string>('');
    const TOTAL_QUESTIONS = 3;

    const endtime = [...timeFinish];
    const finallyTimes = endtime.reduce((prev, curr) => {
        return prev + curr;
    }, 0);

    const answer = value;
    const correct = listQuestion[number]?.correct_answer === answer;
    React.useEffect(() => {
        if (correct) {
            setScore((prev) => prev + 1);
        }
    }, [correct]);

    const nextQuestion = (): void => {
        const nextQ = number + 1;
        if (nextQ === TOTAL_QUESTIONS) {
            setTurn(2);
            history.push('/match');
        } else {
            setNumber(nextQ);
            setCount(10);
            setTimeFinish([...timeFinish, 10 - count]);
        }

        if (nextQ === TOTAL_QUESTIONS && turn === 2) {
            setGameOver(true);
            history.push('/result');
        }
    };

    const checkAnswer = (e: any): void => {
        if (!gameOver) {
            const loopAnswer = userAnswer.map((answer: any) => answer.answer);
            const correctAnswers = userAnswer.map((answer: any) => answer.correctAnswer);
            const resultCorrect = listQuestion[number]?.correct_answer;

            const answerObject = {
                question: listQuestion[number]?.question,
                answer,
                correct,
                correctAnswer: resultCorrect,
            };

            setUserAnswer((prev) => [...prev, answerObject]);

            if (turn === 1) {
                setPlayers([
                    {
                        id: 1,
                        name: players[0].name,
                        answers: [...loopAnswer, answer],
                        result: [...correctAnswers, resultCorrect],
                        times: finallyTimes,
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
                        answers: [...loopAnswer, answer],
                        result: [...correctAnswers, resultCorrect],
                        times: finallyTimes,
                        score: score,
                    },
                ]);
            }
        }
        nextQuestion();
    };

    localStorage.setItem('players', JSON.stringify(players));

    return (
        <div className="App">
            <Switch>
                <Route path="/create">
                    <CreateGame setPlayers={setPlayers} />
                </Route>
                <Route path="/question">
                    <QuizGame
                        setListQuestion={setListQuestion}
                        questionNumber={number + 1}
                        question={listQuestion[number]?.question}
                        answers={listQuestion[number]?.answers}
                        setGameOver={setGameOver}
                        checkAnswer={checkAnswer}
                        setPlayers={setPlayers}
                        turn={turn}
                        players={players}
                        count={count}
                        setCount={setCount}
                        nextQuestion={nextQuestion}
                        value={value}
                        setValue={setValue}
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
