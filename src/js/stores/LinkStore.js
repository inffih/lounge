import { observable } from 'mobx'

class LinkStore {
  @observable links = [
    {url: 'google.com', name: 'google'},
    {url: 'yahoo.com', name: 'yahoo'},
    {url: 'bing.com', name: 'bing'}
  ]
}

export default LinkStore
