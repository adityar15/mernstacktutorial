import Cookies from 'universal-cookie'
export const useAuth = ()=>{
    const cookie = new Cookies();
    console.log(cookie.get('access_token'))
    return cookie.get('access_token') ? true : false
}
