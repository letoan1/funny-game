import React from 'react';
import { useHistory } from 'react-router-dom';
import { AnswerObject } from '../App';
interface Props {
    turn: number;
    setNumber: React.Dispatch<React.SetStateAction<number>>;
    setUserAnswer: React.Dispatch<React.SetStateAction<AnswerObject[]>>;
    setTurn: React.Dispatch<React.SetStateAction<number>>;
    gameOver: boolean;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    setTimeFinish: React.Dispatch<React.SetStateAction<number[]>>;
}

const Match: React.FC<Props> = (props) => {
    const { turn, setNumber, setUserAnswer, setScore, setTimeFinish } = props;
    const history = useHistory();

    window.localStorage.setItem('turn', JSON.stringify(turn));
    React.useEffect(() => {
        const timeout = setTimeout(() => {
            if (turn === 2) {
                setScore(0);
                setNumber(0);
                setUserAnswer([]);
                setTimeFinish([]);
            }
            history.push('/question');
        }, 2000);
        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const turnStorage = JSON.parse(`${window.localStorage.getItem('turn')}`);

    return (
        <div className="turn" style={{ textAlign: 'center', marginTop: '20%' }}>
            <h1 style={{ fontSize: '60px' }}>{turnStorage === 1 ? 'Match 1' : 'Match 2'}</h1>
        </div>
    );
};

export default Match;
