import React from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import User from '../User';
import firebase from 'firebase';

import styles from '../constants/styles';

export default class ProfileScreen extends React.Component {

    static navigationOptions = {
        title: 'Profile'
    }

    state = {
        name: User.name
    }

    _logOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    handleChange = key => val => {
        this.setState({ [key]: val });
    }

    changeName = async () => {
        if (this.state.name.length < 2) {
            Alert.alert('Error', 'Please enter valid name.');
        } else if (User.name !== this.state.name) {
            firebase.database().ref('users').child(User.phone).set({ name: this.state.name });
            User.name = this.state.name;
            Alert.alert('Success', 'Name changed successful.');
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{fontSize: 20}}>{User.phone}</Text>

                <TextInput
                    value={this.state.name}
                    onChangeText={this.handleChange('name')}
                    style={styles.input} 
                />

                <TouchableOpacity onPress={this.changeName}>
                    <Text style={styles.btnText}>Change Name</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this._logOut}>
                    <Text style={styles.btnText}>Logout</Text>
                </TouchableOpacity>

            </SafeAreaView>
        )
    }
}