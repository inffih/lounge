import { observable } from 'mobx'
import LocalForage from 'localforage'

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
      LocalForage.setItem('localRedditFeeds', this.redditFeeds)
      this.redditValue = ""

      // this.redditFeeds = redditArray
      //
      // LocalForage.setItem('localRedditFeeds', this.redditFeeds).bind(this)
    }
}

export default RedditStore
