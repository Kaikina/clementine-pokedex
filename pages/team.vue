<template>
  <section>
    <div class="columns is-mobile is-centered">
      <div class="column is-narrow">
        <h1 class="title">TEAM</h1>
      </div>
    </div>
    <div class="columns is-mobile is-centered">
      <template v-for="pkmn in pokemons">
        <div class="column is-narrow">
          <div v-if="$fetchState.pending"></div>
          <nuxt-link v-else :to="{ name: 'pokemons-id', params: { id: pkmn.id } }">
            <div class="card">
              <header class="card-header">
                <b-skeleton v-if="$fetchState.pending"></b-skeleton>
                <p v-else class="card-header-title is-centered">
                  {{ pkmn.name.charAt(0).toUpperCase() + pkmn.name.slice(1) }}
                </p>
              </header>
              <div class="card-image has-text-centered">
                <figure class="image is-96x96 is-inline-block">
                  <b-skeleton v-if="$fetchState.pending" height="96px"></b-skeleton>
                  <img v-else :src="pkmn.sprites.front_default" alt="pokemon image">
                </figure>
              </div>
            </div>
          </nuxt-link>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        loading: true,
        pokemons: []
      }
    },
    async fetch() {
      if (Array.isArray(this.$route.query.id)) {
        await Promise.all(this.$route.query.id.map(async id => {
          const res = await this.$axios.$get('https://pokeapi.co/api/v2/pokemon/' + id);
          this.pokemons.push(res);
        }));
      } else {
        const res = await this.$axios.$get('https://pokeapi.co/api/v2/pokemon/' + this.$route.query.id);
        this.pokemons.push(res);
      }
    }
  }
</script>
