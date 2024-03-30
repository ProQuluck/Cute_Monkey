import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import db from './db_1.json';
import PhonicButton from './componets/phonicButton';
//import db from './localdb'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      displayText: '',
      text: '',
      chunks: [],
      phonic: []
    }
  }
  render() {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <Header
            backgroundColor={'#336310'}
            centerComponet={{
              text: 'Macaquinho fofo',
              style: { color: '#fff', fontSize: 20 }
            }} />
          <Image
            style={styles.imageIcon}
            source={require("./assets/Monkey.png")}
          />
          <TextInput
            style={styles.inputBox}
            onChangeText={text => { this.setState({ text: text }) }}
            value={this.state.text}
          />
          <TouchableOpacity
            style={styles.goButton}
            onPress={() => {
              let word = this.state.text.toLowerCase().trim()
              db[word]?
               this.setState({ 
                chunks: db[word].chunks,
                phonic: db[word].phones
              }):
            Alert.alert("This word is not available")}}
          >
            <Text
              style={styles.buttonText}>
              GO
            </Text>
          </TouchableOpacity>
          <View>
            {this.state.chunks.map((item,index) => {
              return (
                <PhonicButton
                    wordChunks={this.state.chunks[index]}
                    soundChunk={this.state.phonic[index]}
                />
              )
            })}
          </View>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
  inputBox: {
    marginTop: 200,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
  },
  goButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  displayText: {
    textAlign: 'center',
    fontSize: 30,
  },
  imageIcon: {
    width: 150,
    height: 150,
    alignSelf: "center"
  },
  chunkButton: {
    width: '60%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    margin: 5,
    backgroundColor: 'red',
  },
});