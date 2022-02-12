<script setup>

</script>

<template lang='pug'>
.flex.flex-col.items-center
  router-link.px-4.py-4.bg-light-900.font-bold.w-full.text-center(to="/users/") Public space users
  user-list( @user="$router.push(`/users/${$event}`)" )
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component")
</template> 