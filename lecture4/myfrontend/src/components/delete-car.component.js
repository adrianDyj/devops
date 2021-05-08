import React from 'react';
import axios from 'axios';
import { useState } from "react";
import '../App.css';

const DeleteCar = (params) => {

    const [carId, setCarId] = useState("");

    const deleteCar = (event) => {
        setCarId(event.target.value);
        axios.delete(`/api/cars/${carId}`)
            .then(response => response.data)
            .catch(error => console.log(error))

        event.preventDefault();
    };

    return (
        <>
            <br /><hr /><br />
            <form>
                <div class="mb-3">
                    <input class="form-control" type='text' value={carId} onChange={event => setCarId(event.target.value)} /><br />
                    <input class="btn btn-danger" type='submit' value='Delete car' onClick={deleteCar} />
                </div>
            </form>
        </>
    );
};

export default DeleteCar;