/* eslint-disable qwik/jsx-img */
import { component$, useComputed$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
  id: number | string;
  size?: number;
  backImage?: boolean;
  isVisible?: boolean;
}


export const PokemonImage = component$(( { 
  id, 
  size = 200, 
  backImage = false, 
  isVisible = true
}: Props ) => {
   
  const imageLoaded = useSignal(false);
  useTask$(({ track }) => {
    track(() => id );
    imageLoaded.value = false
  });

  const imageUrl = useComputed$(() => {
      if( id === '' ) return '';
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ backImage ? 'back/' : ''}${ id }.png`
  })
  
  return (
    <div 
      class="flex items-center justify-center"
      style={{ width: `${ size }px`, height: `${ size }px` }}
    >
      { !imageLoaded.value && <span>Cargando...</span>}
      
      <img
        style={{ width: `${size}px` }}
        src={ imageUrl.value } 
        alt="Pokemon Sprite"
        onLoad$={ () => imageLoaded.value = true }
        class={[{ 
          'hidden': !imageLoaded.value,
          'brightness-0': !isVisible
        }, 'transition-all']}
      />

      
    </div>
  )

})