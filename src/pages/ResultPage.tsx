import React from 'react';
import { Players } from '../interface';
import './_result.scss';

interface Props {
    listPlayer: Players[];
    score: number;
    timeFinish: number;
    setTimeFinish: React.Dispatch<React.SetStateAction<number>>;
}

const ResultPage: React.FC<Props> = (props) => {
    const { listPlayer, score, timeFinish } = props;

    const dataResult = JSON.parse(localStorage.getItem('player') || '');

    console.log(dataResult);

    return (
        <div className="container">
            <div className="result-page">
                <div className="result-page__top">
                    <h2>Results Game</h2>
                    <button className="btn btn-finally">Finally</button>
                </div>
                <div className="search-input">
                    <input type="search" name="search" id="search" placeholder="Search player" />
                    <button className="btn btn-search">Search</button>
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
                    {dataResult?.map((player: any) => (
                        <tbody key={player.id}>
                            <tr>
                                <td>{player.name}</td>
                                <td>{score}</td>
                                <td>Fake</td>
                                <td>Fake</td>
                                <td>{timeFinish}s</td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
    );
};

export default ResultPage;
