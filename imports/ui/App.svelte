<script>
  import { Router, Link, Route } from "svelte-routing";
  import Gallery from './Gallery.svelte'
  import AllGalleries from './AllGalleries.svelte'
  import User from './User.svelte'

  export let url = "";
</script>

<Router url="{url}">
  <div>
    <Route path="/all" component="{AllGalleries}" />
    <Route path="/user" component="{User}" />
    <Route path="/" component="{Gallery}" />
  </div>
</Router>
