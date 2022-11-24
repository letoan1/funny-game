import React from 'react';
import { useHistory } from 'react-router-dom';

import { AnswerObject } from '../App';
import { decodeHTMLentities } from '../components/QuestionCard';
import { Players } from '../interface';
import './_result.scss';

interface Props {
    players: Players[];
    score: number;
    timeFinish: number[];
    setTimeFinish: React.Dispatch<React.SetStateAction<number[]>>;
    turn: number;
    setTurn: React.Dispatch<React.SetStateAction<number>>;
    setUserAnswer: React.Dispatch<React.SetStateAction<AnswerObject[]>>;
    gameOver: boolean;
}

const ResultPage: React.FC<Props> = (props) => {
    const history = useHistory();

    const dataResult = JSON.parse(localStorage.getItem('players') || '');
    const [searchField, setSearchFeild] = React.useState<string>('');
    const [searchArr, setSearchArr] = React.useState<string[]>([]);

    const searchResult = () => {
        const haveWord = dataResult.filter((data: any) => data.name.toLowerCase().includes(searchField.toLowerCase()));
        setSearchArr(haveWord);
    };

    const visitToWinner = () => {
        history.push('/winner');
    };

    return (
        <div className="container">
            <div className="result-page">
                <div className="result-page__top">
                    <h2>Results Game</h2>
                    <button className="btn btn-finally" onClick={visitToWinner}>
                        Finally
                    </button>
                </div>
                <div className="search-input">
                    <input
                        type="search"
                        name="search"
                        id="search"
                        placeholder="Search player"
                        value={searchField}
                        onChange={(e) => setSearchFeild(e.target.value)}
                    />
                    <button className="btn btn-search" onClick={searchResult}>
                        Search
                    </button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Player</th>
                            <th>Answers</th>
                            <th>Results</th>
                            <th>Score</th>
                            <th>Time Finish</th>
                        </tr>
                    </thead>
                    {searchField !== '' && !!searchArr.length ? (
                        searchArr?.map((player: any) => (
                            <tbody key={player.id}>
                                <tr>
                                    <td>{player.name}</td>
                                    <td>{decodeHTMLentities(player.answers.join(' - '))}</td>
                                    <td>{decodeHTMLentities(player.result.join(' - '))}</td>
                                    <td>{player.score}</td>
                                    <td>{player.times}s</td>
                                </tr>
                            </tbody>
                        ))
                    ) : searchField === '' ? (
                        dataResult?.map((player: any) => (
                            <tbody key={player.id}>
                                <tr>
                                    <td>{player.name}</td>
                                    <td>{decodeHTMLentities(player.answers.join(' - '))}</td>
                                    <td>{decodeHTMLentities(player.result.join(' - '))}</td>
                                    <td>{player.score}</td>
                                    <td>{player.times}s</td>
                                </tr>
                            </tbody>
                        ))
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan={5} style={{ textAlign: 'center' }}>
                                    Opps ! No search results...
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
};

export default ResultPage;
