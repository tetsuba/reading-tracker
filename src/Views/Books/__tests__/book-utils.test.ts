import {allBooksCompleted, getIconColorForBookRow} from '../book-utils'
import {ApiBookTypes} from "../../../api/api-types";

describe('book-utils', () => {
    describe('getIconColorForBookRow()', () => {
        test('should return default color', () => {
            expect(getIconColorForBookRow(undefined)).toEqual('text-gray-300')
            // @ts-ignore
            expect(getIconColorForBookRow(null)).toEqual('text-gray-300')
            // @ts-ignore
            expect(getIconColorForBookRow({})).toEqual('text-gray-300')
            expect(getIconColorForBookRow([])).toEqual('text-gray-300')
        })
        test('should return green if words is an empty array', () => {
            const history = [{ date: '12/12/2222', words: [] }]
            expect(getIconColorForBookRow(history)).toEqual('text-green-500')
        })
        test('should return red if words is not an empty array', () => {
            const history = [{ date: '12/12/2222', words: ['there'] }]
            expect(getIconColorForBookRow(history)).toEqual('text-red-500')
        })
        test('should throw and error if words is missing from the object', () => {
            const history = [{ date: '12/12/2222' }]
            expect(() => getIconColorForBookRow(history)).toThrowError(
                'Object is missing word property'
            )
        })
        test('should throw and error if argument is not an object', () => {
            const history = [{ date: '12/12/2222' }]
            // @ts-ignore
            expect(() => getIconColorForBookRow(0)).toThrowError(
                'argument { bookHistory } is not an object'
            )
            // @ts-ignore
            expect(() => getIconColorForBookRow('')).toThrowError(
                'argument { bookHistory } is not an object'
            )
        })
    })
    describe('allBooksCompleted()', () => {
        const booksCompleted: ApiBookTypes[] = [
            {
                id: 1,
                story: [],
                title: '',
                userId: 1,
                history: [
                    { date: '', words: ['word'] },
                    { date: '', words: [] }
                ]
            },
            {
                id: 1,
                story: [],
                title: '',
                userId: 1,
                history: [{ date: '', words: [] }]
            },
            {
                id: 1,
                story: [],
                title: '',
                userId: 1,
                history: [{ date: '', words: [] }]
            }
        ]
        const booksNotCompleted: ApiBookTypes[] = [
            {
                id: 1,
                story: [],
                title: '',
                userId: 1,
                history: [{ date: '', words: ['word'] }]
            },
            {
                id: 1,
                story: [],
                title: '',
                userId: 1,
                history: [{ date: '', words: [] }]
            },
            {
                id: 1,
                story: [],
                title: '',
                userId: 1,
                history: [{ date: '', words: [] }]
            }
        ]
        test('if all books are completed', () => {
            expect(allBooksCompleted(booksCompleted)).toBeTruthy()
        })
        test('if all books are not completed', () => {
            expect(allBooksCompleted(booksNotCompleted)).toBeFalsy()
        })
        test('if all books are not completed', () => {
            expect(allBooksCompleted(undefined)).toBeFalsy()
        })
    })
})
