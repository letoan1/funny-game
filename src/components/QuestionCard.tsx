import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { Players, Question, QuestionState } from '../interface';
import { shuffleArray } from '../utils';
import './_question-card.scss';

const TOTAL_QUESTIONS = 3;

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
    } = props;

    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    const nextQuestion = () => {
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
                        Question: {questionNumber} / {TOTAL_QUESTIONS}
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
                            <button className="btn btn-answer" key={index} value={answer} onClick={checkAnswer}>
                                <>
                                    <input className="input-radio" type="radio" id={answer} name="quiz" /> {' '}
                                    <label htmlFor={answer}>{decodeHTMLentities(answer)}</label>
                                </>
                            </button>
                        ))}
                </div>
                <button className="btn btn-submit" type="submit" onClick={nextQuestion}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default QuestionCard;
