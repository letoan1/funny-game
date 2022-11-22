import React from 'react';
import QuestionCard from '../components/QuestionCard';
import { Players, QuestionState } from '../interface';

interface Props {
    setListQuestion: React.Dispatch<React.SetStateAction<QuestionState[]>>;
    listQuestion: QuestionState[];
    question: string;
    answers: string[];
    questionNumber: number;
    number: number;
    setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
    setNumber: React.Dispatch<React.SetStateAction<number>>;
    checkAnswer: (e: React.MouseEvent<HTMLButtonElement>) => void;
    setPlayers: React.Dispatch<React.SetStateAction<Players[]>>;
    turn: number;
    setTurn: React.Dispatch<React.SetStateAction<number>>;
    players: Players[];
    setTimeFinish: React.Dispatch<React.SetStateAction<number[]>>;
    timeFinish: number[];
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
}

const QuizGame: React.FC<Props> = (props) => {
    const {
        listQuestion,
        setListQuestion,
        question,
        answers,
        number,
        questionNumber,
        setGameOver,
        setNumber,
        checkAnswer,
        setPlayers,
        turn,
        setTurn,
        players,
        setTimeFinish,
        timeFinish,
        count,
        setCount,
    } = props;
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>
                {turn === 1 ? `Player: ${players[0].name}` : `Player: ${players[1].name}`}
            </h1>
            <QuestionCard
                answers={answers}
                question={question}
                number={number}
                questionNumber={questionNumber}
                listQuestion={listQuestion}
                setListQuestion={setListQuestion}
                setGameOver={setGameOver}
                setNumber={setNumber}
                checkAnswer={checkAnswer}
                setPlayers={setPlayers}
                turn={turn}
                setTurn={setTurn}
                setTimeFinish={setTimeFinish}
                timeFinish={timeFinish}
                count={count}
                setCount={setCount}
            />
        </div>
    );
};

export default QuizGame;
