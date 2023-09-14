import { ApiBookHistoryTypes, ApiCollectionTypes } from '../api/api-types'
import store from './store'

export type ActionTypes = {
    type: string
}

export type StateBookHistoryTypes = ApiBookHistoryTypes

export interface StateBookTypes {
    bookId: number
    libId: string
    history: StateBookHistoryTypes[] | []
    story: string | string[]
    title: string
}

export interface StateUserTypes {
    firstName: string
    lastName: string
    email: string
    id: number
    token: string
}

export type BooksViewTypes = {
    collection: ApiCollectionTypes | null
}

export type StateViewGlobalTypes = {
    expired: boolean
}

export interface StateViewTypes {
    books: BooksViewTypes
    global: StateViewGlobalTypes
}

export interface StateTypes {
    user: StateUserTypes
    book: StateBookTypes
    view: StateViewTypes
}

export type AppDispatch = typeof store.dispatch
