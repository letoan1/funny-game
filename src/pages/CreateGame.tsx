import React from 'react';
import { useHistory } from 'react-router-dom';
import './_create-game.scss';

interface Props {
    player1: string;
    setPlayer1: React.Dispatch<React.SetStateAction<string>>;
    handleCreateGame: (e: React.FormEvent) => void;
}

const CreateGame: React.FC<Props> = (props) => {
    const { player1, setPlayer1, handleCreateGame } = props;
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
                <form action="#" onSubmit={(e) => handleCreateGame(e)}>
                    <label htmlFor="#">Player 1</label>
                    <input
                        type="text"
                        placeholder="Name"
                        value={player1}
                        onChange={(e) => setPlayer1(e.target.value)}
                    />
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default CreateGame;
