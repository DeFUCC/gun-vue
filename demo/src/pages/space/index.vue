<script setup>

</script>

<template lang='pug'>
.p-2
  space-plane.rounded-xl.overflow-hidden.shadow-xl.bg-light-100(@user="$router.push('/users/' + $event)")
</template>