import * as R from 'ramda'
import { useDispatch } from 'react-redux'

// TYPES
import { ApiCollectionTypes } from '../../api/api-types'

// STORE
import { updateCurrentCollectionId } from '../../store/current/currentSlice'

// UTILS
import { allBooksCompleted } from '../../Views/Books/book-utils'

// COMPONENTS
import Row from './Row'
import Button from '../Button/Button'

export type CollectionPropTypes = {
    data?: ApiCollectionTypes | undefined
    index?: number
}

export default function CollectionRow(props: CollectionPropTypes) {
    const dispatch = useDispatch()
    const { data, index = 0 } = props

    if (R.isNil(data)) return <>loading...</>
    const text = `${data.title} (${data.books.length})`
    const completed = allBooksCompleted(data.books)
    const iconColour = completed ? 'text-green-500' : ''

    return (
        <Row index={index} text={text} iconColor={iconColour} icon="library">
            <Button
                className="flex items-center"
                data-testid="collection-button"
                icon="eye"
                template={`${completed ? 'disabled' : 'secondary'}`}
                onClick={() => dispatch(updateCurrentCollectionId(data.id))}
                right
            >
                <span className="mr-1 hidden md:inline">View Books</span>
            </Button>
        </Row>
    )
}
