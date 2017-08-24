<template>
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
            <img id="PKTOP" height="300" :src="pkmnTopImg">
        </div>
    </div>
</template>

<script>
import { QCard, QCardTitle, QCardSeparator, QCardMain, QProgress } from 'quasar'
import { mapGetters } from 'vuex'

export default {
  name: 'Top',
  components: {
    QCard,
    QCardTitle,
    QCardSeparator,
    QCardMain,
    QProgress
  },
  computed: {
    ...mapGetters([
      // Nombre mostrado en pantalla para el componente superior (string)
      'pkmnTopName',
      // Porcentaje de vida del componente superior (integer)
      'pkmnTopLifePoints',
      // Imagen del componente superior (PNG BASE64)
      'pkmnTopImg',
      // Color para barra de progreso superior
      'pkmnTopColorProgress'
    ])
  }
}
</script>
