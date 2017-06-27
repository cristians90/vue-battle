import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    pokemonTop: {
      name: 'BLASTOISE',
      lifePoints: 100,
      colorProgress: 'positive',
      imgBase64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgBAMAAAAQtmoLAAAALVBMVEUAAAAIOWIQEBAgYqxKSkpaORhai82LYkGUlJSUrObNzdXVrErmxXP21Zz///+2pahRAAAAAXRSTlMAQObYZgAABBNJREFUWMPtlr9rI0cUx9cb5w+YXSMchwPvk/UDiRNZDQhC4JDFXmJ0cByCxYUqSWHAZQxChSuL41hcHASDQKV1vhCmEMTcccWcunTJFVbchS0cFDhUzN+QNyvZCSdrvF0avWab99nv+zVvxjBWtrKV/V9G5t/Pvorl7u0yYlBKjbUvfozjv87PWMNmjFH7oBkHyPFBKcGUJXoxAU4j/xZj327f728GnM8EGPs+nfJ9/9l9QHBWmgPNdGHqd9q+YQI80wBd5dxnjVIzXZTT/U7Hz7TF26US2SCN/gc9pirVlPLvTuewUxdiucReGtMtsSbHyFoFKVGhLd5pJCrdBpaUfcNfoYT1EiUydVGrL5cwdgmltpuRPykApESBt5DSSKwNKHW3MpJFQEG+zogagPfkTgmvYqyR15TdGCAw2W/veNnhxLsr/sIrYqdvvBOsBfBSTr+red2hlHKRMKsD2y3e/t5mLmTRcVLZUx8pywsAP6b2LdAIaREF0M6zOSmnlepkQQIItWmSOaoF5EH4h5UdRr+uVKUcACwA5oBYlIKDSbe+DMNwDCfBLtnAoHJ8WgF4Wl4IiViEOnjcXOUfXuwExzZrPZIShx5gZwEwcggQywKnPlIAZAMc9f4pxsR5BbxFwHQUkBdoHzCi/N4xzmG//0j+xXnX8xaTxqwdYoECxO+/wZsAgX4fJT5m+c+V6uCO1gECJBURtfybKCIFTCtZzs/vPLGmgyKKwAG9ChxSQqC3xR/jOC054XgeMSqAuhiNHazv1/0+Q8D3a8sPNkRpi3CsUj7t9+4FjAgYhekoA2z7Fgc9kIr8Q8cuzYDceU0LfD7yj9D/snRwihm0WIOf+ykdYIqwjSssgQFhBg1WPHnsY5V0gMDBuJxn0GCbz9UK1OxN80iNRjUaCwSaz/e6ekBVaXTFX5DEQa/F3J1KEAcY8w15jeeOWU9+DXhKD2SEeD+GqrymrOEIcYSXhh5Q8xqGTz9uDEtFIX4Ah/OUrm+mdaQaV4UNCQ///AVHluiB2bh+gPBq8CC8VGucbQ10Edlu3o8O3fhh2ElG90uD6/pGqSV8jEq8b+9fzPfmlrNcYg23Rl68w9LvC3ED4GFfSthUScwtOQcIbodlQBIVSP4ToKkHcDnN/C/sfwFNSC6uDrgBSnPAWl4ljNchBFTWhy6dSTRgWweAyhE6eOUW6UzC1Y6S8keDTOeQJiOJlhZwZv6W2lG0aCuC2hrAO54Bm+WoZJgFmgZYD4IZEJTnc6IuDFf7oLFOVAYwHyxF2EVtzjl+drtVkopwaPGeZxn8t+/K9IAJxieAuxnjOXcD4GOFFLkXFzBdaRO5wQexH8oFeT2UU4gdkpHDS1dOyvGf4uueAcP4Ac1bs22sbGUrW2L/AKyCBSohEpvAAAAAAElFTkSuQmCC'
    },
    pokemonBottom: {
      name: 'CHARIZARD',
      lifePoints: 100,
      colorProgress: 'positive',
      imgBase64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgBAMAAAAQtmoLAAAALVBMVEUAAAAAAAAIQVIgc5RiYmKDMRjNUkHNzc3mQRDugynutFru3nv2pBD/1RD////8tlCXAAAAAXRSTlMAQObYZgAABANJREFUWMPtl79u3DgQxsliFylF4FbApji4uv52XyCPIBdirKsiLDSILoCBAw6p3QRgEReLg5hwU12RAN6rUub0Am5cBnCxKu5NMkPqD9eWZKtIExwbe7Xz43wfORwtGftBx5PvD1xMBdRUQqnvneLs7aQUszOlbifN//JweT0hfq7eVpXvYRYMi4ljEnRZHXwg2Q7Fx4kxcfIeM9yqxwBg7FBKVbe3XYqZ6Zc0r+ONulY3B09TUvQC87yOf68OaMJzPaAoqeP1marUTXVQnaJeYFbHmxhUVVWHznXSb6EBMgCcHxM8BMxdfCEBXl7e4LJetDP1e3YWNMZD9uSmuvZS9wNujSgegctKeTPJ8MUQUIAF2JuvFz6w1EOebQKAiGe+IugDrGcNNRAeAZulifoB6AESozcLo3stNPGQ6si3sBGm6AN0B3QS0Busg+SeppmfAJY+UMAqDu9pmh8n6KotxucrkFhi9/bZT7A9srACQMXRHQtdgtiYMPIsbFa4Pbip0ZGFLj7LzTYvTt1zyrzGDJhi9/HIAkkXtvIwJsWwoKnIzfoXmscYH0gwgQjYDL9Af4Y+EsAR0A7Idb7zijbHePorIcP4Lc2I3/KlBUgRSnqedADO7DRLEvQhdABfGukB5796niF1/0iM2H223gM0XKByvV4tyJs59xRJiNpV3JULByR0PHJaJJ5ZE149yaY4lxj/mUm33XQ8HECbI/3qkFG7r2UZOABIEQKb1Qm3a557BdYo4uZD+S+6FWRb0/nL9fqEESDEIm81zTpFJSoiUoCrd6NXzAKBENCmaC0ku7L821bElvZYZ9L8dWIXJaW0eXbHAikqI1eiBBRJZjYEhLTs/GeZNpLaRS3JAvV3sF0H931VNAAT4d2GtkRFX+ihDKnYsCATnTggoznFvW6Jiq4sQOtDBZwU9uBwyP7rba//lKXt1KfN2agBJkD0xHOyYIGwBTJwnbgv3gJfjoDMyKYsewHyTOefgwcsRoBXBKT2eNSAHgd+Rw869SxAHMLTaATYlyVWDe86FITw2zDAnu73ewSkByweBDSkXjx+yGL8iRANA59Ihg+AwcaQDZhwQOoRmbQHIx0GrlxUO/CgUd1Gg8DedyDtYRbhYArnutPjXniMh5COuvYT0FubzV4H4yaOANTPBWOPM2Hb/As2vnWf7gJ6BFj6KZznfBSwmq4mAFZTI6oBRk3YFA0hHwE4FzVRL6uJxgBuRTkfTpPWo0BD7K90oykPxi8baU3gcJr0OICdSDTAR3eIxm8boX3d2Hh8hzwSgGeCRt3RggcuTBTzpwc/kIBxdJpNARiJCTxgO+G6ZT28ezYBoI04/2NCCoG/O05/mnJn5EKw/8ePMb4BcgvIEzNIy2cAAAAASUVORK5CYII='
    }
  },
  getters: {
    pkmnTopName: state => {
      return state.pokemonTop.name
    },
    pkmnTopLifePoints: state => {
      return state.pokemonTop.lifePoints
    },
    pkmnTopImg: state => {
      return state.pokemonTop.imgBase64
    },
    pkmnBottomName: state => {
      return state.pokemonBottom.name
    },
    pkmnBottomLifePoints: state => {
      return state.pokemonBottom.lifePoints
    },
    pkmnBottomImg: state => {
      return state.pokemonBottom.imgBase64
    },
    pkmnTopColorProgress: state => {
      return state.pokemonTop.colorProgress
    },
    pkmnBottomColorProgress: state => {
      return state.pokemonBottom.colorProgress
    }
  },
  mutations: {
    modifyHpTop: (state, payload) => {
      state.pokemonTop.lifePoints += payload.value
      if (state.pokemonTop.lifePoints < 50) {
        state.pokemonTop.colorProgress = 'orange-10'
      }
      if (state.pokemonTop.lifePoints < 25) {
        state.pokemonTop.colorProgress = 'negative'
      }
    },
    modifyHpBottom: (state, payload) => {
      state.pokemonBottom.lifePoints += payload.value
      if (state.pokemonBottom.lifePoints < 50) {
        state.pokemonBottom.colorProgress = 'orange-10'
      }
      if (state.pokemonBottom.lifePoints < 25) {
        state.pokemonBottom.colorProgress = 'negative'
      }
    },
    resetHp: (state) => {
      state.pokemonTop.lifePoints = 100
      state.pokemonBottom.lifePoints = 100
      state.pokemonBottom.colorProgress = 'positive'
      state.pokemonTop.colorProgress = 'positive'
    }
  },
  actions: {
    modifyHp: ({commit}, payload) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          switch (payload.pokemon) {
            case 'TOP':
              commit('modifyHpTop', payload)
              break
            case 'BOTTOM':
              commit('modifyHpBottom', payload)
              break
          }
          resolve()
        }, 1000)
      })
    },
    resetGame: ({commit}) => {
      commit('resetHp')
    }
  }
})
