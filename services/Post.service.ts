import IPost from "../interfaces/Post.interface";
import fetch from 'node-fetch'
import {API_URL, ENDPOINTS} from "../CONST";

export default class PostService {
    fetchPosts = (): Promise<IPost[]> => {
        return fetch(`${API_URL}/${ENDPOINTS.POSTS}`).then(data  => data.json())
    }
}
