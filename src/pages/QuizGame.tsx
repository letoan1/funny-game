import React from 'react';
import QuestionCard from '../components/QuestionCard';
import { Players, QuestionState } from '../interface';

interface Props {
    setListQuestion: React.Dispatch<React.SetStateAction<QuestionState[]>>;
    question: string;
    answers: string[];
    questionNumber: number;
    setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
    checkAnswer: (e: React.MouseEvent<HTMLButtonElement>) => void;
    setPlayers: React.Dispatch<React.SetStateAction<Players[]>>;
    turn: number;
    players: Players[];
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
    nextQuestion: () => void;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>
}

const QuizGame: React.FC<Props> = (props) => {
    const {
        setListQuestion,
        question,
        answers,
        questionNumber,
        checkAnswer,
        setGameOver,
        turn,
        players,
        count,
        setCount,
        nextQuestion,
        value,
        setValue
    } = props;
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>
                {turn === 1 ? `Player: ${players[0].name}` : `Player: ${players[1].name}`}
            </h1>
            <QuestionCard
                answers={answers}
                question={question}
                questionNumber={questionNumber}
                setListQuestion={setListQuestion}
                setGameOver={setGameOver}
                checkAnswer={checkAnswer}
                count={count}
                setCount={setCount}
                nextQuestion={nextQuestion}
                value={value}
                setValue={setValue}
            />
        </div>
    );
};

export default QuizGame;
