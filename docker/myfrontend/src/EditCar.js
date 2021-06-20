import React, {useState, useEffect} from 'react';
import axios from 'axios';

const EditCar = (props) => {

    const [nazwa, setNazwa] = useState("");

    useEffect(() => {
        axios.get(`api/cars/${props.id}`)
            .then(response => {
                setNazwa(response.data.nazwa);
            })
            .catch(error => console.log(error));
    }, [props.id]);

    const submit = (event) => {
        axios.put(`api/cars/${props.id}`, {
            nazwa: nazwa,
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });  
    }

    return (
        <div className="edit">
            <h2>Update car</h2>
            <h5>ID: {props.id}</h5>
            <form>
                <input type='text' placeholder='Name' value={nazwa} onChange={event => setNazwa(event.target.value)} /><br/>
                <input type='submit' value='Update' onClick={submit} />
            </form>
        </div>
    );

}

export default EditCar;