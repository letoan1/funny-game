import React from 'react';
import { useHistory } from 'react-router-dom';
import { Players } from '../interface';
import './_create-game.scss';

interface Props {
    players: Players[];
    setPlayers: React.Dispatch<React.SetStateAction<Players[]>>;
}

const CreateGame: React.FC<Props> = (props) => {
    const { setPlayers } = props;
    const [player1, setPlayer1] = React.useState<string>('');
    const [player2, setPlayer2] = React.useState<string>('');

    const handleCreateGame = () => {
        if (player1 && player2) {
            setPlayers([
                {
                    id: 1,
                    name: player1,
                    answers: [],
                    result: [],
                    times: [],
                },
                {
                    id: 2,
                    name: player2,
                    answers: [],
                    result: [],
                    times: [],
                },
            ]);
            history.push('/match');
        }
    };

    const history = useHistory();

    const cancelCreateGame = () => {
        history.push('/');
    };

    return (
        <div className="create-game">
            <div className="form-create">
                <div className="top-form">
                    <h2>Create Game</h2>
                    <h2 onClick={cancelCreateGame}>X</h2>
                </div>
                <form action="#" onSubmit={handleCreateGame}>
                    <label htmlFor="#">Player 1</label>
                    <input
                        type="text"
                        placeholder="Name"
                        value={player1}
                        onChange={(e) => setPlayer1(e.target.value)}
                    />
                    <br />
                    <label htmlFor="#">Player 2</label>
                    <input
                        type="text"
                        placeholder="Name"
                        value={player2}
                        onChange={(e) => setPlayer2(e.target.value)}
                    />
                    <br />
                    <button type="submit" className="btn btn-create">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateGame;
