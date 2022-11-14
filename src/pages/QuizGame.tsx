import React from 'react';
import QuestionCard from '../components/QuestionCard';
import { Players, QuestionState, Result } from '../interface';

interface Props {
    setListQuestion: React.Dispatch<React.SetStateAction<QuestionState[]>>;
    listQuestion: QuestionState[];
    question: string;
    answers: string[];
    userAnswer: any;
    questionNumber: number;
    number: number;
    setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
    setNumber: React.Dispatch<React.SetStateAction<number>>;
    checkAnswer: (e: React.MouseEvent<HTMLButtonElement>) => void;
    gameOver: boolean;
    setPlayers: React.Dispatch<React.SetStateAction<Players[]>>;
    turn: number;
    setTurn: React.Dispatch<React.SetStateAction<number>>;
    result: Result[];
    setResult: React.Dispatch<React.SetStateAction<Result[]>>;
    players: Players[];
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
        gameOver,
        setPlayers,
        turn,
        setTurn,
        players,
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
                gameOver={gameOver}
                setPlayers={setPlayers}
                turn={turn}
                setTurn={setTurn}
            />
        </div>
    );
};

export default QuizGame;
