import { useRouter } from "expo-router";
import { UseAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import {
    Button, Text, View, Image,
    StyleSheet, ActivityIndicator, ScrollView, TextInput, TouchableOpacity
} from "react-native";

export default function ProfileScreen() {
    const { user, loading, toggleFavorito } = UseAuth(); // Asegúrate de que toggleFavorito está en el contexto
    const router = useRouter();
    const [nuevoFavorito, setNuevoFavorito] = useState(""); // Estado para el nuevo favorito
    const [showInput, setShowInput] = useState(false); // Estado para mostrar el formulario

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/login");
        }
    }, [user, loading]);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#1e40e8ff" />
            </View>
        );
    }

    const handleToggleFavorito = (productoId: string) => {
        toggleFavorito(productoId);
    };

    const handleAgregarFavorito = () => {
        if (nuevoFavorito.trim() !== "") {
            toggleFavorito(nuevoFavorito); // Agregar el nuevo favorito
            setNuevoFavorito(""); // Limpiar el campo de texto después de agregarlo
            setShowInput(false); // Ocultar el formulario después de agregar el producto
        } else {
            alert("Por favor ingresa el nombre del producto favorito.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <Image source={{ uri: user?.fotoPerfil }} style={styles.profileImage} />
                <Text style={styles.title}>{user?.name}</Text>
                <Text style={styles.subText}>{user?.email}</Text>

                <View style={styles.infoSection}>
                    <Text style={styles.label}>📱 Teléfono:</Text>
                    <Text style={styles.value}>{user?.telefono}</Text>

                    <Text style={styles.label}>🌍 Idioma:</Text>
                    <Text style={styles.value}>{user?.idioma}</Text>

                    <Text style={styles.label}>📝 Biografía:</Text>
                    <Text style={styles.value}>{user?.biografia}</Text>
                </View>

                {/* Lista de Favoritos */}
                <View style={styles.favoritosSection}>
                    <Text style={styles.label}>
                        ⭐ Productos Favoritos:
                        <TouchableOpacity onPress={() => setShowInput(!showInput)}>
                            <Text style={styles.addButtonText}>+</Text>
                        </TouchableOpacity>
                    </Text>
                    {user?.favoritos?.length ? (
                        user?.favoritos.map((productoId: string) => (
                            <View key={productoId} style={styles.favoritoItem}>
                                <Text style={styles.favoritoNombre}>❤ {productoId}</Text>
                                <TouchableOpacity onPress={() => handleToggleFavorito(productoId)}>
                                    <Text style={{ color: "gray", marginLeft: 10 }}>Eliminar</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.value}>No tienes productos favoritos aún.</Text>
                    )}

                    {/* Mostrar el formulario si showInput es true */}
                    {showInput && (
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Ingresa el nombre del nuevo producto"
                                value={nuevoFavorito}
                                onChangeText={setNuevoFavorito}
                            />
                            <TouchableOpacity onPress={handleAgregarFavorito} style={styles.addFavoritoButton}>
                                <Text style={styles.addFavoritoButtonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                <View style={styles.buttonContainer}>
                    <Button color={"#1e40e8ff"} title="Ir a inicio" onPress={() => router.push("/home")} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button color={"#999696ff"} title="Editar perfil" onPress={() => router.push("/editarPerfil")} />
                </View>

                <Text style={{ color: "gray", marginTop: 20 }}>
                    Registrado el {user?.creadoEn ? new Date(user.creadoEn).toLocaleDateString() : "Fecha no disponible"}
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#151517ff",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    card: {
        backgroundColor: "#fff",
        padding: 30,
        borderRadius: 12,
        alignItems: "center",
        width: "100%",
        maxWidth: 400,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 15,
        backgroundColor: "#ccc",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#333",
    },
    subText: {
        fontSize: 16,
        color: "#666",
        marginBottom: 15,
    },
    infoSection: {
        width: "100%",
    },
    label: {
        fontWeight: "bold",
        marginTop: 10,
        color: "#555",
        flexDirection: "row",
        alignItems: "center",
    },
    value: {
        fontSize: 16,
        color: "#333",
    },
    buttonContainer: {
        marginTop: 10,
        width: "100%",
    },
    favoritosSection: {
        width: "100%",
        alignItems: "flex-start",
    },
    favoritoItem: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
    },
    favoritoNombre: {
        fontSize: 16,
        color: "red",
    },
    addButtonText: {
        color: "green",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        margin: 10,
        padding: 5
    },
    inputContainer: {
        marginTop: 15,
        width: "100%",
        alignItems: "center",
        flexDirection: "row", // Alineación en fila
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        width: "80%",
    },
    addFavoritoButton: {
        backgroundColor: "transparent", // Sin fondo
        color: "green", // Color verde
        marginLeft: 10, // Espacio entre el campo de texto y el botón
        padding: 5,
    },
    addFavoritoButtonText: {
        color: "green", // Color verde
        fontSize: 20,
        fontWeight: "bold",
    },
});