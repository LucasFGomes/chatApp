import React from 'react';
import { StyleSheet, SafeAreaView, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import firebase from 'firebase';
import User from '../User';

export default class HomeScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Contacts',
            headerRight: (
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Image source={require("../images/profile.png")} style={{
                        width: 32,
                        height: 32,
                        marginRight: 20
                    }} />
                </TouchableOpacity>
            )
        }
    }

    state = {
        users: []
    }

    componentWillMount() {
        let dbRef = firebase.database().ref('users');
        dbRef.on('child_added', (val) => {
            let person = val.val();
            person.phone = val.key;
            if (person.phone === User.phone) {
                User.name = person.name;
            } else {
                this.setState((prevState) => {
                    return {
                        users: [...prevState.users, person]
                    }
                })
            }
        })
    }

    renderRow = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Chat', item)}
                style={styles.listContacts}>

                <Text style={styles.textContact}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <SafeAreaView>
                <FlatList
                    data={this.state.users}
                    renderItem={this.renderRow}
                    keyExtractor={(item) => item.phone}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    listContacts: {
        padding: 10,
        borderColor: "#00897b",
        borderBottomWidth: 1,
    },
    textContact: {
        fontSize: 18
    }
})