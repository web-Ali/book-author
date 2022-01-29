import {$authHost, $host} from "./index";


export const getChaptersModeration = () => {
    return $authHost.get('moderation/book/')
        .then(response => {
            return response;
        });
}

export const verifyModeration = (chapterId,bool) => {

    return $authHost.post('/moderation/book/'+ chapterId +'/verify/', bool)
        .then(response => {
            return response;
        });
}
