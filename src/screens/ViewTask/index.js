import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { getDatabase, onValue, ref } from "firebase/database";
import { getAuth } from "firebase/auth";
import styles from './style';

const db = getDatabase();
const auth = getAuth();

export default function ViewTask({ route }) {
    const [task, setTask] = useState(null);

    useEffect(() => {
        const user = auth.currentUser;

        if (!user) {
            // Trate o caso em que o usuário não está autenticado
            return;
        }

        onValue(ref(db, 'tasks/' + user.uid + '/' + route.params.id), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setTask(data);
            }
        });
    }, []);

    return (
        <ScrollView style={styles.container}>
            {task && (
                <>
                    <Text style={styles.label}>Data:</Text>
                    <Text style={styles.info}>{task.date}</Text>

                    <Text style={styles.label}>Evento:</Text>
                    <Text style={styles.info}>{task.evento}</Text>

                    <Text style={styles.label}>Local:</Text>
                    <Text style={styles.info}>{task.local}</Text>

                    <Text style={styles.label}>Materiais:</Text>
                    <View style={styles.materialsContainer}>
                        {task.materials.map((material, index) => (
                            <Text key={index} style={styles.material}>{material}</Text>
                        ))}
                    </View>
                </>
            )}
        </ScrollView>
    );
}
