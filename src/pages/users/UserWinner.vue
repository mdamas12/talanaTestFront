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
                    Generar Ganador
                </h5>
              </div>
              <div class="col">
                <q-btn color="red-10" label="Generar" class="q-pa-xs q-mr-md float-right"  @click="Checkwinner()"/>
              </div>
          </div>

          <div class="row">
              <div class="col2">
                <h5 class="vertical-top col2 text-indigo-10 text-weight-bolder q-pa-sm" style="margin-top:-3px">
                   El Ganado es: {{email}} 
                </h5>
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
      email : '',
 
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

    Checkwinner(){ 
      let subscription = UsersService.WinnerUser().subscribe( {
        next: (resp) => {
          this.email = resp.email
        },
        error: (resp) =>{
           this.showNotif(resp, 'red-10'); 
        }
      });
    },
   
  }
})
</script>
