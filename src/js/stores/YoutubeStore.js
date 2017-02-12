import { observable } from 'mobx'
import LocalForage from 'localforage'

class YoutubeStore {
    @observable youtubeValue = ''
    @observable youtubeFeeds = []

    constructor(){
      this.handleYoutubeChange = this.handleYoutubeChange.bind(this)
      this.handleYoutubeSubmit = this.handleYoutubeSubmit.bind(this)
    }

    handleYoutubeChange(event){
      this.youtubeValue = event.target.value
    }

    handleYoutubeSubmit(event){
      event.preventDefault();
      this.youtubeFeeds.push(this.youtubeValue)
      LocalForage.setItem('localYoutubeFeeds', this.youtubeFeeds)
      this.youtubeValue = ""
    }
}

export default YoutubeStore
