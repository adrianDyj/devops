import React, {useState} from 'react';
import axios from 'axios';

const AddCar = (props) => {

    const [name, setName] = useState("");

    const submit = (event) => {
        axios.post('/api/cars', {
            name: name,
        })
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        });
    };

    return (
        <div>
            <h2>Add new car</h2>
            <form>
                <input type='text' placeholder='Name' value={name} onChange={event => setName(event.target.value)} /><br/>
                <input type='submit' value='Add car' onClick={submit} />
            </form>
        </div>
    );
};

export default AddCar;