import { Observable } from 'rxjs'
import axios from 'axios'
const API_URL = 'http://localhost:8000/'

//const API_URL = process.env.API_URL;

class UsersService {



  createUser(newUser){
    return Observable.create((observer) => {
      axios.post(API_URL + 'users/',newUser)
        .then((response) => {
          console.log(response.data);
          observer.next(response.data)
        })
        .catch((error) => {
          observer.error(error.response.data)
        })
    })
  }

  Resetpassword (data,user){
    return Observable.create((observer) => {
      axios.put(API_URL + `users/change/${user}/`,data)
        .then((response) => {
          //console.log(response.data)
          observer.next(response.data)
          //observer.complete()
        })
        .catch((error) => {
          observer.error(error.response.data)
        })
    })
  }

  WinnerUser(newUser){
    return Observable.create((observer) => {
      axios.get(API_URL + 'users/winner/')
        .then((response) => {
          console.log(response.data);
          observer.next(response.data)
        })
        .catch((error) => {
          observer.error(error.response.data)
        })
    })
  }


}

export default new UsersService()
