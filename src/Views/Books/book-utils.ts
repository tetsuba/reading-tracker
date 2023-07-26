import { ApiBookHistoryTypes, ApiBookTypes } from '../../api/api-types'
import {compose, defaultTo, ifElse, isEmpty, lastEntry} from '../../lib/utils'

const defaultIconColour = (): string => 'text-gray-300'
const notCompleted = (): false => false
const returnFalse = (): false => false

function getColorForIcon(isComplete: boolean): string {
    return isComplete ? 'text-green-500' : 'text-red-500'
}

function getPropertyWords(bookHistory: ApiBookHistoryTypes) {
    if (typeof bookHistory !== 'object') {
        throw new Error('argument { bookHistory } is not an object')
    }

    if (Object.hasOwn(bookHistory, 'words')) {
        return bookHistory.words
    }
    throw new Error('Object is missing word property')
}

function everyBookCompleted(bookIsCompleted: <T>(args: T) => T) {
    return function (books: ApiBookTypes[]) {
        return books.every(bookIsCompleted)
    }
}

function getPropertyHistory(book: ApiBookTypes) {
    if (Object.hasOwn(book, 'history')) {
        return book.history
    }
    throw new Error('Object is missing word property')
}

function filterBooksByTitle(books: ApiBookTypes[] | undefined, search: string): ApiBookTypes[] | [] {
    return books === undefined
        ? []
        : books.filter((book) =>
            book.title.toLowerCase().startsWith(search.toLowerCase())
        )
}

// COMPOSE
const getPropertyWordsFromLastEntry = compose(getPropertyWords, lastEntry)
const isBookCompleted = compose(isEmpty, getPropertyWordsFromLastEntry, getPropertyHistory)
const getIconColor = compose(getColorForIcon, isEmpty, getPropertyWordsFromLastEntry)
const isHistoryNull = compose(isEmpty, getPropertyHistory)


// ifElse
const isBookHistoryCompleted = ifElse(isHistoryNull, returnFalse, isBookCompleted)

// PARTIAL
const checkEveryBookCompleted = everyBookCompleted(isBookHistoryCompleted)

// DefaultTo
const getIconColorForBookRow =  defaultTo(defaultIconColour, getIconColor)
const allBooksCompleted = defaultTo(notCompleted, checkEveryBookCompleted)

// EXPORT
export {allBooksCompleted, getIconColorForBookRow, filterBooksByTitle}
