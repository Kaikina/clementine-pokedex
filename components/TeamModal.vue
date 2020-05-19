<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Mon équipe</p>
    </header>
    <section class="modal-card-body">
      <ul>
        <li v-for="pkmn in this.$store.state.team.pokemons"><img :src="pkmn.sprite" alt=""></li>
      </ul>
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
