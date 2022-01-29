import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";


export const registration =  (data) => {
    return $host.post('register/', data)
        .then(response => {
            return response.data;
        });
}

// export const login = async (username, password) => {
//     const {data} = await $host.post('token/', {username, password});
//     localStorage.setItem('token', data.access);
//     localStorage.setItem('refresh', data.refresh);
//     localStorage.setItem('username', data.username);
//     const jwt = jwt_decode(data.access);
//     localStorage.setItem('id', jwt.user_id);
//     return jwt;
// }
export const login =  (formData) => {
    return  $host.post(`token/`, formData)
        .then(response => {
            return response;
        });
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' );
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token)
}

export const saveProfilePhoto =(file,username) => {
    return $authHost.patch('users/'+username+'/update/',file)
        .then(response => {
            return response;
        });
}
export const saveBackgroundPhoto =(file,username) => {
    return $authHost.patch('users/'+username+'/update/',file)
        .then(response => {
            return response;
        });
}
export const updateProfileQuery =(data,username) => {
    return $authHost.patch('users/'+username+'/update/',data)
        .then(response => {
            return response;
        });
}

export const getMyProfile =  (username) => {
    return $authHost.get('users/' + username)
        .then(response => {
            return response.data;
        });
}
export const addProfileComment =  (username,formData) => {
    return $authHost.post('users/' + username + '/comments/', formData)
        .then(response => {
            return response.data;
        });
}
export const getProfileComment =  (username) => {
    return $authHost.get('users/' + username + '/comments/')
        .then(response => {
            return response.data;
        });
}
export const deleteProfileComment =  (id) => {
    return $authHost.delete('users/comments/'+id+'/')
        .then(response => {
            return response.data;
        });
}
export const subscribe =  (username) => {
    return $authHost.post('subscribe/' + username +'/')
        .then(response => {
            return response.data;
        });
}

export const getNotifications =  (type) => {
    return $authHost.get('notifications/' + type +'/')
        .then(response => {
            return response.data;
        });
}
export const deleteNotifications =  (id) => {
    return $authHost.delete('notifications/' + id +'/')
        .then(response => {
            return response.data;
        });
}