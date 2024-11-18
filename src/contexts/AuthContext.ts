// "use client";

// import { createContext, ReactNode, useContext, useState, useEffect } from "react";
// import { destroyCookie, parseCookies, setCookie } from "nookies";
// import { api } from "@/services/ApiClient";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import { User } from "@/types/User";

// type AuthContextData = {
//   user: User | null;
//   isAuthenticated: boolean;
//   signIn: (credentials: SignInProps) => Promise<void>;
//   signOut: () => void;
//   signUp?: (credentials: SignInProps) => Promise<void>;
// };

// type SignInProps = {
//   cpf: string;
//   password: string;
// };

// type AuthProviderProps = {
//   children: ReactNode;
// };

// export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [user, setUser] = useState<User | null>(null);
//   const isAuthenticated = !!user;
//   const router = useRouter();

//   useEffect(() => {
//     const { "@unisporti.token": token } = parseCookies();

//     if (token) {
//       api.get('/me')
//         .then(response => {
//           setUser(response.data.user);
//         })
//         .catch(() => {
//           signOut();
//         });
//     }
//   }, []);

//   const signIn = async ({ cpf, password }: SignInProps) => {
//     try {
//       const response = await api.post('/api/auth/login', { cpf, password });
//       const { token, user } = response.data;

//       setCookie(undefined, "@unisporti.token", token, {
//         maxAge: 60 * 60 * 24 * 30, // 30 days
//         path: '/',
//       });

//       setUser(user);

//       api.defaults.headers['Authorization'] = `Bearer ${token}`;

//       router.push("/dashboard");
//     } catch (error) {
//       toast.error('CPF e/ou senha inválidos');
//     }
//   };

//   const signOut = () => {
//     destroyCookie(undefined, '@unisporti.token');
//     setUser(null);
//     router.push('/login');
//   };

//   // Retorna o AuthContext.Provider com os valores necessários
//   return (
//     <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Hook de autenticação para acessar o contexto
// export const useAuth = () => useContext(AuthContext);
