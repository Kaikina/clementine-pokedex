<template>
  <section class="section">
    <b-table
      :data="pokemons"
      :loading="loading"
      paginated
      backend-pagination
      :total="total"
      :per-page="perPage"
      @page-change="onPageChange"
      aria-next-label="Page Suivante"
      aria-previous-label="Page Précédente"
      aria-page-label="Page"
      sticky-header
      height="600"
      aria-current-label="Page Actuelle">
      <template slot-scope="props">
        <b-table-column field="pkmn_name" label="Nom" searchable>
          <nuxt-link :to="{ name: 'pokemons-id', params: { id: props.row.id } }" class="v-align">
            <figure class="image is-48x48 is-pulled-left">
              <img :src="props.row.sprite" alt="">
            </figure>{{ props.row.pkmn_name }}</nuxt-link>
        </b-table-column>
      </template>
    </b-table>
  </section>
</template>

<script>
  export default {
    name: "index",
    head () {
      return {
        title: 'Pokédex Clémentine'
      }
    },
    data () {
      return {
        pokemons: [],
        total: 0,
        loading: false,
        page: 1,
        perPage: 100,
        nextPage: null,
        previousPage: null,
        offset: 0
      }
    },
    mounted() {
      this.loadAsyncData();
    },
    methods: {
      loadAsyncData() {
        this.loading = true;
        fetch('https://pokeapi.co/api/v2/pokemon/?limit=100&offset=' + this.offset)
          .then(response => {
            response.json().then(pokemons => {
              this.pokemons = [];
              this.nextPage = pokemons.next;
              this.previousPage = pokemons.previous;
              this.total = pokemons.count;
              pokemons.results.forEach((pkmn) => {
                fetch(pkmn.url).then(response => {
                  response.json().then(pkmn_details => {
                    this.pokemons.push({
                      id: pkmn_details.id,
                      pkmn_name: pkmn.name.charAt(0).toUpperCase() + pkmn.name.slice(1),
                      sprite: pkmn_details.sprites.front_default,
                      url: pkmn.url});
                  })
                });
              });
              this.loading = false;
            })
          })
      },
      onPageChange(page) {
        this.offset = (page - 1) * 100;
        this.page = page;
        this.loadAsyncData();
      }
    }
  }
</script>

<style scoped>
  .v-align {
    line-height: 48px;
  }
</style>
