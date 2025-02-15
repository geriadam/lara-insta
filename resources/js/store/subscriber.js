import store from './index.js'
import axios from 'axios'

export default function sunbsriber() {
  // After commit this store.subscribe will run
  store.subscribe((mutation) => {
    switch (mutation.type) {
      case 'SET_TOKEN':
        if (mutation.payload) {
          axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${mutation.payload}`

          // If there is no token in localStorage
          if (!localStorage.getItem('token')) {
            localStorage.setItem('token', mutation.payload) // Put token on localStorage
          }
        } else {
          axios.defaults.headers.common['Authorization'] = null
          localStorage.removeItem('token')
        }
        break
    }
  })
}
