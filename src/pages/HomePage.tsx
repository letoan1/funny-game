import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowAltCircleRight } from 'react-icons/fa';

import './_home-page.scss';

const HomePage: React.FC = () => {
    return (
        <div className="home-page">
            <img
                src={
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkxtFsQe-1DmObMvFV8M3zTrKHQhQFglDp-A&usqp=CAU'
                }
                alt=""
            />
            <h1>Funny Game</h1>
            <button type="submit" className="btn btn-start">
                <Link to="/create">
                    Start Game <FaArrowAltCircleRight />
                </Link>
            </button>
        </div>
    );
};

export default HomePage;
