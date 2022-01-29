import {$authHost, $host} from "./index";




export const getHotBooks =  () => {
    return $authHost.get('hot/')
        .then(response => {
            return response.data;
        });
}
export const getPopularBooks =  () => {
    return $authHost.get('popular/')
        .then(response => {
            return response.data;
        });
}
export const getBestsellersBooks =  () => {
    return $authHost.get('bestsellers/')
        .then(response => {
            return response.data;
        });
}
export const getMostReadedBooks =  () => {
    return $authHost.get('most-readed/')
        .then(response => {
            return response.data;
        });
}
export const getAuthors =  () => {
    return $authHost.get('author-of-day/')
        .then(response => {
            return response.data;
        });
}
export const getContinueRead =  () => {
    return $authHost.get('last-read/')
        .then(response => {
            return response.data;
        });
}


export const getBook =  (id) => {
    return $authHost.get('books/' + id+'/')
        .then(response => {
            return response.data;
        });
}

export const getBookmarks =  () => {
    return $authHost.get('bookmarks/')
        .then(response => {
            return response.data;
        });
}

export const getBooksInfo =  () => {
    return $host.get('books/info/')
        .then(response => {
            return response.data;
        });
}
export const getAllBooksUser =  (username) => {
    return $authHost.get('users/'+ username+'/books/')
        .then(response => {
            return response.data;
        });
}


export const getChapter = (BookId,ChapterId) => {
    return $authHost.get('chapter/' + BookId +'/' + ChapterId+'/')
        .then(response => {
            return response;
        });
}
export const addChapter =(book,bookid) => {

    return $authHost.post('chapter/'+bookid+'/',book)
        .then(response => {
            return response;
        });
}

export const addTag =(tag) => {
    return $authHost.post('tag/',tag)
        .then(response => {
            return response;
        });
}
export const addBook =(book) => {
    return $authHost.post('books/',book)
        .then(response => {
            return response;
        });
}

export const addBookmark =(id) => {
    return $authHost.post('/books/'+id+'/bookmark/')
        .then(response => {
            return response;
        });
}
export const removeBookmark =(id) => {
    return $authHost.delete('/books/'+id+'/bookmark/')
        .then(response => {
            return response;
        });
}
export const deleteBook =(book) => {
    return $authHost.delete('books/'+book+'/')
        .then(response => {
            return response;
        });
}
export const deleteChapter =(bookId, chapterId) => {
    return $authHost.delete('chapter/'+bookId+'/'+chapterId+'/')
        .then(response => {
            return response;
        });
}
export const likedBook = (id) => {
    return $authHost.post('books/'+id+'/like/')
        .then(response => {
            return response;
        });
}
export const noLikedBook = (id) => {
    return $authHost.delete('books/'+id+'/like/')
        .then(response => {
            return response;
        });
}
export const savePhoto =(file,id) => {
    return $authHost.patch('books/'+id+'/',file)
        .then(response => {
            return response;
        });
}
export const bookVerify =(id) => {
    return $authHost.get('books/'+id+'/verify/')
        .then(response => {
            return response;
        });
}
export const editionBook =(id,data) => {
    return $authHost.patch('books/'+id+'/',data)
        .then(response => {
            return response;
        });
}
export const editionChapter =(bookId,chapterId,data) => {
    return $authHost.put('chapter/'+bookId+'/'+chapterId+'/',data)
        .then(response => {
            return response;
        });
}
