import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteAnnouncement, selectAnnouncement, editAnnouncement } from '../../store/features/announcement-slice';
import { CardAnnouncement, CardDetails } from '../../components';
import { Grid, Paper, Box } from '@mui/material';
import { IAnnouncement } from '../../interface/announcement';
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import './index.scss'


export const DetailsPage = () => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const { id } = useParams();
    const data = useAppSelector(selectAnnouncement);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const getDataWithId = data.filter(item => item.id === +id!);
    const { title, description } = getDataWithId[0];
    const [titleValue, setTitleValue] = useState(title)
    const [descriptionValue, setDescriptionValue] = useState(description)

    const splitTitle = title.split(' ');
    const splitDescription = description.split(' ');
    const concatWords = splitTitle.concat(splitDescription)
    let similarAnnouncements = data.filter(item => item.id !== +id!)
        .filter(item => { 
            return concatWords.some(word => 
                item.title.match(new RegExp(`\\b${word}\\b`)) || item.description.match(new RegExp(`\\b${word}\\b`)));
    }).slice(0, 3);
    

    const handleDelete = (id: number) => {
        dispatch(deleteAnnouncement(id))
    }

    const handleSelect = (id: number) => {
        navigate(`/announcement/${id}`);       
    }


    const startEditing = () =>{
        if (isEdit) {
            setIsEdit(false)
            dispatch(editAnnouncement({
                id: +id!,
                title: titleValue,
                description: descriptionValue
            }))
        } else {
            setIsEdit(true)
        }
    }

    const Item = styled(Paper)(({ theme }) => ({
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <div className="DetailsPage">
            <Box sx={{ flexGrow: 1}}>
                <Grid container spacing={2}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        {getDataWithId.map(item => 
                            <CardDetails 
                                key={item.id} 
                                data={item} 
                                startEditing={startEditing}
                                isEdit={isEdit}
                                titleValue={titleValue}
                                setTitleValue={setTitleValue}
                                descriptionValue={descriptionValue}
                                setDescriptionValue={setDescriptionValue}
                            />
                        )}
                    </Grid>
                </Grid>
                <Grid container spacing={2} className="similar-announcements">
                    <Grid item lg={12} md={12} sm={12} xs={12} >
                        {similarAnnouncements.length === 0
                            ? (
                                <h1 className="similar-announcements__similar-title">
                                    No Similar Announcements
                                </h1>
                            )
                            : (
                                <h1 className="similar-announcements__similar-title">
                                    Similar Announcements
                                </h1>
                            )
                        }  
                    </Grid>
                    {similarAnnouncements.map((item:IAnnouncement) => {
                        return <Grid item key={item.id} lg={4} md={4} sm={6} xs={12}>
                            <Item>
                                <CardAnnouncement 
                                    data={item} 
                                    handleDelete={handleDelete}
                                    handleSelect={handleSelect}
                                />
                            </Item>
                        </Grid>
                    })}
                </Grid>
            </Box>
        </div>
    )
}
