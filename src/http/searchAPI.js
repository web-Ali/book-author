import {$authHost} from "./index";

export const searchBooks =  (search) => {
    return $authHost.get('books/?'+ search)
        .then(response => {
            return response.data;
        });
}
export const TempBooksAdvert =  () => {
    return $authHost.get('books/?form&paid=&genre=&tags=&search&ordering&s=3')
        .then(response => {
            return response.data.results;
        });
}
export const searchBlogs =  (search) => {
    return $authHost.get('blog/?'+ search)
        .then(response => {
            return response.data;
        });
}
