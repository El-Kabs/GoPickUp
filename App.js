import React, {Component} from 'react';
import * as firebase from 'firebase'; // 4.10.1
import {createStackNavigator, createAppContainer} from 'react-navigation';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  ToolbarAndroid,
  StatusBar,
  TouchableOpacity,
  Button,
  ScrollView,
  Picker,
  AsyncStorage
} from 'react-native';

const firebaseConfig = {
  apiKey: "AIzaSyB4cDAS670R6--zUJkel7v3JG-MMD-sdRE",
    authDomain: "gopickup-c2734.firebaseapp.com",
    databaseURL: "https://gopickup-c2734.firebaseio.com",
    projectId: "gopickup-c2734",
    storageBucket: "",
    messagingSenderId: "231948176997"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

var {
  height
} = Dimensions.get('window');
var {
  width
} = Dimensions.get('window');

var box_count = 3;
var box_height = height / box_count;

class LoginScreen extends Component{
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  inicio = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password).then(() => {
      Alert.alert('Login correcto.');
      this.props.navigation.navigate('Inicio');
    }).catch(function(error) {
      var errorCode = error.code;
      if (errorCode === 'auth/wrong-password') {
        Alert.alert('Usuario o contraseña incorrecta');
      } else {
        Alert.alert('Ups! Hubo un error. Intenta de nuevo');
      }
    });
  };

  componentDidMount() {}

  render() {
    return (<View style={styles.container}>
      <ToolbarAndroid style={{
          height: StatusBar.currentHeight,
          backgroundColor: '#00701a',
          elevation: 4
        }}/>
      <View style={[styles.box, styles.box2]}>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-45}>
          <Text style={styles.titles}>GoPickUp</Text>
          <View style={styles.inputs}>
            <TextInput placeholder=" Correo Electronico" style={(styles.inputs, styles.input1)} onChangeText={text => this.setState({username: text})}/>
            <TextInput placeholder=" Contraseña" style={(styles.inputs, styles.input2)} secureTextEntry={true} onChangeText={text => this.setState({password: text})}/>
            <TouchableOpacity onPress={this.inicio}>
              <Text>
                Iniciar Sesión
              </Text>
            </TouchableOpacity>
            <Text style={{
                marginTop: 10
              }}>¿Olvidaste tu contraseña?</Text>
          </View>
        </KeyboardAvoidingView>
      </View>
      <View style={[styles.box, styles.box3]}>
        <Text style={{
            paddingTop: 15
          }}>¿No tienes cuenta? Registrate</Text>
      </View>
    </View>);
  }
}
class ColaScreen extends Component {

  componentDidMount(){
    fetch("https://peaceful-savannah-29569.herokuapp.com/entrar").then(response=>response.json()).then(data=>{ this.setState({ puesto: data }) });
    
    console.log(this.state.puesto)
  }

  salir = () => {
    fetch("https://peaceful-savannah-29569.herokuapp.com/salir").then(response=>response.json()).then(data=>{ this.setState({ puesto: data }) });
    console.log(this.state.puesto)
  };

  constructor(props) {
    super(props);
    this.state = { puesto: 0 };
  }

  render(){
    return(
      <View>
        <Text>
          Tu puesto en la fila es:
        </Text>
        <Text>
          {this.state.puesto}
        </Text>
        <TouchableOpacity onPress={this.salir}>
              <Text>
                Salir
              </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class InicioScreen extends Component{
  restaurante = () => {
    this.props.navigation.navigate('Cola');
  };

  render(){
    return(
      <View>
        <Text>
          Restaurante #1
        </Text>
        <TouchableOpacity onPress={this.restaurante}>
              <Text>
                Hacer pedido
              </Text>
        </TouchableOpacity>
        <Text>
          Restaurante #2
        </Text>
        <TouchableOpacity onPress={this.inicio}>
              <Text>
                Hacer pedido
              </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const Pantallas = createStackNavigator(
  {
    Inicio:  InicioScreen,
    Login: LoginScreen,
    Cola: ColaScreen
  },
  {
    initialRouteName: 'Login',
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputs: {
    width: width,
    marginTop: box_height / 2 - 70,
    marginBottom: 30,
    alignItems: 'center'
  },
  titles: {
    fontSize: 72,
    textAlign: 'center',
    marginTop: (box_height / 2) + 35,
    marginBottom: 5
  },
});

const AppContainer = createAppContainer(Pantallas);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}