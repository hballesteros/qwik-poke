import { Slot, component$, useContextProvider, useStore } from '@builder.io/qwik';

import { PokemonGameContext, type PokemonGameState } from './pokemon-game.context';
import { PokemonListContext, type PokemonListState } from './pokemon-list.context';


export const PokemonProvider = component$(() => {

    const pokemomGame = useStore<PokemonGameState>({
        pokemonId: 4,
        isPokemonVisible: true,
        showBackImage: false,
    });

    
    const pokemomList = useStore<PokemonListState>({
        currentPage: 1,
        isLoading: false,
        pokemons: [],
    });  
    
    useContextProvider( PokemonGameContext, pokemomGame );
    useContextProvider( PokemonListContext, pokemomList );
   
    return <Slot />;

});

