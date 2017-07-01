<template>
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
</template>

<script>
import { QCard, QCardTitle, QCardSeparator, QCardMain, QProgress } from 'quasar'
import { mapGetters } from 'vuex'

export default {
  name: 'Bottom',
  components: {
    QCard,
    QCardTitle,
    QCardSeparator,
    QCardMain,
    QProgress
  },
  computed: {
    ...mapGetters([
      // Nombre mostrado en pantalla para el componente inferior (string)
      'pkmnBottomName',
      // Porcentaje de vida del componente inferior (integer)
      'pkmnBottomLifePoints',
      // Imagen del componente inferior (PNG BASE64)
      'pkmnBottomImg',
      // Color para barra de progreso inferior
      'pkmnBottomColorProgress'
    ])
  }
}
</script>
