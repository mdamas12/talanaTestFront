<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered class="bg-white text-primary">
      <q-toolbar class="bg-white text-primary rounded-borders">
 
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn
            no-caps
            color="black"
            class="hover-custom q-ma-sm q-mt-md"
            flat
            @click.native="showProfile = true"
          >
            <q-item dense v-if="profile" class="text-left q-pa-none">
              <q-item-section avatar>
                <q-avatar color="grey-3">
                  <img :src="profile.foto" />
                </q-avatar>
              </q-item-section>

              <q-item-section v-if="$q.screen.gt.xs">
                <q-item-label
                  >{{ profile.first_name }}</q-item-label
                >
                <q-item-label caption lines="1" class="text-black">{{
                  profile.email
                }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer
      show-if-above
      bordered
      content-class="bg-grey-3"
      style="color:#8A8A8A">
      <q-list>
        <q-item-label header class="q-mt-lg q-mb-lg">
          <q-img src="" style="width: 180px" />
        </q-item-label>
        <q-item
          class="menu_link"
          active-class="bg-indigo-10 text-white"
          v-for="link in menu"
          :key="link.title"
          v-bind="link"
          v-ripple
          clickable
          @click="goTo(link.to)"
        >
        <!-- colocar lo siguiente en la linea 65":replace="{ name: link.to }"" -->
        <q-item-section avatar>
          <q-icon :name="link.icon" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ link.title }}</q-item-label>
        </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <transition name="slide" mode="out-in">
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">

import Vue from 'vue'

import { fasUserFriends, fasShoppingBasket, fasCertificate, fasThLarge, fasThList, fasDolly, fasHandshake, fasBullhorn, fasTags, fasCreditCard } from '@quasar/extras/fontawesome-v5'


export default Vue.extend({
  name: 'MainLayout',

  data () {
    return {
      menu: [
        { title: 'Crear Cuenta', caption: 'quasar.dev', icon: fasUserFriends, to: 'Register' },
        { title: 'Concurso', caption: 'quasar.dev', icon: fasShoppingBasket, to: 'Winner' },
    
      ],
      profile: null
    }
  },

  methods: {

      /*goTo(namePath : string){
       this.$router.push({path : `/${namePath}`})
      }*/

  }
})
</script>

<style lang="scss">
.profile-dialog .q-dialog__inner {
  padding: 0px !important;
}
</style>
