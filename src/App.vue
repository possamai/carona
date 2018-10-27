<template>
  <v-app id="inspire">
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      v-if="isLoggin"
      fixed
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-layout
            v-if="item.heading"
            :key="item.heading"
            row
            align-center
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              :to="{name:child.link}"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text" 
              :to="{name:item.link}">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="blue darken-3"
      dark
      app
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer" v-if="isLoggin"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down" @click.stop="home()" style="cursor: pointer;">Caronas Já</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn> -->
      <v-menu offset-y>
        <v-btn slot="activator" icon dark>
          <img
            src="./assets/logo.png"
            alt="Vuetify"
            height="20px"
            width="20px">
        </v-btn>
        <v-list>
          <v-list-tile v-for="menu in menus" :key="menu.title" :to="menu.to" >
            <v-list-tile-title>{{ menu.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <v-layout row v-if="error">
        <v-flex xs12 sm6 offset-sm3>
          <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
        </v-flex>
      </v-layout>
      <router-view></router-view>
    </v-content>
    <v-footer class="blue darken-2">
      <v-layout row wrap align-center>
        <v-flex xs12>
          <div class="white--text ml-3">
            Made with
            <v-icon class="red--text">favorite</v-icon>
            by <a class="white--text" href="https://vuetifyjs.com" target="_blank">Vuetify</a>
            and <a class="white--text" href="https://github.com/vwxyzjn">Costa Huang</a>
          </div>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import AppAlert from './components/shared/AppAlert'

export default {
  components: {
    AppAlert
  },
  data () {
    return {
      drawer: null,
      title: 'Vuetify.js',
      
    }
  },
  methods: {
    onDismissed () {
      this.$store.dispatch('clearError')
    },
    home () {
      this.$router.push('/')
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    },
    isLoggin () {
      return this.$store.getters.user?true:false;
    },
    items () {
      let items = [
        // {
        //   icon: 'keyboard_arrow_up',
        //   'icon-alt': 'keyboard_arrow_down',
        //   text: 'Perfil',
        //   model: true,
        //   children: [
        //     { icon: 'contacts', text: 'Perfil', link: 'Perfil' },
            
        //   ]
        // },
        { icon: 'contacts', text: 'Perfil', link: 'Perfil' },
        { icon: 'drive_eta', text: 'Veículo', link: 'Veiculo' },
        { icon: 'my_location', text: 'Pesquisar', link: 'Pesquisar' },
        { icon: 'transfer_within_a_station', text: 'Cadastrar Viagem', link: 'Cadastrar' },
      ]
      return items;
    },
    menus () {
      let menus = [
        {
          icon: 'home',
          title: 'Registrar',
          to: '/signup'
        },
        {
          icon: 'label',
          title: 'Entrar',
          to: '/signin'
        }]
      if (this.$store.getters.user) {
        menus = [
          
          {
            icon: 'label',
            title: 'Logout',
            to: '/logout'
          }
        ]
      }
      return menus
    }
  }
}
</script>
