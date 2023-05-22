import { $, component$, useSignal } from '@builder.io/qwik';
import { type DocumentHead, useNavigate } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';


export default component$(() => {

  const nav = useNavigate();
  
  const pokemonId = useSignal(1); // primitivos: booleans, strings
  const showBackImage = useSignal(false);
  const revealImage = useSignal(false);

  const changePokemonId = $(( value: number ) => {
    if( ( pokemonId.value + value ) <= 0 ) return;
    pokemonId.value += value;

  });

  const goToPokemon = $(() => {
      nav( `/pokemon/${ pokemonId.value }/`);
  });


  return (
    <>
        <span class="text-2xl">Buscador simple</span>

        <span class="text-9xl">{ pokemonId }</span>

        {/* <Link href={`/pokemon/${ pokemonId.value }/`}> */}
        <div onClick$={ () => goToPokemon() }>
          <PokemonImage  
            id={ pokemonId.value } 
            backImage={ showBackImage.value } 
            isVisible={ revealImage.value } 
          />
        </div>

        <div class="mt-2">
          <button
            onClick$={ () => changePokemonId(-1) }
            class="btn btn-primary mr-2"
          >Anterior</button>
          <button
            onClick$={ () => changePokemonId(+1) }
            class="btn btn-primary mr-2"
          >Siguiente</button>
          <button
            onClick$={ () => showBackImage.value = !showBackImage.value }
            class="btn btn-primary mr-2"
          >Voltear</button>
          <button
            onClick$={ () => revealImage.value = !revealImage.value }
            class="btn btn-primary"
          >Revelar</button>

        </div>
       
    </>
  );
});


export const head: DocumentHead = {
  title: 'PokeQwik',
  meta: [
    {
      name: 'description',
      content: 'Mi primer aplicación en Qwik',
    },
  ],
};
