import React, { useState, useEffect } from 'react'
import './App.css'
import Candidato from './components/Candidato';
import Aceptados from './components/Aceptados';
import Rechazados from './components/Rechazados';
import { CircularProgress } from '@mui/material';

function App() {

  useEffect(() => {

    getPerros();
    getAceptados();
    getRechazados();

  }, [])

  const [perros, setPerros] = useState([]);
  const [aceptados, setAceptados] = useState([]);
  const [rechazados, setRechazados] = useState([]);

  const [loadingPerros, setLoadingPerros] = useState(true);
  const [loadingAceptados, setLoadingAceptados] = useState(true);
  const [loadingRechazados, setLoadingRechazados] = useState(true);

  const getPerros = async () => {

    const request = await fetch('http://127.0.0.1:8000/api/interaccion/ObtenerCandidato', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await request.json();

    setPerros(data.interaccion);
    setLoadingPerros(false);

  }

  const postAceptados = async (perros) => {

    setLoadingPerros(true);

    const request = await fetch('http://127.0.0.1:8000/api/interaccion/AgregarInteraccion', {
      method: 'POST',
      body: JSON.stringify({ "perr_interesado": 1, "perr_candidato": perros.id, "preferencia": "Aceptado" }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    getPerros();
    getAceptados();
    getRechazados();

  }

  const postRechazados = async (perros) => {

    setLoadingPerros(true);

    const request = await fetch('http://127.0.0.1:8000/api/interaccion/AgregarInteraccion', {
      method: 'POST',
      body: JSON.stringify({ "perr_interesado": 1, "perr_candidato": perros.id, "preferencia": "Rechazado" }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    getPerros();
    getAceptados();
    getRechazados();

  }

  const putOportunidad = async (perros) => {

    setLoadingAceptados(true);
    setLoadingRechazados(true);

    const request = await fetch('http://127.0.0.1:8000/api/interaccion/CambiarPreferencia/'+perros.id, {
      method: 'PUT',
      body: JSON.stringify({ "preferencia": "Aceptado" }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    getAceptados();
    getRechazados();

  }

  const putArrepentidos = async (perros) => {

    setLoadingAceptados(true);
    setLoadingRechazados(true);

    const request = await fetch('http://127.0.0.1:8000/api/interaccion/CambiarPreferencia/'+perros.id, {
      method: 'PUT',
      body: JSON.stringify({ "preferencia": "Rechazado" }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    getAceptados();
    getRechazados();

  }

  const getAceptados = async () => {

    const request = await fetch('http://127.0.0.1:8000/api/interaccion/ObtenerPerroAceptados', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await request.json();

    setAceptados([...data.interaccion].reverse());
    setLoadingAceptados(false);

  }

  const getRechazados = async () => {

    const request = await fetch('http://127.0.0.1:8000/api/interaccion/ObtenerPerroRechazados', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await request.json();

    setRechazados([...data.interaccion].reverse());
    setLoadingRechazados(false);

  }

  return (

    <>

     <h1 className='titulo'>Tinder perruno</h1>

    <div className='tinder'>

      <div className="candidato">

        <h1>Perro candidato</h1>

        {loadingPerros ? <CircularProgress /> :

          <Candidato perros={perros} funcion1={postAceptados} funcion2={postRechazados} />

        }

      </div>

      <div className="dog1">

        <h1>Aceptados</h1>

        {loadingAceptados ? <CircularProgress /> :

          <>

            {aceptados.map((aceptado, index) => (

              <Aceptados key={index} perros={aceptado} funcion2={putArrepentidos} />

            ))}

          </>

        }

      </div>

      <div className="dog2">

        <h1>Rechazados</h1>

        {loadingRechazados ? <CircularProgress /> :

          <>

            {rechazados.map((rechazado, index) => (

              <Rechazados key={index} perros={rechazado} funcion1={putOportunidad} />

            ))}

          </>

        }

      </div>

    </div>

    </>

  )
}

export default App
