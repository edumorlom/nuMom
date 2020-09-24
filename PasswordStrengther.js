import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput} from 'react-native';

const displayCheckPassword = (list) => {
  let stre = list[0]
  let col = list[1]
  
  const styles = StyleSheet.create({
    strength: {
      color: col
    }
  });
 
  return (
    <Text style={styles.strength}>
       {stre}
    </Text>
  );

}
const checkPassword = (password) => {
  let passwordLength = password.length
  let list = [2]
  if(passwordLength >= 1 && passwordLength <= 4)
  {
    list = ["Too easy", 'red']
  }
  else if(passwordLength >= 5 && passwordLength <= 9)
  {
    list = ["Good", 'orange']
  }
  else if(passwordLength >= 10 && passwordLength <= 14)
  {
    list = ["Very Good", 'green']
  }
  else if(passwordLength >= 15)
  {
    list = ["Excellent", 'blue']
  }
  else
  {
    list = ["Please type a password", 'black']
  }
  return displayCheckPassword(list)
}

const App = () => {
  const [password, setPassword] = useState('')
  const name = "leo"
  return (
    <View>
      <Text>Hi {name}, please enter a password!</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1
        }}
        placeholder="Enter your password here"
        onChangeText={password => setPassword(password)}
        defaultValue={password}
      />
      {checkPassword(password)}
    </View>
  );
}

export default App;
