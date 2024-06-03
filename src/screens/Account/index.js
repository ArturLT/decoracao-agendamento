import { firebase } from '../../services/firebaseConfig'
import { getAuth, signOut } from "firebase/auth";
import { View, Text, Touchable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styles from './style';
import { getDatabase, onValue, ref } from 'firebase/database';
const db = getDatabase();

export default function Account({ navigation }) {
  const [nome,setNome] = useState("");
  const [email, setEmail] = useState("");
  const auth = getAuth();
  function logoff() {
    signOut(auth).then(() => {
      navigation.navigate('Login')
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  function recuperarDados() {
    const userId = auth.currentUser.uid;
    const refUser = ref(db, 'users/'+ userId);
    onValue(refUser, (snapshot) => {
      setNome(snapshot.val().username)
      setEmail(snapshot.val().email)
    });
  }

  useEffect(()=>{
    recuperarDados();
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.tittle}>Dados do usuário</Text>
      <Text style={styles.info}>{nome}</Text>
      <Text style={styles.info}>{email}</Text>



      <TouchableOpacity
        style={styles.button}
        onPress={logoff}>
        <Text style={styles.textButton}>Sair</Text>
      </TouchableOpacity>
    </View>
  )
}