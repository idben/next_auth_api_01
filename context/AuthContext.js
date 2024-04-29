import React, {createContext, useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import checkToken2 from '@/middleware/checkToken2';

export const AuthContext = createContext(null);

export const AuthProvider =({children})=>{

  const [user, setUser] = useState(undefined);
  const [token, setToken] = useState(undefined);
  const router = useRouter();

  const loginRoute = "/user/login";
  const protectedRoutes = ["/"]

  useEffect(() => {
    (async () => {
      let result = await checkToken2(token);
      if(result.id){
        setUser(result);
      }
    })();
  }, [token]);

  useEffect(()=>{
    if(!user){
      if(protectedRoutes.includes(router.pathname)) {
        router.push(loginRoute)
      }
    }else{
      router.push("/")
    }
  }, [router.isReady, router.pathname, user]);

  return(
    <AuthContext.Provider value={{user, setUser, token, setToken}}>
      {children}
    </AuthContext.Provider>
  )
}