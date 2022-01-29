import {$authHost} from "./index";


export const getBlog =(id) => {
    return $authHost.get('blog/'+id+'/')
        .then(response => {
            return response.data;
        });
}
export const getUserBlogs =(username) => {
    return $authHost.get('users/'+username+'/blog/')
        .then(response => {
            return response.data;
        });
}
export const getBlogThemes =() => {
    return $authHost.get('blog-themes/')
        .then(response => {
            return response.data;
        });
}

export const addBlog =(data) => {
    return $authHost.post('blog/', data)
        .then(response => {
            return response;
        });
}
export const updateBlog =(data,id) => {
    return $authHost.patch('blog/'+id+'/', data)
        .then(response => {
            return response;
        });
}
export const deleteBlog =(id) => {
    return $authHost.delete('blog/'+id+'/')
        .then(response => {
            return response;
        });
}
