import {IUser} from "../interfaces/User.interface";
import fetch from 'node-fetch';
import {API_URL, ENDPOINTS} from "../CONST";

export default class UserService {

    fetchUser = (): Promise<IUser[]> =>{
      return  fetch(`${API_URL}/${ENDPOINTS.USERS}`).then((resp: any) => resp.json())
    }

}
