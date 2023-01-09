import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';

const Aceptados = ({ perros, funcion1 = null }) => {

    useEffect(() => {

        getPerros();

    }, []);

    const [perritos, setPerritos] = useState([]);

    const getPerros = async () => {

        const request = await fetch('http://127.0.0.1:8000/api/perros/ObtenerPerros', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await request.json();

        setPerritos(data.perros);

    }

    return (

        <>

            {perritos.map((perro, index) => {

                return (

                    <div key={index}>

                        {perro.id === perros.perr_candidato &&

                            <Card sx={{ maxWidth: 400, mt: 1 }}>

                                <CardMedia

                                    component="img"
                                    width="400"
                                    height="300"
                                    image={perro.perr_imagen}
                                    alt="perrito"

                                />

                                <CardContent>

                                    <Typography gutterBottom variant="h4" component="div">
                                        {perro.perr_nombre}
                                    </Typography>

                                    <Typography variant="body1" gutterBottom >
                                        {perro.descripcion}
                                    </Typography>

                                </CardContent>

                                <CardActions>

                                    <Button variant="outlined" onClick={() => funcion1(perros)}>
                                        Otra oportunidad
                                    </Button>

                                </CardActions>

                            </Card>

                        }

                    </div>

                )

            })}

        </>

    )

}

export default Aceptados;
