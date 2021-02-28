<script>
  import { Meteor } from "meteor/meteor";
  import { useTracker, useSession } from 'meteor/rdb:svelte-meteor-data';
  import { Session } from 'meteor/session'
  import { onMount } from 'svelte';

  import { Galleries } from '../api/galleries.js'
  import { Photos } from '../api/photos.js'
  import Photo from './Photo.svelte'

  // from router
  export let location

  onMount(async () => {
    Meteor.subscribe('galleries');
    Meteor.subscribe('photos');
  });

  let currentIndex = useSession('currentIndex', 0)

  $: gallery = useTracker(() => Galleries.findOne({name: 'Sunset Clouds'}))
  $: photos = useTracker(() => Photos.find({}, {limit: 50}).fetch())
  $: currentPhoto = $photos[$currentIndex]
  $: console.log($currentIndex, $photos, currentPhoto)

  function handleSearch() {
    Meteor.call('galleries.search', $gallery._id)
  }

  function handleFilter(min) {
    console.log(min)
  }

  function next() {
    Session.set('currentIndex', $currentIndex + 1)
  }

  const numberKeys = ['1', '2', '3', '4', '5']
  function handleKeydown(event) {
    const key = event.key

    if (numberKeys.includes(key)) {
      const num = parseInt(key)
      Photos.update(currentPhoto._id, {$set: {rating: num}})
      next()
    } else if (key == "ArrowRight") {
      next()
    } else if (key == "ArrowLeft") {
      if ($currentIndex > 0) {
        Session.set('currentIndex', $currentIndex - 1)
      }
    } else {
      /* console.log(event) */
    }
  }

  /* <div> */
  /*   <button class="btn btn-dark" on:click={handleSearch}>Search</button> */
  /* </div> */

  /* <div class="btn-group mb-5" role="group" aria-label="filter"> */
  /*   <button type="button" class="btn btn-primary" on:click={() => handleFilter(null)}>Unrated</button> */
  /*   <button type="button" class="btn btn-secondary" on:click={() => handleFilter(1)}>All Rated</button> */
  /*   <button type="button" class="btn btn-secondary" on:click={() => handleFilter(2)}>≥ 2</button> */
  /*   <button type="button" class="btn btn-secondary" on:click={() => handleFilter(3)}>≥ 3</button> */
  /*   <button type="button" class="btn btn-secondary" on:click={() => handleFilter(4)}>≥ 4</button> */
  /*   <button type="button" class="btn btn-secondary" on:click={() => handleFilter(5)}>5</button> */
  /* </div> */
</script>

<div class="container">
  <div class="mb-5">
  {#if currentPhoto}
    <Photo photo={currentPhoto} />
  {/if}
  </div>
</div>

{#if !currentPhoto}
  { $gallery?.searchText }
  <button class="btn btn-dark" on:click={handleSearch}>Search</button>
{/if}

<svelte:window on:keydown={handleKeydown}/>
