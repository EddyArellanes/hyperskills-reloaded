<template>
  <v-layout class="loginBox">
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img
          class="loginBoxImage"
          src="https://images.pexels.com/photos/2159/flight-sky-earth-space.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          aspect-ratio="2.75"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Bienvenido a <b class="text--teal darken-3">HyperSkills</b></h3>
            <div>¡Inicia Sesión ahora! </div>
          </div>
        </v-card-title>
        <div>
          <v-alert
          :value="loginFailed"
          dismissible
          transition="scale-transition"
          type="error"
          @click="loginFailed = false"
          >
          {{ loginFailText }}
          </v-alert>
          <v-form 
            ref="form" 
            v-model="valid" 
            lazy-validation
          >
            <v-container>
              <v-layout row wrap>       
                <v-flex xs12 sm6>
                  <v-text-field
                    label="Correo Electrónico"
                    prepend-inner-icon="mdi-email"
                    color="primary"
                    v-model="email"    
                    :rules="emailRules"                
                    required
                  ></v-text-field>
                </v-flex>      
                <v-flex xs12 sm6>
                  <v-text-field
                    label="Password"
                    type="password"
                    prepend-inner-icon="mdi-lock"
                    color="primary"
                    v-model ="password"
                    required
                  ></v-text-field>
                </v-flex>      
              </v-layout>
            </v-container>
          </v-form>
        </div>
        <v-card-actions>
          <v-btn flat color="green" :disabled="!valid" @click="validate">Iniciar</v-btn>
          <v-btn flat color="red">¿Olvidaste tu contraseña?</v-btn>          
        </v-card-actions>
       
      </v-card>
    </v-flex>

    <v-snackbar
      v-model="snackbar.activated"
      :bottom="snackbar.y === 'bottom'"
      :left="snackbar.x === 'left'"
      :multi-line="snackbar.mode === 'multi-line'"
      :right="snackbar.x === 'right'"
      :timeout="snackbar.timeout"
      :top="snackbar.y === 'top'"
      :vertical="snackbar.mode === 'vertical'"
    >
      {{ snackbar.text }}
      <v-btn
        color="pink"
        flat
        @click="snackbar.activated = false"
      >
        Close
      </v-btn>
    </v-snackbar>

    
  </v-layout>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'Login',
  data: () => {
    return {
      valid: true,
      loginFailed: false,
      loginFailText: 'Usuario o contraseña incorrectos',
      email: '',
      emailRules: [
        // Parenthesis are not needed
        (v: any) => !!v || 'El email es obligatorio',
        // (v:any) => v.length >= 5 || 'El nombre debe tener al menos 5 letras'
      ],
      password: '',
      snackbar: {
        activated: false,
        y: 'bottom',
        x: 'right',
        mode: '',
        timeout: 4000,
        text: 'Credenciales correctas :D',
      },
    };
  },
  methods: {
   validate() {
      if ( (this.$refs.form as any).validate() ) {
        // Connection with Beemera
        const data = {
          email: this.email,
          password: this.password,
        };
        /*backend.post('/api/users/login', data).then( (response) => {
          if (response.status === 200) {
            // this.snackbar.activated = true
           
            this.$store.dispatch('SET_USER_ACTION', response.data.user)
            this.$store.dispatch('SET_TOKEN_ACTION', response.data.token)
            this.$router.push('dashboard')
          } else {
            this.loginFailText = 'Usuario o contraseña incorrectos'
            this.loginFailed = true;
          }
        })
        .catch( error => {
          this.loginFailText = 'Ha ocurrido un error, por favor inténtalo de nuevo en unos momentos'
          this.loginFailed = true          
        })*/
    }
  },
}});
</script>
<style>
  .loginBox{
    display: flex;    
    align-items: center;    
    margin-top: 80px;
  }
  .loginBoxImage{
    display: block;
    margin-bottom: 18px
  }
  .green-text{
    color: green;
  }
</style>