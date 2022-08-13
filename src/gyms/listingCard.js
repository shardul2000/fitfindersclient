import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ListingCard({gym}) {
  return (
    
    <Card sx={{width:"100%", height:'25em'}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={gym.coverImage}
          alt="gym pic"
          
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           {gym.displayName}
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            Last comment: 3 hours ago
          </Typography>
          <Typography variant="body2" color="text.secodary" sx ={{marginBlock:2}}>
            {gym.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

  );
}
