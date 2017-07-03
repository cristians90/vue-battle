<template>
    <q-layout ref="layout">
        <div class="container">
            <Top></Top>
            <Bottom></Bottom>
        </div>
        <q-toolbar slot="footer">
    
            <q-btn color="secondary" @click="tackle" :disable="lockButtons">
                Tackle
            </q-btn>
    
            <q-btn loader color="deep-orange-6" :disable="lockButtons">
                Special Attack
                <span slot="loading">
                    <q-spinner-hourglass class="on-left"> Loading... </q-spinner-hourglass>
                </span>
            </q-btn>
    
            <q-btn loader color="green-14" :disable="lockButtons">
                Heal
                <span slot="loading">
                    <q-spinner-hourglass class="on-left"> Loading... </q-spinner-hourglass>
                </span>
            </q-btn>
    
        </q-toolbar>
    </q-layout>
</template>
 
<script>
// Se importan componentes UI de quasar framework
import { QLayout, QToolbar, QBtn, QSpinnerHourglass, Alert, Dialog } from 'quasar'
// Se importan Getters y Actions definidos con vuex
import { mapGetters, mapActions } from 'vuex'

// Se importa componente inferior
import Bottom from './Bottom.vue'
// Se importa componente superior
import Top from './Top.vue'

export default {
  name: 'stage',
  components: {
    QLayout,
    QToolbar,
    QBtn,
    QSpinnerHourglass,
    Alert,
    Dialog,
    Bottom, // Se establece el componente inferior dentro de la propiedad Components de la instancia Vue
    Top // Se establece el componente superior dentro de la propiedad Components de la instancia Vue
  },
  data () {
    return {
      // Variable booleana para bloquear botones de acción (botones de quasar-framework)
      lockButtons: false
    }
  },
  methods: {
    ...mapActions([
      // Acción proveniente del ‘store’ para modificar porcentaje de vida de los componentes
      'modifyHp'
    ]),
    // Método utilizado para realizar ataque de tackle
    tackle () {
      // Se bloquean botones para evitar peticiones asincrónicas
      this.lockButtons = true
      // Se definen mensajes para las alertas de ataques
      const textPkmnBottom = this.pkmnBottomName + ' uso Tackle'
      const textPkmnTop = this.pkmnTopName + ' uso Tackle'
      // Se lanza alerta de ataque del componente inferior
      const alertPkmnBottom = Alert.create({ color: 'positive', icon: '', html: textPkmnBottom })
      // Se envía acción para modificar porcentaje del componente superior
      // Se adjunta un objeto que posea el componente de destino y la cantidad de porcentaje a reducir
      this.$store.dispatch('modifyHp', { pokemon: 'TOP', value: -getRandomTackleValue() }).then(() => {
        // Al recibir la respuesta satisfactoria de la Promise, se definirá un retardo de un segundo
        setTimeout(() => {
          // Se desecha la alerta de ataque del componente inferior
          alertPkmnBottom.dismiss()
          // Al realizar el cálculo de daño, si el componente superior aun le resta porcentaje de vida, este atacara
          if (this.pkmnTopLifePoints > 0) {
            // Se lanza alerta de ataque del componente superior
            const alertPkmnTop = Alert.create({ color: 'positive', icon: '', html: textPkmnTop })
            // Se envía acción para modificar porcentaje del componente superior
            // Se adjunta un objeto que posea el componente de destino y la cantidad de porcentaje a reducir
            this.$store.dispatch('modifyHp', { pokemon: 'BOTTOM', value: -getRandomTackleValue() }).then(() => {
              // Al recibir la respuesta satisfactoria de la Promise, se definirá un retardo de un segundo
              setTimeout(() => {
                // Se desecha la alerta de ataque del componente superior
                alertPkmnTop.dismiss()
                // Se desbloquean botones
                this.lockButtons = false
              }, 1000)
            })
          }
        }, 1000)
      })
    },
    // Método utilizado para cuando la partida termine
    // El argumento de este método debe ser una variable string, 'WIN' en caso de victoria y 'LOSE' en caso de derrota
    gameOver (value) {
      // Se guarda método de reset dentro de una constante dado que el evento del Dialog de quasar-framework no puede observar la instancia de Vue
      const resetMethod = () => { this.resetGame() }
      // Se define un switch – case para mostrar un dialogo de victoria o derrota
      switch (value) {
        case 'WIN':
          // Se crea el dialogo de victoria
          Dialog.create({
            title: 'Victoria!',
            message: 'La partida ha finalizado.',
            buttons: [
              {
                // Se define botón dentro del dialogo para gatillar el reset
                label: 'Nueva Partida',
                // Al hacer clic en el botón, se llamara al método de reset
                handler () {
                  resetMethod()
                }
              }
            ],
            // Se establece propiedad para el Dialog, para que no permita cerrarlo haciendo clic fuera de el
            noBackdropDismiss: true
          })
          break
        case 'LOSE':
          // Se crea el dialogo de derrota
          Dialog.create({
            title: 'Derrota!',
            message: 'La partida ha finalizado.',
            buttons: [
              {
                // Se define botón dentro del dialogo para gatillar el reset
                label: 'Nueva Partida',
                // Al hacer clic en el botón, se llamara al método de reset
                handler () {
                  resetMethod()
                }
              }
            ],
            noBackdropDismiss: true
          })
          break
      }
    },
    // Método utilizado para resetear el estado completo
    resetGame () {
      // Se envía acción para resetear juego
      this.$store.dispatch('resetGame')
      // Se desbloquean botones de acción
      this.lockButtons = false
    },
    // Método gatillado a partir de la observación de los puntos de vida del componente superior
    // (Argumentos provenientes de las propiedades watch de la instancia Vue)
    checkTopHP (val, oldVal) {
      // Si el porcentaje de vida observado del componente superior es igual o menor que cero, se gana el juego
      if (val <= 0) {
        this.gameOver('WIN')
      }
    },
    // Método gatillado a partir de la observación de los puntos de vida del componente inferior
    // (Argumentos provenientes de las propiedades watch de la instancia Vue)
    checkBottomHP (val, oldVal) {
      // Si el porcentaje de vida observado del componente inferior es igual o menor que cero, se pierde el juego
      if (val <= 0) {
        this.gameOver('LOSE')
      }
    }
  },
  computed: {
    ...mapGetters([
      // Porcentaje de vida del componente superior (integer)
      'pkmnTopLifePoints',
      // Porcentaje de vida del componente inferior (integer)
      'pkmnBottomLifePoints',
      // Nombre mostrado en pantalla para el componente inferior (string)
      'pkmnBottomName',
      // Nombre mostrado en pantalla para el componente superior (string)
      'pkmnTopName'
    ])
  },
  watch: {
    // Observador para porcentaje de vida de componente superior
    // (Los argumentos según las funciones en watch, estarán definidas en el método definido)
    pkmnTopLifePoints: 'checkTopHP',
    // Observador para porcentaje de vida de componente inferior
    // (Los argumentos según las funciones en watch, estarán definidas en el método definido)
    pkmnBottomLifePoints: 'checkBottomHP'
  }
}

/**
* @function getRandomTackleValue función que retorna un número aleatorio para el caso de tackle
* @return {integer} {Numero entero aleatorio entre 0 y 25}
*/
function getRandomTackleValue () {
  return Math.floor(Math.random() * (25 - 0 + 1) + 0)
}

</script>

<style lang="stylus">
.docs-btn .q-btn
  margin 5px
</style>
