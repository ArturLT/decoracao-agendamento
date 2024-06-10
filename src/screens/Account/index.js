import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { firebase } from '../../services/firebaseConfig';
import { getDatabase, onValue, ref } from "firebase/database";
import { getAuth, signOut } from "firebase/auth";
import styles from './style';

const db = getDatabase();
const auth = getAuth();

export default function Account({ navigation }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const recuperarDados = () => {
        onValue(ref(db, 'users/' + auth.currentUser.uid), (snapshot) => {
            const userData = snapshot.val();
            if (userData) {
                setUsername(userData.username);
                setEmail(userData.email);
            }
        });
    }

    useEffect(() => {
        recuperarDados();
    }, []);

    const logoff = () => {
        signOut(auth).then(() => {
            navigation.navigate('Login');
        }).catch((error) => {
            console.error("Erro ao fazer logout:", error);
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dados do Usuário</Text>
            <Text style={styles.info}>{username}</Text>
            <Text style={styles.info}>{email}</Text>

            <TouchableOpacity style={styles.button} onPress={logoff}>
                <Text style={styles.textButton}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}
