import { useRouter } from "expo-router";
import { UseAuth } from "../context/AuthContext";
import { useEffect } from "react";
import {
    Button, Text, View, Image,
    StyleSheet, ActivityIndicator, ScrollView
} from "react-native";

export default function ProfileScreen() {
    const { user, loading } = UseAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/login")
        }
    }, [user, loading])

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#1e40e8ff" />
            </View>
        )
    }

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
                    <Text style={styles.label}>⭐ Productos Favoritos:</Text>
                    {user?.favoritos?.length ? (
                        user?.favoritos.map((producto: any) => (
                            <View key={producto.id} style={styles.favoritoItem}>
                                <Text style={styles.favoritoNombre}>❤ {producto}</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.value}>No tienes productos favoritos aún.</Text>
                    )}
                </View>

                <View style={styles.buttonContainer}>
                    <Button color={"#1e40e8ff"} title="Ir a inicio" onPress={() => router.push("/home")} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button color={"#999696ff"} title="Editar perfil" onPress={() => router.push("/editarPerfil")} />
                </View>

                <Text style={{ color: "gray", marginTop: 20 }}>Registrado el {user?.creadoEn ? new Date(user.creadoEn).toLocaleDateString() : "Fecha no disponible"}</Text>

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
    favoritoImage: {
        width: 40,
        height: 40,
        borderRadius: 5,
        marginRight: 10,
        backgroundColor: "#ccc",
    },
    favoritoNombre: {
        fontSize: 16,
        color: "gray",
    },
});
