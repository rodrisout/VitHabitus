
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ConfirmModalProps {
  visible: boolean;
  tipo: 'guardar' | 'recomendar' | 'modificarResultados'| 'en ejecucion' | null;
  onCancelar: () => void;
  onConfirmar: () => void;
}

export default function ConfirmModal({ visible, tipo, onCancelar, onConfirmar }: ConfirmModalProps) {
    if (!tipo) return null;

    let mensaje = '';
    let titulo = '';

    if (tipo === 'guardar') {
        titulo = 'Recomendador en ejecución';
        mensaje = 'Estás ejecutando el recomendador. ¿Deseas modificar los hábitos? Puede influir en los resultados.';
    } else if (tipo === 'recomendar') {
        titulo = 'Peligro sobreescritura';
        mensaje = '¿Deseas ejecutar el recomendador de nuevo? Se perderán las recomendaciones actuales.';
    } else if (tipo === 'modificarResultados') {
        titulo = 'Modificando recomendaciones';
        mensaje = 'Estás a punto de modificar hábitos sobre unas recomendaciones previas. Esto puede alterar el resultado y las nuevas recomendaciones. ¿Deseas continuar?';
    } else if (tipo === 'en ejecucion') {
        titulo = 'Recomendador en ejecución';
        mensaje = 'Espera a que termine el recomendador para volver a ejecutarlo';
    }

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancelar}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalBox}>
                <Text style={styles.modalTitle}>{titulo}</Text>
                <Text style={styles.modalMessage}>{mensaje}</Text>

                <View style={styles.modalButtonRow}>
                    <TouchableOpacity style={styles.modalBtnCancelar} onPress={onCancelar}>
                    <Text style={styles.modalBtnCancelarText}>Cancelar</Text>
                    </TouchableOpacity>
                    {tipo !== 'en ejecucion' && (
                    <TouchableOpacity style={styles.modalBtnConfirmar} onPress={onConfirmar}>
                    <Text style={styles.modalBtnConfirmarText}>Continuar</Text>
                    </TouchableOpacity>
                    )}
                </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    maxWidth: 360,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#222',
  },
  modalMessage: {
    fontSize: 15,
    color: '#444',
    marginBottom: 20,
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  modalBtnCancelar: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#ddd',
    borderRadius: 6,
  },
  modalBtnCancelarText: {
    color: '#333',
    fontWeight: '600',
  },
  modalBtnConfirmar: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#e74d4d',
    borderRadius: 6,
  },
  modalBtnConfirmarText: {
    color: 'white',
    fontWeight: 'bold',
  },
});