## Components

Pluggable Gun DB + Vue UI components

### User icon

<LoadComponent component="UserIcon" :props="{size:60}" />

### Page comments

<LoadComponent component="FeedBlock" />

<script setup>
import '@gun-vue/components/dist/style.css'
import LoadComponent from '../.vitepress/components/load-component.vue'
</script>
