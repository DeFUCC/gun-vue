<script setup>

</script>

<template lang='pug'>
room-list.p-8(@browse="$router.push(`/rooms/${$event}`)")
</template>