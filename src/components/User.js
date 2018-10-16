import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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

export default class User extends PureComponent {
    render() {
        return (
            <TouchableRipple
                onPress={() => console.log('Pressed')}
                rippleColor="rgba(0, 0, 0, .32)"
            >
                <View>
                    <Card>
                        <CardContent>
                            <Title>Card title</Title>
                            <Paragraph>Card content</Paragraph>
                        </CardContent>
                        <CardCover source={{ uri: 'https://picsum.photos/700' }} />
                        <CardActions>
                            <Button>Cancel</Button>
                            <Button>Ok</Button>
                        </CardActions>
                    </Card>
                </View>
            </TouchableRipple>
        );
    }

    _navigateTo() {
        this.props.navigate('posts', { user: this.props });
    }
}

const styles = StyleSheet.create({
    viewItem: {
        flex: 1,
        flexDirection: 'row',
        padding: 18
    },
    thumbnail: {
        width: 40,
        height: 40,
        backgroundColor: '#f5f5',
        marginEnd: 12,
        marginTop: 12
    },
    viewRight: {
        flex: 1,
        flexDirection: 'column'
    },
    title: {
        fontSize: 20,
        color: 'black'
    },
    subtitle: {
        fontSize: 16,
        color: 'gray'
    }
});
