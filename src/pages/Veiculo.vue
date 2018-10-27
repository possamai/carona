<template>
  <v-layout>
    <v-flex xs8 offset-xs2>

        <v-card class="elevation-12">
          <v-card-text>
            <v-form @submit.prevent="submit">
              <h2 class="headline mb-0 text-md-center">Veículo</h2>
              <v-text-field label="Placa" v-model="model.placa" required ></v-text-field>
              <v-text-field label="Marca" v-model="model.marca" required ></v-text-field>
              <v-text-field label="Modelo" v-model="model.modelo" required ></v-text-field>
              <v-text-field label="Cor" v-model="model.cor" required ></v-text-field>
              <v-text-field label="Ano" v-model="model.ano" required ></v-text-field>
              <v-text-field label="CNH" v-model="model.cnh" required ></v-text-field>

              <v-checkbox label="Acessibilidade Disponível" v-model="model.acessibilidade"></v-checkbox>
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

let veiculoRef = firebase.getDb().ref('veiculo');


export default {
  name: 'Veiculo',
  data () {
    return {
      model: {
        placa : '',
        marca : '',
        modelo : '',
        cor : '',
        ano : '',
        cnh : '',
        acessibilidade : ''
      },
      date: new Date().toISOString().substr(0, 10),
    }
  },
  methods: {
    async submit () {
      this.model.idUser = store.getters.user.uid;
      veiculoRef.push( this.model );
    },
    clear () {
      // this.password = ''
      // this.$router.push('/signup')
    },
  },
}
</script>
