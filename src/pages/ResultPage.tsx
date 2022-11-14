import React from 'react';
import { AnswerObject } from '../App';
import { Players } from '../interface';
import './_result.scss';

interface Props {
    players: Players[];
    score: number;
    timeFinish: number;
    setTimeFinish: React.Dispatch<React.SetStateAction<number>>;
    turn: number;
}

const ResultPage: React.FC<Props> = (props) => {
    const { timeFinish } = props;

    const dataResult = JSON.parse(localStorage.getItem('player') || '');
    const scoreLocal = JSON.parse(localStorage.getItem('result') || '');
    const [searchField, setSearchFeild] = React.useState<string>('');
    const [searchArr, setSearchArr] = React.useState<string[]>([]);

    const searchResult = () => {
        const haveWord = dataResult.filter((data: any) => data.name.toLowerCase().includes(searchField.toLowerCase()));
        setSearchArr(haveWord);
    };

    return (
        <div className="container">
            <div className="result-page">
                <div className="result-page__top">
                    <h2>Results Game</h2>
                    <button className="btn btn-finally">Finally</button>
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
                            <th>Score</th>
                            <th>Answers</th>
                            <th>Results</th>
                            <th>Time Finish</th>
                        </tr>
                    </thead>
                    {searchField !== '' && !!searchArr.length ? (
                        searchArr?.map((player: any) => (
                            <tbody key={player.id}>
                                <tr>
                                    <td>{player.name}</td>
                                    <td>{scoreLocal.forEach((score: any) => score.score)}</td>
                                    <td>{player.answers.join(' - ')}</td>
                                    <td>{player.result.join(' - ')}</td>
                                    <td>{timeFinish}s</td>
                                </tr>
                            </tbody>
                        ))
                    ) : searchField === '' ? (
                        dataResult?.map((player: any) => (
                            <tbody key={player.id}>
                                <tr>
                                    <td>{player.name}</td>
                                    <td>{scoreLocal.map((score: any) => score.score)[0]}</td>
                                    <td>{player.answers.join(' - ')}</td>
                                    <td>{player.result.join(' - ')}</td>
                                    <td>{timeFinish}s</td>
                                </tr>
                            </tbody>
                        ))
                    ) : (
                        <p>Opps ! No search results...</p>
                    )}
                </table>
            </div>
        </div>
    );
};

export default ResultPage;
