import React, {useState, useEffect} from "react";
import axios from 'axios';
import DeleteCar from './DeleteCar';

const CarList = (props) => {

    const [car, setCar] = useState([]);

    useEffect(() => {
        axios.get('/api/cars')
            .then(response => setCar(response.data))
            .catch(error => console.log(error));
    }, []);
    
    const Update = (event) => {
        props.changeParentHandlerUpdate(event.target.name);
    }

    const Car = (props) => {
        return (
            <>
                <tr>
                    <td>{props.car.id}</td>
                    <td>{props.car.name}</td>
                    <td>
                         <button onClick={Update} name={props.car.id}>Update</button>
                        <DeleteCar id={props.car.id}/>
                    </td>
                </tr>
            </>
        );
    }

    return (
        <>
            <h4>Car list:</h4>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {car.map(car => (<Car car={car} key={car.id}></Car>))}
                </tbody>
            </table>
        </>
    );
}

export default CarList;