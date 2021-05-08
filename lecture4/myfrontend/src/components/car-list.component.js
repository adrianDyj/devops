import React from 'react';
import axios from 'axios';
import { useState } from "react";
import '../App.css';

const CarList = (props) => {

    const [cars, getCars] = useState([]);
    const [carId, getCarById] = useState({});

    const showCars = (event) => {
        axios.get('/api/cars')
            .then(response => getCars(response.data))
            .catch(error => console.log(error));

        event.preventDefault();
    };

    const showCarById = (event) => {
        getCarById(event.target.value);
        axios.get(`/api/cars/${carId}`
        )
            .then(response => response.data)
            .catch(error => console.log(error));

        event.preventDefault();
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            showCarById(event)
        }
    }

    return (
        <>
            <br /><hr /><br />
            <form>
                <div class="mb-3">
                    <button class="btn btn-primary" onClick={showCars}>Show all cars</button>
                    <br />
                    {cars
                        .sort((a, b) => a.team.localeCompare(b.team))
                        .map(car => (<div key={car.id}>model: {car.model} | Predicted color: {car.color} | ID: {car.id}</div>))
                    }
                </div>
            </form>

            <br /><hr /><br />
            <form>
                <div class="mb-3">
                    <input class="form-control" type='text' defaultValue={''} value={carId}
                        onChange={event => getCarById(event.target.value)} onKeyDown={handleKeyDown} /><br />
                    <button class="btn btn-primary">Find car by id</button>
                    {
                        cars.map(car => car.id === carId ? <div key={car.id}>{car.model} | {car.color}</div> : <div key={carId} />)
                    }
                </div>
            </form>
        </>
    );
};

export default CarList;