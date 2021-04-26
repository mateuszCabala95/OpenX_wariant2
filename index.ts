import {IUser} from "./interfaces/User.interface";
import IPost from "./interfaces/Post.interface";
import PostService from "./services/Post.service";
import UserService from "./services/User.service";

class Main {
    private _users: IUser[] = []
    private _posts: IPost[] = []
    private _usersWithPosts: IUser[] = []

    private _postService: PostService;
    private _userService: UserService;

    constructor() {
        this._postService = new PostService()
        this._userService = new UserService()

        this.fetchUsers()
            .then(() => this.fetchPosts())
            .then(() => this.connectPostsWithUsers())
            .catch(e => console.log(e.message))
    }

    fetchUsers = async (): Promise<void> => {
        await this._userService.fetchUser().then(data => this._users = [...data])
    }

    fetchPosts = async (): Promise<void> => {
        await this._postService.fetchPosts().then(data => this._posts = [...data])
    }

    //solution task No 1
    connectPostsWithUsers = () => {
        this._users.forEach(user => {
            user.posts = []
            this._posts.forEach(post => {
                if (user.id === post.userId) {
                    user.posts!.push(post)
                }
            })
            this._usersWithPosts.push(user)
        })

    }

}

const main = new Main()
