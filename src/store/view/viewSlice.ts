import { createSlice } from '@reduxjs/toolkit'
import { BookTypes } from '../../Views/Books/BookList'

type CollectionTypes = {
    id: string
    title: string
    description: string
    books: BookTypes[]
}

type BooksViewTypes = {
    collection: CollectionTypes | null
    viewCollection: boolean
}

export interface ViewTypes {
    books: BooksViewTypes
}

const initialState = {
    books: {
        collection: null,
        viewCollection: true
    }
} as ViewTypes

export const viewSlice = createSlice({
    name: 'view',
    initialState,
    reducers: {
        updateViewBookCollection: (state, action) => {
            state.books.collection = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { updateViewBookCollection } = viewSlice.actions

export default viewSlice.reducer