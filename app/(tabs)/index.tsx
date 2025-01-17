import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Vibration, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function App() {

  const [darkMode, setDarkMode] = useState(false);
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');

  const buttons = ['C', 'DEL', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '=', '1/x', 'x^2', '√x'];

  function calculator() {
    if (/^[\+\-\*\/\.]+$/.test(currentNumber)) {
      Alert.alert("Error", "Invalid input: only operators are not allowed.");
      setCurrentNumber('');
      return;
    }

    try {
      let result = new Function('return ' + currentNumber)();
      setCurrentNumber(result.toString());
    } catch (error) {
      console.error("Calculation error:", error);
      Alert.alert("Error", "Invalid calculation.");
      setCurrentNumber('');
    }
  }

  function handleInput(buttonPressed: any) {
    if (['+', '-', '*', '/', '%', '1/x', 'x^2', '√x'].includes(buttonPressed)) {
      Vibration.vibrate(35);

      try {
        if (buttonPressed === '%') {
          setCurrentNumber((parseFloat(currentNumber) / 100).toString());
        } else if (buttonPressed === '1/x') {
          setCurrentNumber((1 / parseFloat(currentNumber)).toString());
        } else if (buttonPressed === 'x^2') {
          setCurrentNumber((Math.pow(parseFloat(currentNumber), 2)).toString());
        } else if (buttonPressed === '√x') {
          setCurrentNumber((Math.sqrt(parseFloat(currentNumber))).toString());
        } else {
          setCurrentNumber(currentNumber + buttonPressed);
        }
      } catch (error) {
        console.error("Input error:", error);
        Alert.alert("Error", "Invalid operation.");
        setCurrentNumber('');
      }

      return;
    } else if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'].includes(buttonPressed)) {
      Vibration.vibrate(35);
      setCurrentNumber(currentNumber + buttonPressed);
      return;
    }

    switch (buttonPressed) {
      case 'DEL':
        Vibration.vibrate(35);
        setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1));
        return;
      case 'C':
        Vibration.vibrate(35);
        setLastNumber('');
        setCurrentNumber('');
        return;
      case '=':
        Vibration.vibrate(35);
        setLastNumber(currentNumber + '=');
        calculator();
        return;
      default:
        break;
    }
  }

  const styles = StyleSheet.create({
    results: {
      backgroundColor: darkMode ? '#282f3b' : '#f5f5f5',
      maxWidth: '100%',
      minHeight: '35%',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    resultsText: {
      maxHeight: 45,
      color: '#00b9d6',
      margin: 15,
      fontSize: 35,
    },
    historyText: {
      color: darkMode ? '#B5B7BB' : '#7c7c7c',
      fontSize: 20,
      marginRight: 10,
      alignSelf: 'flex-end',
    },
    themeButton: {
      alignSelf: 'flex-start',
      bottom: '5%',
      margin: 15,
      backgroundColor: darkMode ? '#7b8084' : '#e5e5e5',
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    buttons: {
      width: '100%',
      height: '35%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: 5,
    },
    button: {
      borderColor: darkMode ? '#3f4d5b' : '#e5e5e5',
      borderWidth: 1,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '20%', 
      minHeight: '40%', 
      flex: 1,
      margin: 4,
    },
    textButton: {
      color: darkMode ? '#b5b7bb' : '#7c7c7c',
      fontSize: 24,
    }
  });

  return (
    <View>
      <View style={styles.results}>
        <TouchableOpacity style={styles.themeButton}>
          <Entypo 
            name={darkMode ? 'light-up' : 'moon'} 
            size={24} 
            color={darkMode ? 'white' : 'black'} 
            onPress={() => setDarkMode(!darkMode)}
          />
        </TouchableOpacity>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultsText}>{currentNumber}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((button) =>
          ['=', '/', '*', '-', '+', '%', '1/x', 'x^2', '√x'].includes(button) ?
            <TouchableOpacity 
              key={button}
              style={[styles.button, { backgroundColor: '#00b9d6' }]}
              onPress={() => handleInput(button)}
            >
              <Text style={[styles.textButton, { color: 'white' }]}>{button}</Text>
            </TouchableOpacity>
          :
          button === 'C' ?
            <TouchableOpacity 
              key={button}
              style={[styles.button, { backgroundColor: darkMode ? '#303946' : '#fff', minWidth: '36%' }]}
              onPress={() => handleInput(button)}
            >
              <Text style={styles.textButton}>{button}</Text>
            </TouchableOpacity>
          :
            <TouchableOpacity 
              key={button}
              style={[styles.button, { backgroundColor: darkMode ? '#303946' : '#fff' }]}
              onPress={() => handleInput(button)}
            >
              <Text style={styles.textButton}>{button}</Text>
            </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
