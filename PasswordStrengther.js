import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput} from 'react-native';


const displayCheckPassword = (list) => {
  let stre = list[0]
  let streCol = list[1]
  let numCol = list[2]
  let upperCol = list[3]
  let lowerCol = list[4]

  const styles = StyleSheet.create({
    strength: {
      color: streCol
    },
    num: {
      color: numCol
    },
    upper: {
      color: upperCol
    },
    lower: {
      color: lowerCol
    }
  });
 
  return (
    <View>
      <Text style={styles.strength}>
       {stre}
      </Text>
      <Text style={styles.num}>
       Password must have Numbers: [0-9]
      </Text>
      <Text style={styles.upper}>
       Password must have Upper Casing: [A-Z]
      </Text>
      <Text style={styles.lower}>
       Password must have Lower Casing: [a-z]
      </Text>
    </View>
    
  );

}
const checkPassword = (password) => {
  let passwordLength = password.length
  let list = [5]
  let numPatt = /[0-9]/g
  let upperPatt = /[A-Z]/g 
  let lowerPatt = /[a-z]/g
  
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

  if(password.match(numPatt) == null)
  {
    list[2] = "red"
  }
  else
  {
    list[2] = "blue"
  }

  if(password.match(upperPatt) == null)
  {
    list[3] = "red"
  }
  else
  {
    list[3] = "blue"
  }

  if(password.match(lowerPatt) == null)
  {
    list[4] = "red"
  }
  else
  {
    list[4] = "blue"
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
