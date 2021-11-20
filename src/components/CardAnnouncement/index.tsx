import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IAnnouncement } from '../../interface/announcement';
import './index.scss'

interface ICardAnnouncementProps {
    data: IAnnouncement;
    handleDelete: (id: number) => void;
    handleSelect: (id: number) => void;
}

export const CardAnnouncement = ( {data, handleDelete, handleSelect}: ICardAnnouncementProps) => {
    const { id, title } = data;
    return (
        <Card variant="outlined">
            <CardContent>
            <Typography variant="h5" component="div">
                {title}
            </Typography>
            </CardContent>
            <div className="btn-group">
                <CardActions>
                    <Button size="small" onClick={() => handleSelect(id)}>More info</Button>
                </CardActions>
                <CardActions>
                    <Button size="small" onClick={() => handleDelete(id)}>Delete</Button>
                </CardActions>
            </div>       
        </Card>
    );
}