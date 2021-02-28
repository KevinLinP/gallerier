<script>
  import _ from 'lodash'
  import { Photos } from '../api/photos.js'

  export let photo

  let numbers = [1, 2, 3, 4, 5]

  /* $: console.log('photo', photo) */
  $: flickrData = photo.flickrData
  $: url = flickrData.url_o
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

<div class="d-flex justify-content-center w-100 mb-2">
  <div>
  {#each numbers as num}
    <button class="btn btn-text fs-3 text-muted py-0" on:click={() => handleStarClick(num)}>{buttonSymbol(num, rating)}</button>
  {/each}
  </div>
</div>

<div class="d-flex justify-content-center w-100 mb-3">
  <div class="w-100">
    <img class="img-fluid" src={url}/>
  </div>
</div>


