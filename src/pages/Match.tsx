import React from 'react';
import { useHistory } from 'react-router-dom';

interface Props {
    turn: number;
}

const Match: React.FC<Props> = (props) => {
    const { turn } = props;
    const history = useHistory();

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            history.push('/question');
        }, 2000);

        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="turn" style={{ textAlign: 'center', marginTop: '20%' }}>
            <h1 style={{ fontSize: '60px' }}>{turn === 1 ? 'Match 1' : 'Match 2'}</h1>
        </div>
    );
};

export default Match;
