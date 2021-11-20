import React, { ChangeEvent } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IAnnouncement } from '../../interface/announcement';
import { CustomInput } from '..';
import './index.scss'

interface CardDetailsProps {
    data: IAnnouncement;
    isEdit: boolean;
    startEditing: () => void;
    titleValue: string;
    setTitleValue: (value: string) => void;
    descriptionValue: string;
    setDescriptionValue: (value: string) => void;
}


export const CardDetails = ({ 
    data, 
    startEditing, 
    isEdit, 
    titleValue, 
    descriptionValue, 
    setTitleValue, 
    setDescriptionValue
}: CardDetailsProps) => {   
    const { title, description, dateAdded } = data;

    return (
       <Card variant="outlined">
             <CardContent>
             {!isEdit 
                     ? (
                         <Typography variant="h5" component="div" className="card-details__typography">
                            {title}
                         </Typography>
                     )
                     : (
                        <CustomInput 
                            className="card-details__input" 
                            value={titleValue}
                            onChange={(e: ChangeEvent<HTMLInputElement>)=> setTitleValue(e.target.value)}
                        />
                     )
             }
             <Typography variant="body1" component="div" className="card-details__typography">
                 <strong>Description:</strong>
                 {!isEdit 
                     ? (
                         <span>{description}</span>
                     )
                     : (
                         <CustomInput 
                            className="card-details__input" 
                            value={descriptionValue} 
                            onChange={(e: ChangeEvent<HTMLInputElement>)=> setDescriptionValue(e.target.value)}
                        />
                     )
                 }
             </Typography>
             <Typography variant="body1" className="card-details__typography">
                 <strong>Date Added:</strong> {dateAdded}
             </Typography>
             </CardContent>
             <CardActions>
                 <Button size="small" onClick={() => startEditing()}>
                    Edit
                 </Button>
             </CardActions>     
         </Card>
    )
}
