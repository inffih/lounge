import React from 'react'
import HackernewsFeedItem from './HackernewsFeedItem'
import Axios from 'axios'
import LoaderComponent from './LoaderComponent'
import { Card } from 'semantic-ui-react'
import LocalForage from 'localforage'

class Hackernews extends React.Component {

  // State includes news array and fetching boolean
  constructor(){

    super()
    this.state = {
      news: [],
      fetching: false
    }
    this.showLoading = this.showLoading.bind(this);
    this.showContent = this.showContent.bind(this);
  }

  // Check if news array exist locally, if not, fetch from api
  componentDidMount(){

    let self = this
    LocalForage.getItem('localHackernews').then(function(localHackernews){
      if (localHackernews != null){
        console.log("using localforage HN")
        self.setState({news: localHackernews})
      }
      else {
        console.log("fetching HN")
        self.fetchNews()
      }
    })
  }

  // Fetch news IDs and pass them to loopNews
  fetchNews(){

    this.setState({fetching: true})
    Axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
      .then(response =>{
        this.loopNews(response.data)
    })
  }

  // Use fetchNews' IDs to fetch the actual news
  loopNews(ids) {
    let url = "";
    return (
      ids.slice(0, 10).map((id, index) => {
        url = 'https://hacker-news.firebaseio.com/v0/item/' + id + '.json?print=pretty'
        Axios.get(url)
          .then(response => {
            let newsArray = [...this.state.news, response.data]
            this.setState({news: newsArray})
            if(index === 9){
              this.setState({fetching: false})
              LocalForage.setItem('localHackernews', this.state.news)
            }
          })
          .catch(function(error){
            console.log(error)
          })
        return this.state.newsArray
      })
    )
  }

  // UI component for loading state
  showLoading(){
    return (
      <Card>
        <Card.Content>
          <Card.Header>
            Hackernews
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <LoaderComponent/>
        </Card.Content>
      </Card>
    )
  }

  // UI component for posts
  showContent(){
    return (
      <Card>
        <Card.Content>
          <Card.Header>
            Hackernews
          </Card.Header>
        </Card.Content>
        <Card.Content>
          {this.state.news.map(item => {
            return <HackernewsFeedItem key={item.id} item={item}/>
          })}
        </Card.Content>
      </Card>
    )
  }

  // Check if fetching or not, and show UI components accordingly
  render() {
    return (
      <div>
        { this.state.fetching ? <this.showLoading/> : <this.showContent/> }
      </div>
    )
  }
}

export default Hackernews
