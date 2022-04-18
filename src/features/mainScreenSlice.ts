import { ServiceAPI } from './../API/serviceAPI';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { MediaItem } from '../API/api';

interface MainScreenState {
  mediaList: MediaItem[] | null,
  status: 'idle' | 'loading' | 'fail',
  mediaInfoStatus: 'idle' | 'loading' | 'fail',
  mediaUrl: string | null
}

const initialState: MainScreenState = {
  mediaList: null,
  status: 'idle',
  mediaInfoStatus: 'idle',
  mediaUrl: null
}

export const getMediaListAsync = createAsyncThunk(
  'mainScreen/FetchMedia',
  async () => {
    let promiseArr = []
    for (let i = 2; i < 8; i++) {
      promiseArr.push(ServiceAPI.getMediaList({ mediaListId: i }))
    }

    return Promise.all(promiseArr).then(data => {
      return data!.reduce((prev, cur) => {
        prev!.push(...cur!)
        return prev
      }, [])
    }).then(data => {
      data!.forEach(elem => {
        elem.Images = elem.Images.filter(el => el.ImageTypeCode === 'FRAME')
      })
      return data
    })
  }
)

export const getMediaPlayInfoAsync = createAsyncThunk(
  'mainScreen/FetchMediaPlayInfo',
  async (elemId: number) => {
    let response = ServiceAPI.getMediaInfo({mediaId: elemId, streamType: 'TRIAL'})
    return response
  }
)

const mainScreenSlice = createSlice({
  name: 'mainScreen', 
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMediaListAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getMediaListAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.mediaList = action.payload!
      }) 
      .addCase(getMediaPlayInfoAsync.pending, (state) => {
        state.mediaInfoStatus = 'loading'
      })
      .addCase(getMediaPlayInfoAsync.fulfilled, (state, action) => {
        state.mediaInfoStatus = 'idle'
        state.mediaUrl = action.payload!.ContentUrl
      })
  }
})

export default mainScreenSlice.reducer