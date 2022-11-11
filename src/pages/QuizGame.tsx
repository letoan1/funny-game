import React from 'react';
import QuestionCard from '../components/QuestionCard';
import { QuestionState } from '../interface';

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
    score: number;
    gameOver: boolean;
    setTimeFinish: React.Dispatch<React.SetStateAction<number>>;
}

const QuizGame: React.FC<Props> = (props) => {
    const {
        listQuestion,
        setListQuestion,
        question,
        answers,
        number,
        userAnswer,
        questionNumber,
        setGameOver,
        setNumber,
        checkAnswer,
        score,
        gameOver,
        setTimeFinish,
    } = props;
    return (
        <div>
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
                score={score}
                gameOver={gameOver}
                setTimeFinish={setTimeFinish}
            />
        </div>
    );
};

export default QuizGame;
