<template>
  <section>
    <div class="columns is-centered">
      <div class="column is-half">
        <h1 class="title">{{ this.details.name.charAt(0).toUpperCase() + this.details.name.slice(1) }}</h1>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column">
        <figure class="image is-96x96 is-pulled-right">
          <img :src="this.details.sprites.front_default" alt="pokemon image">
        </figure>
      </div>
      <div class="column">
        <p>{{ this.description }}</p>
        <div class="columns">
          <div class="column">
            <p v-if="!loading"><strong>Taille</strong> <br>
              {{ this.details.height / 10 }} m</p>
          </div>
          <div class="column">
            <p><strong>Catégorie</strong><br>
              {{ this.genus }}</p>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <p><strong>Poids</strong> <br>
              {{ this.details.weight / 10 }} kg</p>
          </div>
          <div class="column">
            <p><strong>Talent</strong><br>
              {{ this.ability.charAt(0).toUpperCase() + this.ability.slice(1) }}</p>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <b-button type="is-primary" @click="clickAdd">Ajouter à mon équipe</b-button>
          </div>
        </div>
      </div>
      <div class="column"></div>
    </div>
  </section>
</template>

<script>

  export default {
    data () {
      return {
        id: this.$route.params.id,
        details: {},
        description: null,
        genus: null,
        ability: null
      }
    },
    head () {
      return {
        title: this.details.name.charAt(0).toUpperCase() + this.details.name.slice(1)
      }
    },
    async asyncData ({params, $axios}) {
      let details = await $axios.$get(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
      const ability = details.abilities.find(ability => ability.slot === 1);
      let specie = await $axios.$get(details.species.url);
      const flavor = specie.flavor_text_entries.find(entry => entry.language.name === 'en');
      const genera = specie.genera.find(genus => genus.language.name === "en");
      return {details : details, ability: ability.ability.name, description: flavor.flavor_text,
        genus: genera.genus, loading: false}
    },
    methods: {
      clickAdd() {
        this.$store.commit('team/add', this.details.sprites.front_default);
        this.$buefy.toast.open({
          message: 'Pokémon ajouté à l\'équipe !',
          type: 'is-success'
        })
      }
    }
  }
</script>

<style scoped>

</style>
