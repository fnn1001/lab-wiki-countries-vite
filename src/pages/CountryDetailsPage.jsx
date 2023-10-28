import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CountryDetailsPage() {
    const { countryId } = useParams(); // Access the countryId from the URL

    const [country, setCountry] = useState({});

    useEffect(() => {
        // Fetch data for the specific country using its alpha3Code
        axios
            .get(`https://ih-countries-api.herokuapp.com/countries/${countryId}`)
            .then((response) => {
                setCountry(response.data);
            })
            .catch((error) => console.error('Error fetching country details:', error));
    }, [countryId]); // Re-run the effect when the countryId changes

    return (
        <div className="container mt-5">
            {Object.keys(country).length > 0 ? ( // Check if country data is available
                <div>
                    <h1>{country.name.common} </h1>
                    <ul>
                        <li><img src={`https://flagcdn.com/w80/${country.alpha2Code.toLowerCase()}.png`} alt="" /></li>
                        <li>Capital: {country.capital}</li>
                        <li>Area: {country.area} km²</li>
                        <li>
                            Borders: {country.borders.length === 0 ? 'None' : country.borders.join(', ')}
                        </li>
                    </ul>
                </div>
            ) : (
                <p>Loading...</p> // Display a loading message when data is being fetched
            )}
        </div>
    );
}

export default CountryDetailsPage;
