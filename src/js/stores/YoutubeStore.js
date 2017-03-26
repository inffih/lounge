import { observable } from 'mobx'
import LocalForage from 'localforage'

class YoutubeStore {
  @observable youtubeValue = ''
  @observable youtubeFeeds = []

  constructor(){

  // Uncomment this to clear localforage
    // LocalForage.clear()

    this.initializeYoutubeFeeds()

    this.handleYoutubeChange = this.handleYoutubeChange.bind(this)
    this.handleYoutubeSubmit = this.handleYoutubeSubmit.bind(this)
    this.removeFeed = this.removeFeed.bind(this)
  }

  initializeYoutubeFeeds(){
    var self = this
    LocalForage.getItem('localYoutubeFeeds').then(function(localYoutubeFeeds){
      if (localYoutubeFeeds !== null){
        self.youtubeFeeds = localYoutubeFeeds
      }
    })
  }

  // Add new feed to localforage
  handleLocalStorage(){
    LocalForage.setItem('localYoutubeFeeds', [...this.youtubeFeeds])
  }

  // Loop trought feeds array and if string matching
  // the given parameter is fround, delete it
  removeFeed(feed){
    console.log("removing ", feed)
    // Remove from store
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

  // Check if submitted does not exist yet
  // If not, then pass value to store and localforage
  handleYoutubeSubmit(event){
    event.preventDefault();
    if( !this.youtubeFeeds.includes(this.youtubeValue) ){
      this.youtubeFeeds.push(this.youtubeValue)
      this.handleLocalStorage()
      this.youtubeValue = ""
    }
  }
}

export default YoutubeStore
