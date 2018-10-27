<template>
  <v-layout>
    <v-flex xs8 offset-xs2>

        <v-card class="elevation-12">
          <v-card-text>
            <v-form @submit.prevent="submit">
              <h2 class="headline mb-0 text-md-center">Pesquisar Viagem</h2>
              <v-text-field label="Origem" v-model="model.origem" required ></v-text-field>
              <v-text-field label="Destino" v-model="model.destino" required ></v-text-field>
              <v-menu ref="menu" :close-on-content-click="false" v-model="menu"
                :nudge-right="40" :return-value.sync="date" lazy transition="scale-transition"
                offset-y full-width min-width="290px">
                <v-text-field slot="activator" v-model="dtviagem" label="Data da Viagem" prepend-icon="event" readonly ></v-text-field>
                <v-date-picker v-model="dtviagem" locale="pt-br" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                </v-date-picker>
              </v-menu>
              <v-checkbox label="Necessita acessibilidade" v-model="checkbox"></v-checkbox>
            </v-form>
          </v-card-text>

          <v-card-actions></v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="text-transform-none" @click="submit">Pesquisar</v-btn>
          </v-card-actions>
        </v-card>

    </v-flex>
  </v-layout>
</template>

<script>
import firebase from '@/services/firebase';
import store from '@/store'

let perfisRef = firebase.getDb().ref('perfis');


export default {
  name: 'Perfil',
  data () {
    return {
      model: {
        nome : '',
        genero : ''
      },
      generos: [
        {
          cod : 'M',
          desc : 'Masculino'
        },
        {
          cod : 'F',
          desc : 'Feminino'
        },
        {
          cod : 'O',
          desc : 'Outro'
        },
      ],
      date: new Date().toISOString().substr(0, 10),
    }
  },
  methods: {
    async submit () {
      this.model.idUser = store.getters.user.uid;
    },
    clear () {
      // this.password = ''
      // this.$router.push('/signup')
    },
  },
}
</script>
