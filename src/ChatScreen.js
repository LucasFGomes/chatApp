import React from 'react';
import { StyleSheet, SafeAreaView, View, TextInput, Text, TouchableOpacity, FlatList, Dimensions, Image, Alert } from 'react-native';
import User from '../User';
import firebase from 'firebase';

export default class ChatScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            person: {
                phone: props.navigation.getParam('phone'),
                name: props.navigation.getParam('name')
            },
            textMessage: '',
            messageList: []
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('name', null)
        }
    }

    componentWillMount() {
        firebase.database().ref('messages').child(User.phone).child(this.state.person.phone)
            .on('child_added', (value) => {
                this.setState((prevState) => {
                    return {
                        messageList: [...prevState.messageList, value.val()]
                    }
                })
            })
    }

    sendMessage = async () => {
        if (this.state.textMessage.length > 0) {
            let msgId = firebase.database().ref('messages').child(User.phone).child(this.state.person.phone).push().key;
            let updates = {};
            let message = {
                message: this.state.textMessage,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: User.phone
            }
            updates['messages/' + User.phone + '/' + this.state.person.phone + '/' + msgId] = message;
            updates['messages/' + this.state.person.phone + '/' + User.phone + '/' + msgId] = message;
            firebase.database().ref().update(updates);
            this.setState({ textMessage: '' });
        } else {
            Alert.alert('Error', 'No text')
        }
    }

    handleChange = key => val => {
        this.setState({ [key]: val });
    }

    convertTime = (time) => {
        let dataMensagem = new Date(time);
        let dataAtual = new Date();
        let result = (dataMensagem.getHours() < 10 ? '0' : '') + dataMensagem.getHours() + ':';
        result += (dataMensagem.getMinutes() < 10 ? '0' : '') + dataMensagem.getMinutes();

        if (dataAtual.getDay() !== dataMensagem.getDay()) {
            result = dataMensagem.getDay() + '/' + dataMensagem.getMonth() + '   ' + result;
        }

        return result;
    }

    renderRow = ({ item }) => {
        return (
            <View style={{
                flexDirection: 'row',
                width: '65%',
                borderRadius: 5,
                marginBottom: 20,
                alignSelf: item.from === User.phone ? 'flex-end' : 'flex-start',
                backgroundColor: item.from === User.phone ? '#00897b' : '#7cb342',
            }}>
                <Text style={styles.message}> {item.message} </Text>
                <Text style={styles.time}> {this.convertTime(item.time)} </Text>
            </View>
        )
    }

    render() {
        let { height, width } = Dimensions.get('window');
        return (
            <SafeAreaView>
                <FlatList
                    style={{ padding: 10, height: height * 0.8 }}
                    data={this.state.messageList}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={styles.boxInputMessage}>
                    <TextInput
                        placeholder="Type messages..."
                        value={this.state.textMessage}
                        onChangeText={this.handleChange('textMessage')}
                        style={styles.inputMessage}
                    />
                    <TouchableOpacity onPress={this.sendMessage} style={styles.buttonSend}>
                        <Image source={require("../images/send-button.png")} style={styles.iconButtonSend} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    message: {
        color: '#fff',
        padding: 7,
        fontSize: 16
    },
    time: {
        color: '#eee',
        padding: 3,
        fontSize: 12
    },
    boxInputMessage: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputMessage: {
        padding: 10,
        marginLeft: 5,
        borderWidth: 1,
        borderColor: "#CCC",
        width: "80%",
        borderRadius: 5,
    },
    buttonSend: {
        marginLeft: 10
    },
    iconButtonSend: {
        width: 35,
        height: 35,
        marginLeft: 5
    }

})