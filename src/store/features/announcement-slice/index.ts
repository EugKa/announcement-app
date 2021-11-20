import { createSlice } from '@reduxjs/toolkit'
import { DataAnno } from '../../../data';
import { IAnnouncement } from '../../../interface/announcement';
import type { RootState } from '../../index';

interface dataState {
  AnnouncementsData: IAnnouncement[];
}

const initialState: dataState = {
  AnnouncementsData: DataAnno
}


export const AnnouncementSlice = createSlice({
    name: '@@Announcement',
    initialState,
    reducers: {
      createAnnouncement: (state, action) => {
        state.AnnouncementsData.push(action.payload)
      },
      editAnnouncement(state, action) {
        const { id, title, description } = action.payload;
        const existingAnnouncement = state.AnnouncementsData.find((item) => item.id === id);
        if (existingAnnouncement) {
          existingAnnouncement.title = title;
          existingAnnouncement.description = description;
        }
        
      },
      deleteAnnouncement(state, action) {
        const newData = state.AnnouncementsData.filter(item => item.id !== action.payload)
        state.AnnouncementsData = newData
      },
    },
    extraReducers: (builder) => {
      
    }
})

export const { createAnnouncement, editAnnouncement, deleteAnnouncement } = AnnouncementSlice.actions
  
export const selectAnnouncement = (state: RootState) => state.AnnouncementSlice.AnnouncementsData;
export default AnnouncementSlice.reducer;
