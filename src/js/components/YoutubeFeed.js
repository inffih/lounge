import React, { Component } from 'react'
import YoutubeFeedItem from './YoutubeFeedItem'
import { Card, Grid, Button, Icon } from 'semantic-ui-react'
import LoaderComponent from './LoaderComponent'
import Axios from 'axios'

class YoutubeFeed extends Component {

  // State includes youtubeData array for videos and fetching boolean
  constructor(){
    super()
    this.handleRemoveFeed = this.handleRemoveFeed.bind(this)
    this.showContent = this.showContent.bind(this)
  }

  handleRemoveFeed(){
    this.props.removeFeed(this.props.id)
  }

  // UI component for videolist
  showContent() {
    console.log(this.props)
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>
          {this.props.title}
              <Button
                floated="right"
                compact
                icon
                circular
                onClick={this.handleRemoveFeed}
              >
                <Icon name='close' />
              </Button>
          </Card.Header>
        </Card.Content>
        <Card.Content>
          {this.props.data.map(item => {
            return <YoutubeFeedItem key={item.id} item={item.snippet}/>
          })}
        </Card.Content>
      </Card>
    )
  }

  render() {

    return (
      <Grid.Column mobile={16} tablet={8} computer={8}>
        { this.showContent() }
      </Grid.Column>
    )
  }

}

export default YoutubeFeed
