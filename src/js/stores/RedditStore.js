import { observable } from 'mobx'

class RedditStore {
    @observable redditValue = ''
    @observable redditFeeds = []

    constructor(){
      this.handleRedditChange = this.handleRedditChange.bind(this)
      this.handleRedditSubmit = this.handleRedditSubmit.bind(this)
    }

    handleRedditChange(event, data){
      this.redditValue = event.target.value
    }

    handleRedditSubmit(event){
      event.preventDefault()
      this.redditFeeds.push(this.redditValue)
      this.redditValue = ""
    }
}

export default RedditStore
