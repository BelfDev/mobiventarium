import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class User extends PureComponent {
    render() {
        return (
            <TouchableOpacity style={styles.viewItem}
                onPress={() => this._navigateTo()}>
                <View style={styles.thumbnail}>

                </View>
                <View>
                    <Text style={styles.title}>{this.props.name}</Text>
                    <Text style={styles.subtitle}>{this.props.username}</Text>
                    <Text style={styles.subtitle}>{this.props.email}</Text>
                </View>
            </TouchableOpacity>
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
