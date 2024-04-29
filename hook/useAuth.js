import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

const useAuth = ()=>{
  const {setUser} = useContext(AuthContext);
  const {setToken} = useContext(AuthContext);

  const login = async (account, password)=>{
    // console.log(account, password);
    // const newUser = {
    //   name: "Frederick Ruiz",
    //   mail: "frederick.ruiz@example.com",
    //   head: "https://randomuser.me/api/portraits/men/41.jpg"
    // }
    let token, error;
    const url = "/api/user/login";
    const formData = new FormData();
    formData.append("account", account);
    formData.append("password", password);
    token = await fetch(url, {
      method: "POST",
      body: formData
    }).then((response)=> response.json()).then(result => {
      if(result.error){
        error = result.error;
        return undefined;
      }
      if(result.status === "success"){
        return result.token;
      }else{
        return undefined;
      }
    }).catch((err)=>{
      error = err
      return undefined;
    });
    if (error) {
      console.log(error);
      alert(error.message?error.message:error);
      return false;
    }
    if(token){
      setToken(token);
    }
  }

  const logout = ()=>{
    const newUser = undefined;
    setUser(newUser);
  }

  return {
    login,
    logout
  }
}

export default useAuth;