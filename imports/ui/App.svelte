<script>
  import { Router, Link, Route } from "svelte-routing";
  import Gallery from './Gallery.svelte'
  /* import User from './User.svelte' */

  export let url = "";
  /* <Route path="/user" component="{User}" /> */
</script>

<Router url="{url}">
  <div>
    <Route path="/" component="{Gallery}" />
  </div>
</Router>
