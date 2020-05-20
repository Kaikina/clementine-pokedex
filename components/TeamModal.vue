<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Mon équipe</p>
    </header>
    <section class="modal-card-body">
      <div class="columns is-mobile">
        <draggable v-model="team" group="people" @start="drag=true" @end="drag=false" class="drag">
          <div v-for="(pkmn, index) in this.$store.state.team.pokemons" :key="index">
            <template class="item">
              <div class="column is-narrow has-text-centered">
                <figure class="image is-96x96">
                  <img :src="pkmn.sprite" alt="" class="modal-img">
                </figure>
                <b-button size="is-small" rounded type="is-danger"
                          icon-right="close-thick" @click="clickRemove(index)" />
              </div>
            </template>
          </div>
        </draggable>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">Fermer</button>
      <b-button icon-left="link" class="button is-primary" @click="copySomething()" >Partager</b-button>
    </footer>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  export default {
    components: {
      draggable
    },
    computed: {
      team: {
        get() {
          return this.$store.state.team.pokemons;
        },
        set(value) {
          this.$store.commit('team/updateList', value);
        }
      }
    },
    methods: {
      async copySomething() {
        try {
          let url = document.location.origin;
          let searchParams = new URLSearchParams();
          this.$store.state.team.pokemons.forEach(pkmn => searchParams.append('id', pkmn.id));
          url += '/team?' + searchParams.toString();
          await this.$copyText(url);
          this.$buefy.toast.open({
            message: 'Lien copié vers le presse-papiers  !',
            type: 'is-success'
          })
        } catch (e) {
          console.error(e);
        }
      },
      clickRemove(index) {
        this.$store.commit('team/remove', index);
      }
    }
  }
</script>

<style>
  .modal-img {
    max-height: none !important;
  }
  .drag > div {
    display: inline-block;
  }
</style>
