import React from 'react';
import './App.css';
import CarList from "./components/car-list.component";
import DeleteCar from "./components/delete-car.component";
import CreateCar from "./components/add-car.component";
import EditCar from "./components/edit-car.component";
import "bootstrap/dist/css/bootstrap.min.css";

const App = (props) => {

    return (
        <>
            <div class="container-sm mt-5">
                <div class="row">
                    <div class="col"></div>
                    <div class="col">
                        <CreateCar />
                        <DeleteCar />
                        <EditCar />
                        <CarList />
                    </div>
                    <div class="col"></div>
                </div>
            </div>
        </>
    );
}

export default App;