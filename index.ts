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
            .then(() => this.showNumberOfUserPosts())
            .then(() => this.notUniqueTitles())
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

    //solution task No 2
    showNumberOfUserPosts = () => {
        if (this._usersWithPosts.length === 0) {
            this.connectPostsWithUsers()
            this.showNumberOfUserPosts()
        } else {
            this._usersWithPosts.forEach(user => console.log(`${user.username} napisał ${user.posts?.length} postów`))
        }
    }

    //solution task No 3
    notUniqueTitles = () => {
        const postsTitle: string[] = []
        const notUniqueTitles: string[] = []

        this._posts.forEach(post => {
            postsTitle.push(post.title)
        })

        postsTitle.forEach((title, i) => {
            postsTitle.forEach((checkedTitle, j) => {
                if (title === checkedTitle && i !== j) {
                    notUniqueTitles.push(postsTitle[i])
                }
            })
        })
        notUniqueTitles.length === 0 ?
            console.log("Wszystkie tytuły sa unikalne") :
            console.log(`Powtarzające się tytuły to ${notUniqueTitles}`)

    }

}

const main = new Main()
