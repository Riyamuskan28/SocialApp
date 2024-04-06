import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Image,
} from "react-native";
import As5 from "./src/signin";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import As56 from "./src/post";
import Checkbox from "expo-checkbox";
import axios from "axios";
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Social"
          component={Home}
          options={{
            headerStyle: {
              backgroundColor: "#AC94F4",
            },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerStyle: {
              backgroundColor: "#AC94F4",
            },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerStyle: {
              backgroundColor: "#AC94F4",
            },
            headerTintColor: "white",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const Home = (props) => {
  const [islogin, setIslogin] = useState(false);
  const getdata = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        setIslogin(true);
        console.log(value);
      }
    } catch (e) {}
  };
  return (
    <View style={styles.home}>
      {islogin == true ? (
        <As56 />
      ) : (
        <View style={styles.home}>
<Image style={{height:200,width:375,}} source={require("./assets/girl.png")}/>
          <View style={{backgroundColor:"#AC94F4",flex:1,borderTopLeftRadius:400}}>
            <View style={{marginTop:80,paddingRight:40}}>
            <TouchableOpacity style={styles.button}>
              <Text
                style={{color:"#AC94F4",fontSize:25}}
                onPress={() => props.navigation.navigate("Signup")}
              >
                SIGNUP
              </Text>
            </TouchableOpacity>
              </View>
            <TouchableOpacity style={styles.button2}>
              <Text
                style={styles.buttonText2}
                onPress={() => {
                  props.navigation.navigate("Login");
                  getdata();
                }}
              >
                LOGIN
              </Text>
            </TouchableOpacity>
          </View>
      z
        </View>
      )}
    </View>
  );
};
const Signup = () => {
  return <As5 />;
};
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handlelogin = async () => {
    if (!email) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    setPasswordError(false);
    if (!password) {
      setPasswordError(true);
    } else {
    }
    if (!password || !email) {
      return false;
    }
      const body = {
      "email": email,
      "password": password,
      }
      axios.post('https://bloggler-backend.vercel.app/api/user/login', body)
      .then(res => {
      console.log(res.data);
      }).catch((err) => {
      console.log(err?.response?.data?.message);
      })
  };
  return (
    <View style={styles.container1}>
      <Image style={{height:200,width:380}} source={require("./assets/girl.png")}/>
      <View style={{flex:1,backgroundColor:"#AC94F4",borderTopLeftRadius:400}}>
        <View style={{margin:60}}>

        <Text style={styles.text1}>Enter your Email</Text>
        <TextInput
          style={styles.inputStyle1}
          autoCaptialize="none"
          autoCorrect={false}
          placeholder="test2@gmail.com"
          value={email}
          onChangeText={(data) => setEmail(data)}
        />
        {emailError ? (
          <Text style={styles.error1}>Please enter valid email</Text>
        ) : null}

        <Text style={styles.text1}>Enter your Password</Text>
        <TextInput
          style={styles.inputStyle1}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="123xyz@*"
          secureTextEntry={true}
          value={password}
          onChangeText={(data) => setPassword(data)}
        />
        {passwordError ? (
          <Text style={styles.error1}>Please enter valid password</Text>
          ) : null}
      <View style={styles.checkbox1}>
        <Checkbox
          value={agree}
          onValueChange={() => setAgree(!agree)}
          color={agree ? "orange" : undefined}
          />
        <Text>I have fill the above details</Text>
          </View>
      <TouchableOpacity
        style={[
          styles.buttonstyle1,
          { backgroundColor: agree ? "orange" : "grey" },
        ]}
        disabled={!agree}
        >
        <Text style={styles.buttonText1} onPress={handlelogin}>
          LOGIN
        </Text>
      </TouchableOpacity>
      <Text style={{marginLeft:130,marginTop:4}}>forgot password?</Text>
      <View style={{flexDirection:'row',marginTop:80,marginLeft:6}}>
      <Text style={{fontSize:17}}>Don't have an account?</Text>
      <Text style={{color:'white',fontSize:17}} onPress={()=><As5/>}>Signup</Text>
      </View>
        </View>
          </View>
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
  },
  button: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 30,
    marginTop: 90,
    justifyContent: "center",
    height: 60,
    width: 290,
    marginTop: 20,
    marginLeft: 28,
    shadowColor: "black",
    elevation: 30,
    borderColor: "black",
    borderWidth: 2,
  },
  button2:{
    alignItems: "center",
    backgroundColor: "#AC94F4",
    borderRadius: 30,
    marginTop: 90,
    justifyContent: "center",
    height: 60,
    width: 290,
    marginTop: 18,
    marginLeft: 60,
    shadowColor: "black",
    elevation: 30,
    borderColor: "black",
    borderWidth: 2,
  },
  buttonText2: {
    color: "white",
    fontSize: 25,
  },

  container1: {
    flex: 1,
  },
  heading1: {
    fontSize: 35,
    fontWeight: "500",
    color: "black",
    paddingTop: 50,
    paddingLeft: 35,
    paddingBottom: 50,
  },
  text1: {
    fontSize: 18,
    color: "black",
    marginRight: 70,
  },
  inputStyle1: {
    borderWidth: 1,
    borderColor: "black",
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 5,
    fontSize: 18,
    backgroundColor: "#EBE3D5",
    marginTop: 5,
  },
  buttonstyle1: {
    backgroundColor: "grey",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    shadowColor: "black",
    elevation: 10,
    shadowOpacity: 3,
    height:50,
    borderColor:"black",
    borderWidth:1,
  },
  buttonText1: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  checkbox1: {
    flexDirection: "row",
  },
  error1: {
    color: "red",
  },
  postheader: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default App;
