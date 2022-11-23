import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { Players, Question, QuestionState } from '../interface';
import { shuffleArray } from '../utils';
import './_question-card.scss';

interface Props {
    listQuestion: QuestionState[];
    setListQuestion: React.Dispatch<React.SetStateAction<QuestionState[]>>;
    answers: string[];
    question: string;
    questionNumber: number;
    number: number;
    setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
    setNumber: React.Dispatch<React.SetStateAction<number>>;
    checkAnswer: (e: React.MouseEvent<HTMLButtonElement>) => void;
    setPlayers: React.Dispatch<React.SetStateAction<Players[]>>;
    turn: number;
    setTurn: React.Dispatch<React.SetStateAction<number>>;
    setTimeFinish: React.Dispatch<React.SetStateAction<number[]>>;
    timeFinish: number[];
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
    nextQuestion: () => void;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const decodeHTMLentities = (rawHTML: string) =>
    React.createElement('div', { dangerouslySetInnerHTML: { __html: rawHTML } });

const QuestionCard: React.FC<Props> = (props) => {
    const history = useHistory();
    const {
        answers,
        question,
        questionNumber,
        number,
        setListQuestion,
        setGameOver,
        setNumber,
        checkAnswer,
        turn,
        setTurn,
        setTimeFinish,
        timeFinish,
        count,
        setCount,
        nextQuestion,
        value,
        setValue,
    } = props;

    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const listAnswers = async () => {
            const res = await axios.get(`https://opentdb.com/api.php?amount=10&type=multiple`);
            const results = res.data.results.map((question: Question) => ({
                ...question,
                answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
            }));
            setListQuestion(results);
            setIsLoading(false);
        };
        listAnswers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCount(count - 1);
            if (count <= 0) {
                // setGameOver(true);
                nextQuestion();
            }
        }, 1000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count, history, setGameOver]);

    return (
        <div className="container">
            <div className="question-card">
                <div className="question-card__top">
                    <p>
                        Question: {questionNumber} / {3}
                    </p>
                    {!isLoading ? <p>Time remaining: {count}</p> : null}
                </div>
                {isLoading ? (
                    <p>Loading Questions...</p>
                ) : (
                    <h1 className="question-title">{decodeHTMLentities(question)}</h1>
                )}
                <div className="answers">
                    {!isLoading &&
                        answers?.map((answer, index) => (
                            <button
                                className="btn btn-answer"
                                key={index}
                                value={answer}
                                onClick={() => setValue(answer)}
                            >
                                <>
                                    <input
                                        className="input-radio"
                                        type="radio"
                                        id={answer}
                                        name="quiz"
                                        value={answer}
                                    />
                                      <label htmlFor={answer}>{decodeHTMLentities(answer)}</label>
                                </>
                            </button>
                        ))}
                </div>
                <button className="btn btn-submit" type="submit" value={value} onClick={checkAnswer}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default QuestionCard;
