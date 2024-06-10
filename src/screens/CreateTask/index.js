import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, FlatList, Platform } from 'react-native';
import { getDatabase, push, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import { firebase } from '../../services/firebaseConfig';
import styles from './style';
import DateTimePicker from '@react-native-community/datetimepicker';

const db = getDatabase();
const auth = getAuth();

export default function CreateTask({ navigation }) {
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [evento, setEvento] = useState("");
    const [local, setLocal] = useState("");
    const [selectedMaterials, setSelectedMaterials] = useState([]);
    const [showMaterialPicker, setShowMaterialPicker] = useState(false);
    const [errorCreateTask, setErrorCreateTask] = useState(null);

    const materials = ["Moveis", "Arranjos", "Ornamentação", "Buffet", "Som", "Brinquedos"];

    const validate = () => {
        if (!date) {
            setErrorCreateTask("Informe a data da festa");
        } else if (evento === "") {
            setErrorCreateTask("Informe o tema festa");
        } else if (local === "") {
            setErrorCreateTask("Informe o local da festa");
        } else if (selectedMaterials.some(material => material === "")) {
            setErrorCreateTask("Selecione todos os materiais para a tarefa");
        } else {
            setErrorCreateTask(null);
            createTask();
        }
    }

    const createTask = () => {
        const taskListRef = ref(db, 'tasks/' + auth.currentUser.uid);
        const newTaskRef = push(taskListRef);
        set(newTaskRef, {
            date: date.toISOString().split('T')[0],
            evento: evento,
            local: local,
            materials: selectedMaterials
        });
        navigation.navigate('Tabs');
    }

    const addMaterial = (material) => {
        if (!selectedMaterials.includes(material)) {
            setSelectedMaterials([...selectedMaterials, material]);
        } else {
            setErrorCreateTask(`"${material}" já foi selecionado.`);
        }
    }

    const removeMaterial = (index) => {
        const updatedMaterials = [...selectedMaterials];
        updatedMaterials.splice(index, 1);
        setSelectedMaterials(updatedMaterials);
    }

    const handleDateChange = (event, selectedDate) => {
        if (selectedDate) {
            // Ajuste a data para considerar o fuso horário local
            const adjustedDate = new Date(selectedDate.getTime() + selectedDate.getTimezoneOffset() * 60000);
            setDate(adjustedDate);
        }
        setShowDatePicker(false);
    };

    return (
        <View style={styles.container}>
            {errorCreateTask && (
                <Text style={styles.alert}>{errorCreateTask}</Text>
            )}

            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
                <Text>{date.toISOString().split('T')[0]}</Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}

            <TextInput
                style={styles.input}
                placeholder='Tema da Festa'
                value={evento}
                onChangeText={setEvento}
            />
            <TextInput
                style={styles.input}
                placeholder='Local da Festa'
                value={local}
                onChangeText={setLocal}
            />

            <ScrollView>
                {selectedMaterials.map((material, index) => (
                    <View key={index} style={styles.materialTab}>
                        <Text style={styles.materialText}>{material}</Text>
                        <TouchableOpacity onPress={() => removeMaterial(index)} style={styles.removeButton}>
                            <Text style={styles.removeButtonText}>Remover</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setShowMaterialPicker(true)}
            >
                <Text style={styles.addButtonText}>Adicionar Material</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={showMaterialPicker}
                onRequestClose={() => setShowMaterialPicker(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Selecione um Material</Text>
                        <FlatList
                            data={materials}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.materialOption}
                                    onPress={() => {
                                        addMaterial(item);
                                        setShowMaterialPicker(false);
                                    }}
                                >
                                    <Text style={styles.materialOptionText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setShowMaterialPicker(false)}
                        >
                            <Text style={styles.closeButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity
                style={styles.button}
                onPress={validate}
            >
                <Text style={styles.textButton}>Agendar Festa</Text>
            </TouchableOpacity>
        </View>
    )
}
