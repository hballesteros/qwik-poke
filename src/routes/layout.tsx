import { component$, Slot, useContextProvider, useStore, useStyles$ } from '@builder.io/qwik';
import Navbar from '~/components/shared/navbar/navbar';

import styles from './styles.css?inline';

import { PokemonGameContext,PokemonListContext } from '~/context';
import type { PokemonListState, PokemonGameState } from '~/context';


export default component$(() => {
  useStyles$(styles);

  const pokemomGame = useStore<PokemonGameState>({
    pokemonId: 4,
    isPokemonVisible: true,
    showBackImage: false,
  });

  useContextProvider( PokemonGameContext, pokemomGame );

  const pokemomList = useStore<PokemonListState>({
    currentPage: 1,
    isLoading: false,
    pokemons: [],
  });  

  useContextProvider( PokemonListContext, pokemomList );

  return (
    <>
      <Navbar />
      <main class="flex flex-col items-center justify-center">
        <Slot />
      </main>
    </>
  );
});
