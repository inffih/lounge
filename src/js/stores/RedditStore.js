import { observable } from 'mobx'

class RedditStore {
    @observable redditValue = ''
    @observable redditFeeds = []
}

export default RedditStore
