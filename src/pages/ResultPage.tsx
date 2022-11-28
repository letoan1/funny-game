import React from 'react';
import { useHistory } from 'react-router-dom';

import { decodeHTMLentities } from '../components/QuestionCard';
import { Players } from '../interface';
import './_result.scss';

interface Props {
    players: Players[];
    setPlayers: React.Dispatch<React.SetStateAction<Players[]>>;
}

const ResultPage: React.FC<Props> = (props) => {
    const { players, setPlayers } = props;
    const history = useHistory();
    const timingTimeoutRef = React.useRef<any>(null);

    React.useEffect(() => {
        setPlayers(JSON.parse(`${window.localStorage.getItem('players')}`));
    }, [setPlayers]);

    const [searchField, setSearchFeild] = React.useState<string>('');
    const [searchArr, setSearchArr] = React.useState<any>(JSON.parse(`${window.localStorage.getItem('players')}`));

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setSearchFeild(value);

        if (timingTimeoutRef.current) {
            clearTimeout(timingTimeoutRef.current);
        }

        timingTimeoutRef.current = setTimeout(() => {
            const searchResult = players.filter((data: any) => data.name.toLowerCase().includes(value.toLowerCase()));
            setSearchArr(searchResult);
        }, 500);
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
                        onChange={handleSearch}
                    />
                    <button className="btn btn-search">Search</button>
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

                    {searchField === '' && !!players.length ? (
                        players?.map((player: any) => (
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
                    ) : !!searchArr.length ? (
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
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan={5} style={{ textAlign: 'center' }}>
                                    Opps ! No search results
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
