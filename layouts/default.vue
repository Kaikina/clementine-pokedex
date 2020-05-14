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
  const Modal = {
    template: `
                <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Mon équipe</p>
                    </header>
                    <section class="modal-card-body">
                        <ul>
                            <li></li>
                        </ul>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button" type="button" @click="$parent.close()">Fermer</button>
                        <b-button icon-left="link" class="button is-primary">Partager</b-button>
                    </footer>
                </div>
        `
  };

  export default {
    components: {
      Modal
    },
    data () {
      return {
        isComponentModalActive: false
      }
    }
  }
</script>
