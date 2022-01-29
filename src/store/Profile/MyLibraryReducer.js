import {getBookmarks} from "../../http/booksAPI";

const SET_BOOKMARK = 'SET_BOOKMARK';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const ERROR = 'ERROR';


let initialState = {
    data: {},
    isFetching: true,
    error: ''
};

const MyLibraryReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BOOKMARK: {
            return {...state, data: action.book}
        }
        // case SAVE_PHOTO_SUCCESS: {
        //     return {...state, data: {...state.data, cover: action.photo }}
        // }
        // case LIKED: {
        //     return {...state, data: {...state.data, is_liked: action.liked }}
        // }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case ERROR: {
            return {...state, error: action.error}
        }
        default:
            return state;
    }
}


export const setBook = (book) => ({type: SET_BOOKMARK, book});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const setError = (error) => ({type: ERROR, error});

export const requestBookmark = (id) =>{
    return async (dispatch) => {
        try {
            dispatch(toggleIsFetching(true));
            dispatch(setError(''));
            let data = await getBookmarks(id)
            dispatch(toggleIsFetching(false));
            dispatch(setBook(data));
        }
        catch (e) {
            dispatch(setError(e.data));
            dispatch(toggleIsFetching(false));

        }

    }
}

export default MyLibraryReducer