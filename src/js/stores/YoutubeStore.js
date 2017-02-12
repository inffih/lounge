import { observable } from 'mobx'

class YoutubeStore {
    @observable youtubeValue = ''
    @observable youtubeFeeds = []
}

export default YoutubeStore
