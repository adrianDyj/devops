import React from 'react';
import axios from 'axios';

const DeleteCar = (props) => {

    const submit = (event) => {
        axios.delete(`/api/car/${props.id}`)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });

    }

    return (
        <>
            <form>
                <input type='submit' value='Delete' onClick={submit} />
            </form>
        </>
    );

}

export default DeleteCar;