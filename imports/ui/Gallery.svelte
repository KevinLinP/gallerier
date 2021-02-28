<script>
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import { Galleries } from '../api/galleries.js'
  import { Photos } from '../api/photos.js'
  import { Meteor } from "meteor/meteor";
  import { onMount } from 'svelte';

  // from router
  export let location

  onMount(async () => {
    Meteor.subscribe('galleries');
    Meteor.subscribe('photos');
  });

  $: gallery = useTracker(() => Galleries.findOne({name: 'Sunsets'}));
  $: photos = useTracker(() => Photos.find({}, {limit: 50}).fetch());

  function handleSearch() {
    Meteor.call('galleries.search', $gallery._id)
  }

  function handleFilter(min) {
    console.log(min)
  }
</script>


<div class="container">
  <div class="mb-5">
    <h1 class="display-1">{ $gallery?.name }</h1>
  </div>

  <div class="btn-group mb-5" role="group" aria-label="filter">
    <button type="button" class="btn btn-primary" on:click={() => handleFilter(null)}>Unrated</button>
    <button type="button" class="btn btn-secondary" on:click={() => handleFilter(1)}>All Rated</button>
    <button type="button" class="btn btn-secondary" on:click={() => handleFilter(2)}>≥ 2</button>
    <button type="button" class="btn btn-secondary" on:click={() => handleFilter(3)}>≥ 3</button>
    <button type="button" class="btn btn-secondary" on:click={() => handleFilter(4)}>≥ 4</button>
    <button type="button" class="btn btn-secondary" on:click={() => handleFilter(5)}>5</button>
  </div>

  <div class="mb-5">
  {#each $photos as photo}
    <img src={photo.flickrData.url_sq} width={photo.flickrData.width_sq} height={photo.flickrData.height_sq}/>
  {/each}
  </div>

  <div>
    <button class="btn btn-dark" on:click={handleSearch}>Search</button>
  </div>
</div>
