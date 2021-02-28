<script>
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import { Galleries } from '../api/galleries.js'
  import { Meteor } from "meteor/meteor";
  import { onMount } from 'svelte';
  import _ from 'lodash'

  export let location

  onMount(async () => {
    Meteor.subscribe('galleries');
  });

  let name = "";
  let searchText = "";

  async function handleCreate(event) {
    name = _.trim(name)

    try {
      await Galleries.insert({
        name,
        searchText,
        createdAt: new Date()
      });

      // Clear form
      name = "";
      searchText = "";
    } catch (error) {
      console.log(error)
    }
  };

  $: galleries = useTracker(() => Galleries.find({}, {sort: {name: 1}}).fetch());
</script>

<div class="container pt-5">
  <table class="mb-4">
    <thead>
      <tr>
        <th>_id</th>
        <th>name</th>
        <th>searchText</th>
        <th>createdAt</th>
      </tr>
    </thead>
  {#each $galleries as galleries}
    <tr>
      <td class="pe-4">{ galleries._id.toHexString() }</td>
      <td class="pe-4">{ galleries.name }</td>
      <td class="pe-4">{ galleries.searchText}</td>
      <td class="pe-4">{ galleries.createdAt }</td>
    </tr>
  {/each}
  </table>

  <form on:submit|preventDefault={handleCreate}>
    <input
      type="text"
      placeholder="gallery name"
      bind:value={name}
    />

    <input
      type="text"
      placeholder="searchText"
      bind:value={searchText}
    />

    <input type="submit" class="btn btn-secondary btn-sm"/>
  </form>

</div>

