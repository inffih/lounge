import { observable } from 'mobx'
import LocalForage from 'localforage'
import Axios from 'axios'
import debounce from 'debounce'

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
    this.searchForChannel =  debounce(this.searchForChannel.bind(this), 400)
    this.handleYoutubeSearchChange =this.handleYoutubeSearchChange.bind(this)
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
        // fetch feeds to store
        localYoutubeFeeds.forEach(function(feed){
          self.fetchChannel(feed)
        })
      }
    })
  }

  // Fetch channel details by userId
  // Then pass along the "uploads"-playlist ID to fetchVideos
  fetchChannel(userId){
    Axios.get('https://www.googleapis.com/youtube/v3/channels', {
      params: {
        part: "contentDetails",
        id: userId,
        key: process.env.REACT_APP_GOOGLE_KEY
      }
    })
      .then(response => {
        let playlistId = response.data.items[0].contentDetails.relatedPlaylists.uploads
        this.fetchVideos(playlistId, userId);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Fetch videos by fetchChannel's playlist ID and set the response to state
  fetchVideos(playlistId, userId){
    Axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
      params: {
        part: "snippet",
        maxResults: 4,
        playlistId: playlistId,
        key: process.env.REACT_APP_GOOGLE_KEY
      }
    })
      .then(response => {
        this.youtubeData.push({
          data: response.data.items,
          channelId: userId,
          title: response.data.items[0].snippet.channelTitle})
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Update store to localforage
  handleLocalStorage(){
    LocalForage.setItem('localYoutubeFeeds', [...this.youtubeFeeds])
  }

  // Loop trought feeds array and if id matching the given
  // parameter is fround, delete it from store and localforage
  removeFeed(id){
    for (var i = 0; i < this.youtubeData.length; i++) {
      if (this.youtubeData[i].channelId === id ) {
        this.youtubeData.splice(i, 1)
      }
    }
    for (var i = 0; i < this.youtubeFeeds.length; i++) {
      if (this.youtubeFeeds[i] === id ) {
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
    if(this.youtubeSearchterm !== ""){
      this.searchForChannel()
    }
  }


  // Check if submitted does not exist yet
  // If not, then pass value to store and localforage
  handleYoutubeSubmit(event, data){
    event.preventDefault()
    if( !this.youtubeFeeds.includes(data.id) ){
      this.fetchChannel(data.id)
      this.youtubeFeeds.push(data.id)
      this.handleLocalStorage()
      this.youtubeSearchTerm = ""
    }
  }

  // TODO: Implement delay and check for too many consecutive request
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
