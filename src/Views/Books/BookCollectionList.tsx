import Svg from '../../Components/Svg/Svg'
import Button from '../../Components/Button/Button'
import BookList from './BookList'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { viewBooksSelector } from '../../store/view/viewSelectors'
import { updateViewBookCollection } from '../../store/view/viewSlice'
import { ApiCollectionTypes } from '../../lib/service-types'

type PropTypes = {
    collections: ApiCollectionTypes[]
}

export default function BookCollectionList(props: PropTypes) {
    const dispatch = useDispatch()
    const viewBooks = useSelector(viewBooksSelector)

    useEffect(() => {
        if (viewBooks.collection) {
            props.collections.forEach((collection) => {
                if (
                    viewBooks.collection &&
                    collection.id === viewBooks.collection.id
                ) {
                    dispatch(updateViewBookCollection(collection))
                }
            })
        }
    }, [props.collections])

    return (
        <div data-testid="collection-list">
            {!viewBooks.collection &&
                props.collections.map((collection, i: number) => (
                    <div
                        key={`book-list-${i}`}
                        className={`flex justify-between px-4 py-5 sm:gap-4 sm:px-6 ${
                            i & 1 ? 'bg-white' : 'bg-gray-50'
                        }`}
                    >
                        <div className="flex items-center">
                            <span className={`mr-6`}>
                                <Svg icon="library" />
                            </span>{' '}
                            <span className="font-medium text-gray-800">
                                {collection.title} ({collection.books.length})
                            </span>
                        </div>
                        <div className="flex justify-end">
                            <Button
                                className="flex items-center"
                                data-testid="collection-button"
                                template="secondary"
                                onClick={() => {
                                    dispatch(
                                        updateViewBookCollection(collection)
                                    )
                                }}
                            >
                                <span className="hidden md:inline">
                                    View Books
                                </span>
                                <Svg icon="eye" className="md:ml-2" />
                            </Button>
                        </div>
                    </div>
                ))}

            {viewBooks.collection && (
                <BookList
                    libId={viewBooks.collection.id}
                    title={viewBooks.collection.title}
                    list={viewBooks.collection.books}
                    clickHandlerBack={() =>
                        dispatch(updateViewBookCollection(null))
                    }
                    delete={viewBooks.collection.id === '001'}
                />
            )}
        </div>
    )
}
