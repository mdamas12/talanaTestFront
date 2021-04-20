<template>
  <q-page>
      <div class="col-md-12 col-xs-12 q-pa-sm">

        <div class="q-pa-sm">
          <div class="row">
              <div class="col" style="max-width:40px;">
                  <q-btn flat round icon="keyboard_backspace" style="color:#9E9E9E" @click="$router.back()" />
              </div>
              <div class="col2">
                <h5 class="vertical-top col2 text-indigo-10 text-weight-bolder q-pa-sm" style="margin-top:-3px">
                    Validar Cuenta
                </h5>
              </div>
              <div class="col">
                <q-btn color="red-10" label="Registrarme" class="q-pa-xs q-mr-md float-right" :loading="loading" @click="createUser()"/>
              </div>
          </div>

                                     <div class="row q-pt-md">
                                <div class="col-12 col-md q-px-md">
                                    <q-input label="Contraseña*" v-model="password" class="font-input" :type="isPwd ? 'password' : 'text'"
                                      lazy-rules
                                      :rules="[val => !!val || 'Debe ingresar una contraseña', isValidPassword]"
                                    >
                                    <template v-slot:append>
                                        <q-icon
                                            :name="isPwd ? 'visibility_off' : 'visibility'"
                                            class="cursor-pointer"
                                            @click="isPwd = !isPwd"
                                            />
                                    </template>
                                    </q-input>
                                </div>
                                <div class="col-12 col-md q-px-md">
                                    <q-input label="Confirmar contraseña" v-model="password_confirm" class="font-input" :type="isPwd ? 'password' : 'text'"
                                      lazy-rules
                                      :rules="[val => !!val || 'Debe ingresar una contraseña', isValidPassword]"
                                    >
                                    <template v-slot:append>
                                        <q-icon
                                            :name="isPwd ? 'visibility_off' : 'visibility'"
                                            class="cursor-pointer"
                                            @click="isPwd = !isPwd"
                                            />
                                    </template>
                                    </q-input>
                                </div>
                            </div>
        
           

        </div>

      </div>
  </q-page>
</template>

<script >
import Vue from 'vue'
import { Loading } from "quasar";

import UsersService from '../../services/users/user.service'
export default Vue.extend({
  data () {
    return {
      password : '',
      password_confirm : '',
      isPwd: true,
      loading: false
    }
  },
  methods: {

     showNotif (message, color) {
      this.$q.notify({
        message: message,
        color: color,
        actions: [
          { label: 'Ok', color: 'white', handler: () => { /* ... */ } }
        ]
      })
    },

    createUser(){
        console.log(this.$route.params.id)
       
       if (this.password != this.password_confirm){
            this.showNotif("la contrasenia No coincide con la contrasenia de confirmacion", 'red-10');
            return; 
        }
      
      let data ={
          'password' : this.password
      }
      let subscription = UsersService.Resetpassword(data,this.$route.params.id).subscribe( {
        next: (resp) => {
          this.showNotif(resp, 'indigo-10');
          setTimeout(() => this.backTo(), 1000);
        },
        error: (resp) =>{
           this.showNotif(resp, 'red-10'); 
        }
      });
    },

    isValidPassword (val) {
        const password_validator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        return password_validator.test(val) || 'La Contraseña debe tener al menos : 8 caracteres (1 Letra May, 1 Caracter especial) ';
    },
    backTo(){
      this.$router.push('/')

    }
   
  }
})
</script>
