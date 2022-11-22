import React from 'react';

const Winner: React.FC = () => {
    const winnerStorage = JSON.parse(localStorage.getItem('players') || '');
    const mapScore = winnerStorage.map((winner: any) => winner.score);
    const mapName = winnerStorage.map((winner: any) => winner.name);
    const mapTime = winnerStorage.map((winner: any) => winner.times);
    let finalResult = '';

    if ((mapScore[0] > mapScore[1] && mapTime[0] < mapTime[1]) || mapScore[0] > mapScore[1]) {
        finalResult = `${mapName[0]} is the winner`;
    } else {
        finalResult = `${mapName[1]} is the winner`;
        if (mapScore[0] === mapScore[1] || (mapScore[0] === mapScore[1] && mapTime[0] === mapTime[1])) {
            finalResult = `This match is a draw`;
        }
    }
    return (
        <div>
            <h1 style={{ textAlign: 'center', marginTop: '20%' }}>{finalResult}</h1>
        </div>
    );
};

export default Winner;
