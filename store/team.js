export const state = () => ({
  pokemons: []
});

export const mutations = {
  add (state, imgUrl) {
    if (state.pokemons.length < 6) {
      state.pokemons.push(imgUrl);
    }
  }
};
