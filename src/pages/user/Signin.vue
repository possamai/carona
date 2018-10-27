<template>
  <v-layout>
    <v-flex xs6 offset-xs3 sm4 offset-sm4>
      
      
        <v-card class="elevation-12">
          <v-card-text>
            <v-form @submit.prevent="submit">
              <h2 class="headline mb-0 text-md-center">Caronas Já</h2>
              <v-text-field
                label="E-mail"
                v-model="email"
                :error-messages="emailErrors"
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
                required
              ></v-text-field>
              <v-text-field
                label="Password"
                type="password"
                v-model="password"
                :error-messages="passwordErrors"
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn class="text-transform-none" flat @click="clear">Registrar</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="text-transform-none" @click="submit">Entrar</v-btn>
          </v-card-actions>
        </v-card>
      
    </v-flex>
  </v-layout>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'Signin',
  mixins: [validationMixin],
  data () {
    return {
      title: 'Signin',
      email: '',
      password: ''
    }
  },
  methods: {
    async submit () {
      this.$v.$touch()
      await this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
      //await this.$router.push('/')
    },
    clear () {
      this.$v.$reset()
      this.email = ''
      this.password = ''
      this.$router.push('/signup')
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/hello')
      }
    }
  },
  validations: {
    email: { required, email },
    password: { required }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required')
      return errors
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .text-transform-none {
    text-transform: none;
  }
</style>