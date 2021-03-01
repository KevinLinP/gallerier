<script>
  import _ from 'lodash'
  import { Photos } from '../api/photos.js'

  export let photo

  let numbers = [1, 2, 3, 4, 5]

  /* $: console.log('photo', photo) */
  $: flickrData = photo.flickrData
  $: url = flickrData.url_o || flickrData.url_l || flickrData.url_m
  $: rating = photo.rating || null

  function handleStarClick(num) {
    Photos.update(photo._id, {$set: {rating: num}})
  }

  function buttonSymbol(num, rating) {
    if (rating) {
      if (num <= rating) {
        return '★'
      } else {
        // TODO: make this exted muted
        return '☆'
      }
    } else {
      return '☆'
    }
  }

</script>

<style>
  .photo-container {
    margin-top: 5vh;
  }

  .photo {
    max-height: 90vh;
  }
</style>


{#if photo.rating}
<div class="d-flex justify-content-center w-100">
  <div>
  {#each numbers as num}
    <button class="btn btn-text fs-3 text-muted py-0" on:click={() => handleStarClick(num)}>{buttonSymbol(num, rating)}</button>
  {/each}
  </div>
</div>
{/if}

<div class="d-flex justify-content-center w-100 photo-container">
  <div>
    <img class="img-fluid photo" src={url}/>
  </div>
</div>


