import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function HomePage() {
    // State to store the list of countries
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        // Fetch data from the API and update the state
        axios
            .get('https://ih-countries-api.herokuapp.com/countries')
            .then((response) => {
                setCountries(response.data);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []); // The empty dependency array means this effect runs once, similar to componentDidMount.

    return (
        <div className="container mt-5">
            <h1 className="mb-4">WikiCountries: Your Guide to the World</h1>
            <ul className="list-group">
                {countries.map((country) => (
                    <li
                        key={country.alpha3Code}
                        className="list-group-item d-flex justify-content-between align-items-center" // Changed justify content to between
                    >
                        <div>
                            <img
                                src={`https://flagcdn.com/w80/${country.alpha2Code.toLowerCase()}.png`}
                                alt={country.name.common}
                                className="mr-3"
                            />
                            {/* Use Link to navigate to country details */}
                            <Link to={`/${country.alpha3Code}`}>{country.name.common}</Link>
                        </div>
                        <span className="badge badge-primary badge-pill">
                            {country.alpha3Code}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HomePage;
