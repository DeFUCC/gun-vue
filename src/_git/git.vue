<script setup>
import { ref } from 'vue';

import GitRepos from '../components/git/GitRepos.vue';
import GitRepo from '../components/git/GitRepo.vue'

const id = ref('')

</script>

<template lang="pug">
.flex.flex-col.gap-4
    GitRepos(@repo="id = $event" :id)
    GitRepo(:id :key="id" v-if="id")


</template>
