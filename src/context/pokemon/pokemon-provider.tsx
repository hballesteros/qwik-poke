import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from '@builder.io/qwik';

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

    useVisibleTask$(() => {
        if ( localStorage.getItem('pokemon-game') ) {
            const { 
                isPokemonVisible = true,
                pokemonId = 10,
                showBackImage = false,
            } = JSON.parse(localStorage.getItem('pokemon-game')!) as PokemonGameState;

            pokemomGame.isPokemonVisible = isPokemonVisible;
            pokemomGame.pokemonId = pokemonId;
            pokemomGame.showBackImage = showBackImage;
        }
    });

    useVisibleTask$(({ track }) => {
        // se vuelve a ejecutar si algunas de las propiedades cambia
        track(() => [ pokemomGame.isPokemonVisible, pokemomGame.pokemonId, pokemomGame.showBackImage ]);
        localStorage.setItem('pokemon-game', JSON.stringify( pokemomGame ));
    });
   
    return <Slot />;

});

