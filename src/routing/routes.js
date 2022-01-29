import {
    ADD_CHAPTER_ROUTER, BLOG_ROUTE,
    BOOK_ROUTE, EDIT_BOOK_ROUTE, EDIT_CHAPTER_ROUTER,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    PROFILE_ROUTE,
    READER_ROUTER,
    REGISTRATION_ROUTE, SEARCH_BLOG_ROUTER, SEARCH_BOOK_ROUTER, SEARCH_USER_ROUTER, STATS_ALL_ROUTER,
    USER_ROUTE
} from "./consts";
import Main from "../pages/Main/Main";
import Login from "../pages/Registration/Login";
import Profile from "../pages/Profile/Profile";
import User from "../pages/User/User";
import Registration from "../pages/Registration/Registration";
import Book from "../pages/Book/Book";
import Chapter from "../pages/Chapter/Chapter";
import AddChapter from "../pages/Chapter/AddChapter";
import EditBook from "../pages/Book/EditBook";
import EditChapter from "../pages/Chapter/EditChapter";
import SearchBooks from "../pages/Search/SearchBooks";
import SearchUser from "../pages/Search/SearchUser";
import Blog from "../pages/Blog/Blog";
import SearchBlog from "../pages/Search/SearchBlog";
import Stats from "../pages/Stats/Stats";



export const authRoutes = [
    // {
    //     path: MY_BOOKS_ROUTER,
    //     Component: MyBooks
    // },
    {
        path: PROFILE_ROUTE,
        Component: Profile
    },

    {
        path: ADD_CHAPTER_ROUTER + '/:bookid',
        Component: AddChapter
    },
    {
        path: EDIT_BOOK_ROUTE + '/:id',
        Component: EditBook
    },
    {
        path: EDIT_CHAPTER_ROUTER + '/:bookid/:chapterid',
        Component: EditChapter
    },
]
export const noAuthRoutes = [

    {
        path: LOGIN_ROUTE,
        Component: Login
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Registration
    }
]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: SEARCH_BOOK_ROUTER + '/:form?/:genre?/:search?/:tags?/:paid?',
        Component: SearchBooks
    },
    {
        path: SEARCH_BLOG_ROUTER + '/:themes?/:search?',
        Component: SearchBlog
    },
    {
        path: SEARCH_USER_ROUTER,
        Component: SearchUser
    },
    {
        path: STATS_ALL_ROUTER,
        Component: Stats
    },
    {
        path: READER_ROUTER + '/:bookid/:chapterid',
        Component: Chapter
    },
    {
        path: USER_ROUTE + '/:id',
        Component: User
    },
    {
        path: BOOK_ROUTE + '/:id',
        Component: Book
    },
    {
        path: BLOG_ROUTE + '/:id',
        Component: Blog
    }
]