<template>
  <div>
    <b-navbar>
      <template slot="start">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          Accueil
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <button class="button is-primary"
                    @click="isComponentModalActive = true">
              Mon équipe
            </button>

            <b-modal :active.sync="isComponentModalActive"
                     has-modal-card
                     trap-focus
                     :destroy-on-hide="false"
                     aria-role="dialog"
                     aria-modal>
              <modal></modal>
            </b-modal>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>

    <section class="main-content columns">
      <div class="container column is-10">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script>
  import TeamModal from "../components/TeamModal";

  const Modal = TeamModal;

  export default {
    components: {
      Modal
    },
    computed: {
      team () {
        console.log(this.$store.state.team);
      }
    },
    data () {
      return {
        isComponentModalActive: false
      }
    },
  }
</script>
