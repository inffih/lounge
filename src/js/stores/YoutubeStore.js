import { observable } from 'mobx'
import LocalForage from 'localforage'

class YoutubeStore {
  @observable youtubeValue = ''
  @observable youtubeFeeds = []

  constructor(){
    LocalForage.clear()
    this.handleYoutubeChange = this.handleYoutubeChange.bind(this)
    this.handleYoutubeSubmit = this.handleYoutubeSubmit.bind(this)
  }

  handleLocalStorage(){
    LocalForage.setItem('localYoutubeFeeds', [...this.youtubeFeeds])

    // Enable this to check curren localforage
    // .then(function(){
    //   LocalForage.getItem('localYoutubeFeeds').then(function(localYoutubeFeeds){
    //       console.log("changed localforage to", localYoutubeFeeds)
    //   })
    // })

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
