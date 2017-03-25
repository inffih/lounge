import { observable } from 'mobx'
import LocalForage from 'localforage'

class UiStore {
  @observable hackernewsVisible = false
  @observable introMessageVisible = true
  @observable youtubeInputErrorMsgVisible = false
  @observable redditInputErrorMsgVisible = false

  constructor(){
    let self = this
    LocalForage.getItem('localHackernewsVisible').then(function(localHackernewsVisible){
      if (localHackernewsVisible != null){
        self.hackernewsVisible = localHackernewsVisible
      }
    })

    LocalForage.getItem('localIntroMessageVisible').then(function(localIntroMessageVisible){
      if (localIntroMessageVisible != null){
        self.introMessageVisible = localIntroMessageVisible
      }
    })

    this.toggleHackernews = this.toggleHackernews.bind(this)
    this.handleYoutubeErrorDismiss = this.handleYoutubeErrorDismiss.bind(this)
    this.handleRedditErrorDismiss = this.handleRedditErrorDismiss.bind(this)
    this.toggleIntroMessage = this.toggleIntroMessage.bind(this)

  }

  handleYoutubeErrorDismiss(){
    this.youtubeInputErrorMsgVisible = !this.youtubeInputErrorMsgVisible
  }

  handleRedditErrorDismiss(){
    this.redditInputErrorMsgVisible = !this.redditInputErrorMsgVisible
  }

  toggleHackernews(event){
    this.hackernewsVisible = !this.hackernewsVisible
    LocalForage.setItem('localHackernewsVisible', this.hackernewsVisible)
  }

  toggleIntroMessage(){
    console.log(this.introMessageVisible)
    this.introMessageVisible = !this.introMessageVisible
    LocalForage.setItem('localIntroMessageVisible', false)
  }

}

export default UiStore
