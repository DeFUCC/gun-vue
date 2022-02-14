<script setup>

</script>

<template lang='pug'>
.flex.flex-col.items-center
  user-list( @user="$router.push(`/users/${$event}`)" )
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component")
</template> 