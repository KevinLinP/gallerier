<script>
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import { Galleries } from '../api/galleries.js'
  import { Meteor } from "meteor/meteor";
  import { onMount } from 'svelte';

  // from router
  export let location

  onMount(async () => {
    Meteor.subscribe('galleries');
  });

  $: gallery = useTracker(() => Galleries.findOne({name: 'Sunsets'}));

  function handleSearch() {
    Meteor.call('galleries.search', $gallery._id)
  }
</script>


<div class="container">
  <h1>{ $gallery?.name }</h1>
</div>

<button on:click={handleSearch}>Search</button>
