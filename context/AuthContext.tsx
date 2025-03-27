// AuthContext.tsx
import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

// INTERFAZ PARA EL USUARIO
interface Usuario {
    uid: string;
    email: string;
    name: string;
    fotoPerfil: string;
    biografia: string;
    telefono: string;
    idioma: string;
    favoritos: string[];
    creadoEn: string;
}

// INTERFAZ PARA EL CONTEXTO
interface AuthContextType {
    user: Usuario | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    register: (
        email: string,
        password: string,
        nombre: string,
        fotoPerfil: string,
        biografia: string,
        telefono: string,
        idioma: string
    ) => Promise<boolean>;
    updateUser: (updatedData: Partial<Usuario>) => Promise<boolean>;
    toggleFavorito: (productoId: string) => Promise<void>;
    esFavorito: (productoId: string) => boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<Usuario | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const docRef = doc(db, "users", firebaseUser.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setUser({
                        uid: firebaseUser.uid,
                        email: firebaseUser.email || "",
                        name: data.name,
                        fotoPerfil: data.fotoPerfil,
                        biografia: data.biografia,
                        telefono: data.telefono,
                        idioma: data.idioma,
                        creadoEn: data.creadoEn,
                        favoritos: data.favoritos || [],
                    });
                }
            } else {
                setUser(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const updateUser = async (updatedData: Partial<Usuario>) => {
        if (!user) return false;

        try {
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, updatedData);
            setUser((prevUser) => (prevUser ? { ...prevUser, ...updatedData } : null));
            return true;
        } catch (error) {
            console.log("Error al actualizar el perfil:", error);
            return false;
        }
    };

    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return true;
        } catch (error) {
            console.log("Error al iniciar sesión", error);
            return false;
        }
    };

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
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                email,
                name: nombre,
                creadoEn: new Date().toISOString(),
                fotoPerfil,
                biografia,
                telefono,
                idioma,
                favoritos: [],
            });

            console.log("Usuario registrado exitosamente");
            return true;
        } catch (error) {
            console.log("Error al registrarse:", error);
            return false;
        }
    };

    const logout = async () => {
        await signOut(auth);
        setUser(null);
    };

    const toggleFavorito = async (productoId: string) => {
        if (!user) return;

        const esFavorito = user.favoritos.includes(productoId);
        const nuevosFavoritos = esFavorito
            ? user.favoritos.filter((id) => id !== productoId)
            : [...user.favoritos, productoId];

        try {
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, { favoritos: nuevosFavoritos });
            setUser((prev) => prev ? { ...prev, favoritos: nuevosFavoritos } : prev);
        } catch (error) {
            console.log("Error al actualizar favoritos:", error);
        }
    };

    const esFavorito = (productoId: string): boolean => {
        return !!user?.favoritos.includes(productoId);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, updateUser, toggleFavorito, esFavorito, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function UseAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("UseAuth debe estar dentro de un AuthProvider");
    }
    return context;
}