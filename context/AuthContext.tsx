import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react"
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User as FirebaseUser,
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { auth, db } from "../firebaseConfig"

// INTERFAZ PARA EL USUARIO
interface Usuario {
    uid: string
    email: string
    name: string
    fotoPerfil: string
    biografia: string
    telefono: string
    idioma: string
    favoritos: string[]
}

// INTERFAZ PARA EL CONTEXTO
interface AuthContextType {
    user: Usuario | null
    login: (email: string, password: string) => Promise<boolean>
    logout: () => void
    register: (
        email: string,
        password: string,
        nombre: string,
        fotoPerfil: string,
        biografia: string,
        telefono: string,
        idioma: string
    ) => Promise<boolean>
    loading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

// PROVEEDOR
interface AuthProviderProps {
    children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<Usuario | null>(null)
    const [loading, setLoading] = useState(true)

    // Verifica el estado de autenticación
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const docRef = doc(db, "users", firebaseUser.uid)
                const docSnap = await getDoc(docRef)

                if (docSnap.exists()) {
                    const data = docSnap.data()
                    setUser({
                        uid: firebaseUser.uid,
                        email: firebaseUser.email || "",
                        name: data.name,
                        fotoPerfil: data.fotoPerfil,
                        biografia: data.biografia,
                        telefono: data.telefono,
                        idioma: data.idioma,
                        favoritos: data.favoritos || [],
                    })
                }
            } else {
                setUser(null)
            }

            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    // LOGIN
    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            return true
        } catch (error) {
            console.log("Error al iniciar sesión", error)
            return false
        }
    }

    // REGISTRO
    const register = async (
        email: string,
        password: string,
        nombre: string,
        fotoPerfil: string,
        biografia: string,
        telefono: string,
        idioma: string
    ) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
            const user = userCredential.user

            await setDoc(doc(db, "users", user.uid), {
                email,
                name: nombre,
                creadoEn: new Date().toISOString(),
                fotoPerfil,
                biografia,
                telefono,
                idioma,
                favoritos: [],
            })

            console.log("Usuario registrado exitosamente")
            return true
        } catch (error) {
            console.log("Error al registrarse:", error)
            return false
        }
    }

    // LOGOUT
    const logout = async () => {
        await signOut(auth)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

// HOOK PARA USAR EL CONTEXTO
export function UseAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("UseAuth debe estar dentro de un AuthProvider")
    }
    return context
}