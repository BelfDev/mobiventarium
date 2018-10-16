import React, { PureComponent } from "react"
import { StyleSheet, View, Text } from "react-native"
import {
  TouchableRipple,
  Button,
  Card,
  CardActions,
  CardContent,
  CardCover,
  Title,
  Paragraph
} from 'react-native-paper';

export default class Item extends PureComponent {
  render() {
    return (
      <TouchableRipple
        onPress={() => console.log('Pressed')}
        rippleColor="rgba(0, 0, 0, .32)"
      >
          <Card>
            <Card.Content>
              <Title>Card title</Title>
              <Paragraph>Card content</Paragraph>
            </Card.Content>
            <Text>
              lalalal
            </Text>
            <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
            <Card.Actions>
              <Button>Cancel</Button>
              <Button>Ok</Button>
            </Card.Actions>
          </Card>
      </TouchableRipple>
    );
  }
}

const styles = StyleSheet.create({

})