export const state = () => ({
  pokemons: []
});

export const mutations = {
  add (state, pkmn) {
    if (state.pokemons.length < 6) {
      state.pokemons.push(pkmn);
    }
  }
};
