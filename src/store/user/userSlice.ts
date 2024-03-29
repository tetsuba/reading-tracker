import { createSlice } from '@reduxjs/toolkit'
import ls from '../../lib/localStorage'
import { ActionTypes, StateUserTypes } from '../store.types'
import { ApiUserTypes } from '../../api/api-types'

interface UpdateUserActionTypes extends ActionTypes {
    payload: {
        user: ApiUserTypes
        token: string
    }
}

export const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    token: '',
    id: 0
} as StateUserTypes

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action: UpdateUserActionTypes) => {
            ls.save(action.payload.token)
            state.firstName = action.payload.user.firstName
            state.lastName = action.payload.user.lastName
            state.email = action.payload.user.email
            state.id = action.payload.user.id
            state.token = action.payload.token
        },
        resetUserToInitialState: () => initialState
    }
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUserToInitialState } = userSlice.actions

export default userSlice.reducer
