import { observable } from 'mobx'
import LocalForage from 'localforage'
import Axios from 'axios'

class RedditStore {
  @observable redditValue = ''
  @observable redditFeeds = []
  @observable redditSubreddits = []
  @observable redditSearchterm = ''
  @observable searchLoading = false

  constructor(){

    // Uncomment this to clear localforage
    // LocalForage.clear()

    this.initializeRedditFeeds()

    this.handleRedditChange = this.handleRedditChange.bind(this)
    this.searchForSubreddit = this.searchForSubreddit.bind(this)
    this.handleRedditSearchChange = this.handleRedditSearchChange.bind(this)
    this.handleRedditSubmit = this.handleRedditSubmit.bind(this)
    this.removeFeed = this.removeFeed.bind(this)
  }

  // Get store's inital state from localforage if
  // its not the first time user is using the store
  initializeRedditFeeds(){
    var self = this
    LocalForage.getItem('localRedditFeeds').then(function(localRedditFeeds){
      console.log("reddit localforage", localRedditFeeds)
      if (localRedditFeeds !== null){
        self.redditFeeds = localRedditFeeds
      }
    })
  }

  // Loop trought feeds array and if string matching
  // the given parameter is fround, delete it from store and localforage
  removeFeed(feed){
    for (var i = 0; i < this.redditFeeds.length; i++) {
      if (this.redditFeeds[i] === feed ) {
        this.redditFeeds.splice(i, 1)
        this.handleLocalStorage()
      }
    }
  }

  // Update store to localforage
  handleLocalStorage(){
    LocalForage.setItem('localRedditFeeds', [...this.redditFeeds])
  }

  // Check if submitted does not exist yet
  // If not, then pass value to store and localforage
  handleRedditSubmit(event, data){
    console.log("handling submit for ", data)
    event.preventDefault()
    if( !this.redditFeeds.includes(data.title) ){
      this.redditFeeds.push(data.title)
      this.handleLocalStorage()
      this.redditSearchTerm = ""
    }
  }

  handleRedditChange(event, data){
    this.redditValue = event.target.value
  }

  handleRedditSearchChange(event){
    this.redditSearchterm = event.target.value
    if(this.redditSearchterm !== ""){
      this.searchForSubreddit()
    }
  }

  searchForSubreddit(){
    this.searchLoading = true
    Axios.get('https://www.reddit.com/search.json', {
      params: {
        q: this.redditSearchterm,
        limit: 8,
        sort: "relevance",
        type: "sr"
      }
    })
    .then(response => {
      this.loopResults(response.data.data.children)
    })
  }

  loopResults(data){
    let resultArray = []
    data.forEach(function(item){
      let tempObj = {
        title: item.data.display_name_prefixed,
        image: item.data.icon_img,
        id: item.data.id
      }
      resultArray.push(tempObj)
    })
    this.redditSubreddits = resultArray
    this.searchLoading = false
  }
}

export default RedditStore
