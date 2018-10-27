<template>
  <v-layout>
    <v-flex xs8 offset-xs2>     
      
        <v-card class="elevation-12">
          <v-card-text>
            <v-form @submit.prevent="submit">
              <h2 class="headline mb-0 text-md-center">Perfil</h2>
              <v-text-field label="Nome" v-model="model.nome" required ></v-text-field>
              <v-text-field label="Cpf" v-model="model.cpf" required ></v-text-field>
              
              <v-checkbox label="Necessita acessibilidade" v-model="checkbox"></v-checkbox>
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
      perfisRef.push( this.model );
    },
    clear () {
      // this.password = ''
      // this.$router.push('/signup')  
    },
  },
}
</script>