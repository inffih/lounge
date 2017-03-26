import { observable } from 'mobx'
import LocalForage from 'localforage'
import Axios from 'axios'

class YoutubeStore {
  @observable youtubeValue = ''
  @observable youtubeSearchTerm = ''
  @observable youtubeFeeds = []
  @observable fetching = false
  @observable youtubeChannels = []
  @observable youtubeData = []
  @observable searchLoading = false

  constructor(){

    // Uncomment this to clear localforage
    // LocalForage.clear()

    this.initializeYoutubeFeeds()

    this.handleYoutubeChange = this.handleYoutubeChange.bind(this)
    this.searchForChannel = this.searchForChannel.bind(this)
    this.handleYoutubeChange = this.handleYoutubeChange.bind(this)
    this.handleYoutubeSearchChange = this.handleYoutubeSearchChange.bind(this)
    this.handleYoutubeSubmit = this.handleYoutubeSubmit.bind(this)
    this.removeFeed = this.removeFeed.bind(this)
  }


  // Get store's inital state from localforage if
  // its not the first time user is using the store
  initializeYoutubeFeeds(){
    var self = this
    LocalForage.getItem('localYoutubeFeeds').then(function(localYoutubeFeeds){
      if (localYoutubeFeeds !== null){
        self.youtubeFeeds = localYoutubeFeeds
      }
    })
  }

  // Update store to localforage
  handleLocalStorage(){
    LocalForage.setItem('localYoutubeFeeds', [...this.youtubeFeeds])
  }

  // Loop trought feeds array and if string matching
  // the given parameter is fround, delete it from store and localforage
  removeFeed(feed){
    for (var i = 0; i < this.youtubeFeeds.length; i++) {
      if (this.youtubeFeeds[i] === feed ) {
        this.youtubeFeeds.splice(i, 1)
        this.handleLocalStorage()
      }
    }
  }

  handleYoutubeChange(event){
    this.youtubeValue = event.target.value
  }

  handleYoutubeSearchChange(event){
    this.youtubeSearchTerm = event.target.value
    this.searchForChannel()
  }


  // Check if submitted does not exist yet
  // If not, then pass value to store and localforage
  handleYoutubeSubmit(event, data){
    event.preventDefault()
    if( !this.youtubeFeeds.includes(data.id) ){
      this.youtubeFeeds.push(data.id)
      this.handleLocalStorage()
      this.youtubeSearchTerm = ""
    }
  }

  searchForChannel(){
    this.searchLoading = true
    Axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: "snippet",
        q: this.youtubeSearchTerm,
        type: "channel",
        key: process.env.REACT_APP_GOOGLE_KEY
      }
    })
    .then(response => {
      this.loopResults(response.data.items)
    })
  }

  loopResults(data){
    let resultArray = []
    data.forEach(function(item){
      let tempObj = {
        title: item.snippet.title,
        image: item.snippet.thumbnails.medium.url,
        id: item.id.channelId
      }
      resultArray.push(tempObj)
    })
    this.youtubeChannels = resultArray
    this.searchLoading = false
  }

}

export default YoutubeStore
