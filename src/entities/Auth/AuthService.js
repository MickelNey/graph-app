import {instance} from '../../shared/api'

export class AuthService {
    static async login(data) {
        console.log(data)
        return instance.post('auth/login', data, {
            headers: { 'Content-Type': 'application/json' },
        })
    }
  
    static async registration(data){
        return instance.post('auth/registration', data, {
            headers: { 'Content-Type': 'application/json' },
        })
    }

    static async auth(){
        return instance.get('auth/auth')
    }
}


