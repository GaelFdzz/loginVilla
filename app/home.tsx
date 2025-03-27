import { useRouter } from "expo-router"
import { UseAuth } from "../context/AuthContext"
import { useEffect } from "react"
import { Button, Text, View, StyleSheet } from "react-native"

export default function HomeScreen() {
    const { user, logout } = UseAuth()
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.replace("/login")
        }
    }, [user])

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.welcome}>¡Bienvenido, {user?.name}!</Text>

                <View style={styles.buttonContainer}>
                    <View style={styles.buttonWrapper}>
                        <Button color={"#1e40e8ff"} title="Ir al perfil" onPress={() => router.push("/profile")} />
                    </View>

                    <View style={styles.buttonWrapper}>
                        <Button
                            title="Cerrar sesión"
                            color="#c91eb3ff"
                            onPress={() => {
                                logout()
                                router.replace("/login")
                            }}
                        />
                    </View>
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
        backgroundColor: "white",
        padding: 30,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        width: "100%",
        maxWidth: 400,
        alignItems: "center",
    },
    welcome: {
        fontSize: 22,
        fontWeight: "600",
        marginBottom: 20,
        color: "#333",
    },
    buttonContainer: {
        width: "100%",
    },
    buttonWrapper: {
        marginBottom: 15,
    }
})