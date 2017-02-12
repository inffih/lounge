import { observable } from 'mobx'

class UiStore {
  @observable hackernewsVisible = false
  @observable introMessageVisible = true
}

export default UiStore
