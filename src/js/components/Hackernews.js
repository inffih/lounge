import React from 'react'
import HackernewsFeedItem from './HackernewsFeedItem'
import Axios from 'axios'
import { Card } from 'semantic-ui-react'
import * as hackerNews from '../../tempdata/hackernews.json'

class Hackernews extends React.Component {

  constructor(){
    super()
    this.state = {
      news: hackerNews[0]
    }
  }

  componentDidMount(){
    // Axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
    //   .then(response =>{
    //     this.loopNews(response.data)
    //   })
  }

  loopNews(ids) {
    let url = "";
    let news = [];
    ids.slice(0, 10).map(id => {
      url = 'https://hacker-news.firebaseio.com/v0/item/' + id + '.json?print=pretty';
      Axios.get(url)
        .then(function(response){
          news.push(response.data)
        })
        .catch(function(error){
          console.log(error)
        })
    })

    this.setState({
      news: news
    })
  }

  render() {
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
}

export default Hackernews
