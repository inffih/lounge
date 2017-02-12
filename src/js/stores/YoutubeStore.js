import { observable } from 'mobx'
import LocalForage from 'localforage'

class YoutubeStore {
    @observable youtubeValue = ''
    @observable youtubeFeeds = []

    constructor(){
      let self = this
      LocalForage.getItem('localYoutubeFeeds').then(function(localYoutubeFeeds){
        if (localYoutubeFeeds != null){
          self.youtubeFeeds = localYoutubeFeeds
        }
      })

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
