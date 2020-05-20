export const state = () => ({
  pokemons: []
});

export const mutations = {
  add (state, pkmn) {
    if (state.pokemons.length < 6) {
      state.pokemons.push(pkmn);
    }
  },
  remove (state, index) {
    state.pokemons.splice(index, 1);
  },
  updateList (state, value) {
    state.pokemons = value;
  }
};
