import React, { Component } from 'react';
import { StyleSheet, FlatList, View, RefreshControl } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import { toJS } from 'mobx';
import User from '../components/User';
import Item from '../components/Item'

@inject('usersStore')
@observer
export default class UserListScreen extends Component {

    render() {
        const { usersStore } = this.props;
        return (
            <FlatList
            style={styles.list}
                data={toJS(usersStore.users)}
                refreshing={usersStore.isRefresing}
                refreshControl={
                    <RefreshControl
                        refreshing={usersStore.isRefresing}
                        onRefresh={async () => await usersStore.fetchUsersAsync()}
                    />
                }
                extraData={this.props}
                keyExtractor={this._keyExtractor.bind(this)}
                renderItem={this._renderItem.bind(this)}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        );
    }

    _keyExtractor = item => item.id.toString();

    _renderItem = ({ item }) => {
        const { navigation } = this.props;
        const params = Object.assign({}, item, navigation)
        return (
            <Item 
            {...params} />
        );
    };

    async componentDidMount() {
        const { usersStore } = this.props;
        await usersStore.fetchUsersAsync();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    separator: {
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        marginLeft: 12,
        marginRight: 12
    },
    list: {
        backgroundColor: 'lightgray'
      }
});
