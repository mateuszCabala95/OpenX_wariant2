import {users,posts} from './response.mock'
import UserService from "../User.service";
import PostService from "../Post.service";
import fetchMock from "jest-fetch-mock";

require('jest-fetch-mock').enableMocks()

const userService = new UserService()
const postService = new PostService()

describe("userService test",  () => {
    beforeEach(()=>{
        fetchMock.doMock()
        fetchMock.mockResponseOnce(JSON.stringify(users))
    })

    it('should return array with user objects', async function () {
        const resp = await userService.fetchUser()
        expect(resp).toStrictEqual(users)
    });


})


describe("postService test", () => {
    beforeEach(()=>{
        fetchMock.doMock()
        fetchMock.mockResponseOnce(JSON.stringify(posts))
    })


    it('should return array of posts', async function () {
        const resp = await postService.fetchPosts()

        expect(resp).toStrictEqual(posts)
    });
})
