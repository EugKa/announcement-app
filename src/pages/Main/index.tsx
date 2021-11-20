import React, { ChangeEvent, useState } from 'react'
import { IAnnouncement } from '../../interface/announcement';
import { deleteAnnouncement, selectAnnouncement } from '../../store/features/announcement-slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Grid, Paper, Box, Card } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CardAnnouncement, CustomInput } from '../../components';
import { useNavigate } from "react-router-dom";
import './index.scss'

export const MainPage = () => {
    const [search, setSearch] = useState('');
    const data = useAppSelector(selectAnnouncement);
    const dispatch = useAppDispatch();
    let navigate = useNavigate();

    const handleDelete = (id: number) => {
        dispatch(deleteAnnouncement(id))
    }


    const handleSelect = (id: number, ) => {
        navigate(`/announcement/${id}`);       
    }

    const handleSearh = (e: ChangeEvent<HTMLInputElement>) => {   
        setSearch(e.target.value)
    }

    
    const visibleItem = search.length === 0 
        ? data
        : data.filter(item => item.title.toLocaleLowerCase()
            .indexOf(search.toLocaleLowerCase()) > -1);
    
    const Item = styled(Paper)(({ theme }) => ({
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    
    return (
        <div className="main-page">
            <Card className="main-page-card" variant="outlined">
                <CustomInput 
                    value={search} 
                    onChange={handleSearh} 
                    className="main-page-card__input" 
                    label="Search announcements"
                />
            </Card>
            <Box sx={{ flexGrow: 1}}>
                <Grid container  spacing={2}>
                    {visibleItem.map((item:IAnnouncement) => {
                        return <Grid item key={item.id}  lg={4} md={4} sm={6} xs={12}>
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
