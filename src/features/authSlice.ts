import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ServiceAPI } from '../API/serviceAPI';

interface AuthState {
  user: {
    userName: string | null
  }
  status: 'idle' | 'loading' | 'failed'
}

const initialState: AuthState = {
  user: {
    userName: null
  },
  status: 'idle'
}

export const authAsync = createAsyncThunk('auth/fetchProfile', 
  async ({userName, password}: {userName: string | null, password: string | null}) => {
    const response = await ServiceAPI.authLogin({userName, password})
    return response
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(authAsync.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(authAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.user.userName = action.payload!.User.FullName
      })
  }
})

export default authSlice.reducer