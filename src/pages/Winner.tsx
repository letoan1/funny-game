import React from 'react';

const Winner: React.FC = () => {
    const winnerStorage = JSON.parse(localStorage.getItem('players') || '');
    const mapScore = winnerStorage.map((winner: any) => winner.score);
    const mapName = winnerStorage.map((winner: any) => winner.name);

    return (
        <div>
            <h1 style={{ textAlign: 'center', marginTop: '20%' }}>
                {mapScore[0] > mapScore[1] ? mapName[0] : mapName[1]}
            </h1>
            <h2 style={{ textAlign: 'center' }}>Winner</h2>
        </div>
    );
};

export default Winner;
