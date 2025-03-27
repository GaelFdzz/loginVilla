import { useRouter } from "expo-router"
import { UseAuth } from "../context/AuthContext"
import { useEffect } from "react"
import { Button, Text, View, Image, StyleSheet } from "react-native"

export default function ProfileScreen() {
    const { user } = UseAuth()
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.replace("/login")
        }
    }, [user])

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image
                    source={{ uri: user?.fotoPerfil }}
                    style={styles.profileImage}
                />
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

                <View style={styles.buttonContainer}>
                    <Button color={"#1e40e8ff"} title="Ir a inicio" onPress={() => router.push("/home")} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        marginBottom: 20,
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
})
