<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Mon équipe</p>
    </header>
    <section class="modal-card-body">
      <div class="columns is-mobile">
        <template v-for="pkmn in this.$store.state.team.pokemons">
          <div class="column is-narrow">
            <figure class="image is-96x96">
              <img :src="pkmn.sprite" alt="" class="modal-img">
            </figure>
          </div>
        </template>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">Fermer</button>
      <b-button icon-left="link" class="button is-primary" @click="copySomething()" >Partager</b-button>
    </footer>
  </div>
</template>

<script>
  export default {
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
    }
  }
</script>

<style>
  .modal-img {
    max-height: none !important;
  }
</style>
