import React, { PureComponent } from "react"
import { StyleSheet } from "react-native"
import { Card } from "react-native-paper"

export default class Item extends PureComponent {
  render() {
    return (
      <Card>
        <Card.Content>
          <Title>Card title</Title>
          <Paragraph>Card content</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>
    );
  }
}

const styles = StyleSheet.create ({
   
})