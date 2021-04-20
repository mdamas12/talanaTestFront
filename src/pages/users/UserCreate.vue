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
                    Crear una cuenta
                </h5>
              </div>
              <div class="col">
                <q-btn color="red-10" label="Registrarme" class="q-pa-xs q-mr-md float-right"  @click="createUser()"/>
              </div>
          </div>

            <div class="row q-ma-md">
              <div class="col">
                <q-input  
                  outlined
                  v-model="user.first_name"
                  label="Nombre"
                  lazy-rules
                  :rules="[val => !!val || 'Debe ingresar el nombre']"
                />
              </div>
              <div class="col q-ml-md">
                <q-input  
                  outlined
                  v-model="user.last_name"
                  label="Apellido"
                  lazy-rules
                  :rules="[val => !!val || 'Debe ingresar el apellido']"
                />
              </div>
            </div>
             <div class="row q-ma-md">
            <div class="col q-ml-md">
                    <q-input  
                  outlined
                  ref="email"
                  type="email"
                  v-model="user.email"
                  label="Correo"
                  lazy-rules
                  :rules="[val => !!val || 'Debe ingresar el correo', isValidEmail]"
                />
                
            </div>
            
            <div class="col q-ml-md">
                <q-input  
                  outlined
                  v-model="user.username"
                  label="username"
                  lazy-rules
                  :rules="[val => !!val || 'Debe ingresar username']"
                />
              </div>
        
            </div>

        </div>

      </div>
  </q-page>
</template>

<script >
import Vue from 'vue'
import UsersService from '../../services/users/user.service'
import { Loading } from "quasar";
export default Vue.extend({
  data () {
    return {
      user : {
        // last_login: "string",
        is_superuser: false,
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      },
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
     this.loading = true;
   
      let subscription = UsersService.createUser(this.user).subscribe( {
        next: (resp) => {
          this.showNotif(resp, 'indigo-10');
          setTimeout(() => this.backTo(), 1000);
          this.loading = false;
        },
        error: (resp) =>{
           this.showNotif(resp, 'red-10'); 
           this.loading = false;
        }
      });
    },

    isValidEmail (val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || 'Correo inválido';
    },

    backTo(){
      this.$router.push('/')

    }
   
  }
})
</script>
