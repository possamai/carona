<template>
  <v-layout>
    <v-flex xs8 offset-xs2>

        <v-card class="elevation-12">
          <v-card-text>
            <v-form @submit.prevent="submit">
              <h2 class="headline mb-0 text-md-center">Cadastrar Viagem</h2>
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
              <v-text-field label="Horário Partida" v-model="model.horasaida" required ></v-text-field>
              <v-text-field label="Horário Chegada" v-model="model.horachegada" required ></v-text-field>
              <v-text-field label="Qt. Vagas" v-model="model.qtpessoas" required ></v-text-field>
              <v-text-field label="Valor (Por Pessoa)" v-model="model.valor" required ></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions></v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="text-transform-none" @click="submit">Salvar</v-btn>
          </v-card-actions>
        </v-card>

    </v-flex>
  </v-layout>
</template>

<script>
import firebase from '@/services/firebase';
import store from '@/store'

let perfisRef = firebase.getDb().ref('viagem');


export default {
  name: 'Perfil',
  data () {
    return {
      model: {
        origem : '',
        destino : '',
        dtviagem: new Date().toISOString().substr(0, 10),
        horasaida : '',
        horachegada : '',
        qtpessoas : '',
        valor : '',
        genero : ''
      },
    }
  },
  methods: {
    async submit () {
      this.model.idUser = store.getters.user.uid;
      perfisRef.push( this.model );
    },
    clear () {
      // this.password = ''
      // this.$router.push('/signup')
    },
  },
}
</script>
