import {IUser} from "./interfaces/User.interface";
import IPost from "./interfaces/Post.interface";
import PostService from "./services/Post.service";
import UserService from "./services/User.service";

class Main {
    private _users: IUser[] = []
    private _posts: IPost[] = []
    private _usersWithPosts: IUser[] = []
    private _closestUsers: Array<{ user: IUser, closestUser: IUser }> = []

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
            .then(() => this.closetUsers())
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

    //solution task No 4
    closetUsers = () => {
        this._users.forEach(firstUser => {
            let closestUser: IUser;
            let minWay = Number.MAX_VALUE


            this._users.forEach(secondUser => {
                let way = this.calcWay(firstUser, secondUser)

                if (way < minWay && way !== 0) {
                    minWay = way
                    closestUser = secondUser
                }
            })

            this._closestUsers.push({user: firstUser, closestUser})

        })
        this._closestUsers.forEach(pair => console.log(`Najbliżej użytkownika ${pair.user.username} jest użytkownik ${pair.closestUser.username}`))
    }

    private calcWay = (firstUser: IUser, secondUser: IUser): number => {


        try {
            //wzór na odległość między punktami
            //sqrt((x2-x1)^2+(y2-y1)^2)
            return Math.sqrt(
                Math.pow((Number.parseFloat(secondUser.address.geo.lat) - Number.parseFloat(firstUser.address.geo.lat)), 2) +
                Math.pow((Number.parseFloat(secondUser.address.geo.lng) - Number.parseFloat(firstUser.address.geo.lng)), 2)
            )

        } catch (e){
            throw Error("something goes wrong" + e.message)
        }
    }

}

const main = new Main()
