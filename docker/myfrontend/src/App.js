import './App.css';
import React, {useState} from 'react';
import AddCar from './AddCar';
import CarList from './CarList';
import EditCar from './EditCar';

function App() {

  const [setId] = useState(0);
  const [idUpdate, setIdUpdate] = useState([]);

  const ShowEditCar = (props) => {
    return <EditCar id={props.id} />
  }

  return (
    <div> 
      <div class="header">
        <AddCar/>
        <ShowEditCar id={idUpdate}/>
      </div>
      <CarList changeParentHandlerId={setId} changeParentHandlerUpdate={setIdUpdate}/>
    </div>
  );
}

export default App;
