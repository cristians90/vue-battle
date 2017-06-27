<template>
    <q-layout ref="layout">
    
        <div class="container">
            <div class="row">
                <div class="col">
                    <q-card style="width: 700px">
                        <q-card-title>
                            {{pkmnTopName}}
                        </q-card-title>
                        <q-card-separator></q-card-separator>
                        <q-card-main>
                            <q-progress :percentage="pkmnTopLifePoints" :color="pkmnTopColorProgress" style="height: 50px"></q-progress>
                        </q-card-main>
                    </q-card>
                </div>
                <div class="col">
                    <img height="300" :src="pkmnTopImg">
                </div>
            </div>
    
            <div class="row">
                <div>
                    <img height="300" :src="pkmnBottomImg">
                </div>
                <div>
                    <q-card style="width: 700px">
                        <q-card-title>
                            {{pkmnBottomName}}
                        </q-card-title>
                        <q-card-separator></q-card-separator>
                        <q-card-main>
                            <q-progress :percentage="pkmnBottomLifePoints" :color="pkmnBottomColorProgress" style="height: 50px"></q-progress>
                        </q-card-main>
                    </q-card>
                </div>
            </div>
    
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
import { QLayout, QToolbar, QBtn, QSpinnerHourglass, QCard, QCardTitle, QCardSeparator, QCardMain, QProgress, Alert, Dialog, Toast } from 'quasar'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'stage',
  components: {
    QLayout,
    QToolbar,
    QBtn,
    QSpinnerHourglass,
    QCard,
    QCardTitle,
    QCardSeparator,
    QCardMain,
    QProgress,
    Alert,
    Dialog,
    Toast
  },
  data () {
    return {
      lockButtons: false
    }
  },
  methods: {
    ...mapActions([
      'modifyHp'
    ]),
    tackle () {
      this.lockButtons = true
      const textPkmnBottom = this.pkmnBottomName + ' uso Tackle'
      const textPkmnTop = this.pkmnTopName + ' uso Tackle'

      const alertPkmnBottom = Alert.create({ color: 'positive', icon: '', html: textPkmnBottom })

      this.$store.dispatch('modifyHp', { pokemon: 'TOP', value: -getRandomTackleValue() }).then(() => {
        setTimeout(() => {
          alertPkmnBottom.dismiss()
          if (this.pkmnTopLifePoints > 0) {
            const alertPkmnTop = Alert.create({ color: 'positive', icon: '', html: textPkmnTop })
            this.$store.dispatch('modifyHp', { pokemon: 'BOTTOM', value: -getRandomTackleValue() }).then(() => {
              setTimeout(() => {
                alertPkmnTop.dismiss()
                this.lockButtons = false
              }, 1000)
            })
          }
        }, 1000)
      })
    },
    gameOver (value) {
      const resetMethod = () => { this.resetGame() }
      switch (value) {
        case 'WIN':
          Dialog.create({
            title: 'Victoria!',
            message: 'La partida ha finalizado.',
            buttons: [
              {
                label: 'Nueva Partida', handler () { resetMethod() }
              }
            ],
            noBackdropDismiss: true
          })
          break
        case 'LOSE':
          Dialog.create({
            title: 'Derrota!',
            message: 'La partida ha finalizado.',
            buttons: [
              {
                label: 'Nueva Partida', handler () { resetMethod() }
              }
            ],
            noBackdropDismiss: true
          })
          break
      }
    },
    resetGame () {
      this.$store.dispatch('resetGame')
      this.lockButtons = false
    },
    checkTopHP (val, oldVal) {
      if (val <= 0) {
        this.gameOver('WIN')
      }
    },
    checkBottomHP (val, oldVal) {
      if (val <= 0) {
        this.gameOver('LOSE')
      }
    }
  },
  computed: {
    ...mapGetters([
      'pkmnTopName',
      'pkmnTopLifePoints',
      'pkmnTopImg',
      'pkmnBottomName',
      'pkmnBottomLifePoints',
      'pkmnBottomImg',
      'pkmnTopColorProgress',
      'pkmnBottomColorProgress'
    ])
  },
  watch: {
    pkmnTopLifePoints: 'checkTopHP',
    pkmnBottomLifePoints: 'checkBottomHP'
  }
}

function getRandomTackleValue () {
  return Math.floor(Math.random() * (25 - 0 + 1) + 0)
}

</script>

<style lang="stylus">
.docs-btn .q-btn
  margin 5px
</style>
