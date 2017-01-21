import React from 'react'
import HackernewsFeedItem from './HackernewsFeedItem'
import Axios from 'axios'
import LoaderComponent from './LoaderComponent'
import { Card } from 'semantic-ui-react'

class Hackernews extends React.Component {

  constructor(){
    super()
    this.state = {
      news: [],
      fetching: false
    }
  }

  componentDidMount(){
    this.fetchNews()
  }

  fetchNews(){
    this.setState({fetching: true})
    Axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
      .then(response =>{
        this.loopNews(response.data)
    })
  }

  loopNews(ids) {
    let url = "";
    return (
      ids.slice(0, 10).map((id, index) => {
        url = 'https://hacker-news.firebaseio.com/v0/item/' + id + '.json?print=pretty'
        Axios.get(url)
          .then(response => {
            let newsArray = [...this.state.news, response.data]
            this.setState({news: newsArray})
          })
          .catch(function(error){
            console.log(error)
          })
        if(index === 9){
          this.setState({fetching: false})
        }
        return this.state.newsArray
      })
    )
  }

  render() {
    if(this.state.fetching){
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
    } else {
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
}

export default Hackernews
