import React from 'react';
import axios from 'axios';
import { useState } from "react";
import '../App.css';

const CreateCar = (params) => {

    const [model, setModel] = useState("");

    const createCar = (event) => {
        axios.post('/api/cars', {
            car: model
        })
            .then(response => console.log(response))
            .catch(error => console.log(error));

        event.preventDefault();
    };


    return (
        <>
            <form>
                <div class="mb-3">
                    <input class="form-control" type='text' value={model} onChange={event => setModel(event.target.value)} /><br />
                    <input class="btn btn-primary" type='submit' value='Add' onClick={createCar} />
                </div>
            </form>
        </>
    );
};

export default CreateCar;