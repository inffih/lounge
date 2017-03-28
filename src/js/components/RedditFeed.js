import React from 'react'
import RedditFeedItem from './RedditFeedItem'
import { Card, Grid, Button, Icon } from 'semantic-ui-react'

class RedditFeed extends React.Component {

  constructor(){
    super()
    this.showContent = this.showContent.bind(this);
    this.handleRemoveFeed = this.handleRemoveFeed.bind(this)
  }

  handleRemoveFeed(){
    this.props.removeFeed(this.props.name)
  }

  showContent(){
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>
            {this.props.name}
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
          {this.props.feed.map(item => {
            return <RedditFeedItem key={item.data.id} item={item}/>
          })}
        </Card.Content>
      </Card>
    )
  }

  render() {
    return (
      <Grid.Column mobile={16} tablet={8} computer={8}>
        {this.showContent()}
      </Grid.Column>
    )
  }
}

export default RedditFeed
