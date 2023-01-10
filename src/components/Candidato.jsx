import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActions, Button } from '@mui/material';

const Candidato = ({ perros, funcion1 = null, funcion2 = null }) => {

    return (

        <Card variant="outlined" sx={{ maxWidth: 400, maxHeight: 600 }}>

            <CardMedia
                component="img"
                width="400"
                height="300"
                image={perros.perr_imagen}
                alt="perrito"
            />

            <CardContent>

                <Typography gutterBottom variant="h4" component="div">
                    {perros.perr_nombre}
                </Typography>

                <Typography variant="body1" gutterBottom >
                    {perros.descripcion}
                </Typography>

            </CardContent>

            <CardActions>

                <Button variant="outlined" color="success" onClick={() => funcion1(perros)}>
                    Aceptar
                </Button>

                <Button variant="outlined" color="error" onClick={() => funcion2(perros)}>
                    Rechazar
                </Button>

            </CardActions>

        </Card>
    )

}

export default Candidato;
