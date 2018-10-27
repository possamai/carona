<template>
  <v-layout>
    <v-flex xs8 offset-xs2>

        <v-card class="elevation-12">
          <v-card-text>
            <v-form @submit.prevent="submit">
              <h2 class="headline mb-0 text-md-center">Perfil</h2>
              <v-text-field label="Nome" v-model="model.nome" required ></v-text-field>
              <v-text-field label="Cpf" v-model="model.cpf" required ></v-text-field>
              <!-- <v-text-field label="Nascimento" v-model="model.nascimento" required ></v-text-field> -->

              <v-menu ref="menu" :close-on-content-click="false" v-model="menu"
                :nudge-right="40" :return-value.sync="date" lazy transition="scale-transition"
                offset-y full-width min-width="290px">
                <v-text-field slot="activator" v-model="model.nascimento" label="Data do Nascimento" prepend-icon="event" readonly ></v-text-field>
                <v-date-picker v-model="model.nascimento" locale="pt-br" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                </v-date-picker>
              </v-menu>
              <v-text-field label="Telefone" v-model="model.telefone" required ></v-text-field>
              <v-text-field label="Telefone Emergência" v-model="model.telemergencia" required ></v-text-field>
              <v-select :items="generos" v-model="model.genero" label="Gênero" item-text="desc" item-value="cod"></v-select>

              <img :src="imageUrl" height="150" v-if="imageUrl"/>
              <v-text-field label="Selecione uma foto" v-model="imageName" prepend-icon="attach_file"></v-text-field>

              <v-checkbox label="Necessita acessibilidade" v-model="model.acessibilidade"></v-checkbox>
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

let perfisRef = firebase.getDb().ref('perfis');


export default {
  name: 'Perfil',
  data () {
    return {
      model: {
        nome : '',
        cpf: '',
        genero : '',
        nascimento: '',
        telefone: '',
        telemergencia : '',
        acessibilidade: false,
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
      telemergencia : '',
      telefone : ''
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
