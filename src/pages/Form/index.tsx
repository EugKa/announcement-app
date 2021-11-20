import React from 'react'
import { Button, Card } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../store/hooks';
import { CustomInput } from '../../components';
import './index.scss'
import { createAnnouncement } from '../../store/features/announcement-slice';
import moment from 'moment';


interface FormPageState {
    title: string;
    description: string;
}
export const FormPage = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormPageState>();
    const dispatch = useAppDispatch();

    const onSubmit = (formData: FormPageState) => {
        const { title, description } = formData;
        dispatch(createAnnouncement({
            id: Date.now(),
            title,
            description,
            dateAdded: moment().format("DD/MM/YYYY"),
        }))
        reset();
    }

    return (
        <div className="form-page">
            <Card className="card" variant="outlined">
                <form className="card__form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="card__form-wrapper">
                        <CustomInput
                            className="card__form-custom-input"
                            label="Announcement title"
                            {...register('title', { required: { value: true, message: 'Pleace enter announcement title'}})} 
                            error={errors.title!}
                        />
                        <CustomInput
                            className="card__form-custom-input" 
                            label="Announcement description"
                            {...register('description', { required: { value: true, message: 'Pleace enter announcement description'}})} 
                            error={errors.description!}
                        />
                        <Button className="card__form-btn" variant="contained" color="primary" type="submit">
                            Create announcement
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    )
}
