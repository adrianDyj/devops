import React from 'react';
import axios from 'axios';
import { useState } from "react";
import '../App.css';

const EditCar = (params) => {

    const [carId, setCarId] = useState("");
    const [model, setCarModel] = useState("");
    const [color, setCarColor] = useState("");

    const handleEdit = (event) => {
        setCarId(event.target.value);
        axios.put(`/api/cars/${carId}`, {
            model: model,
            color: color
        })
            .then(response => response.data)
            .catch(error => console.log(error))

        event.preventDefault();
    };

    return (
        <>
            <br /><hr /><br />
            <form>
                <div class="mb-3">
                    ID number: <input class="form-control" type='text' value={carId} onChange={event => setCarId(event.target.value)} /><br />
                    Model: <input class="form-control" type='text' value={model} onChange={event => setCarModel(event.target.value)} /><br />
                    Color: <input class="form-control" type='text' value={color} onChange={event => setCarColor(event.target.value)} /><br />
                    <input class="btn btn-primary" type='submit' value='Edit car' onClick={handleEdit} />
                </div>
            </form>
        </>
    );
}

export default EditCar;