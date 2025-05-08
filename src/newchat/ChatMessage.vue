<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { selectedUser, useUser, getFirstEmoji, useMd } from '../composables'
import { AccountBadge, TorrentDownload } from '../components'

type MetaSeg = { content: string; type: 'normal' | 'think' | 'about' }

const props = defineProps({
  index: { type: Number, default: 0 },
  source: {
    type: Object as () => { author: string; timestamp: string; text: string },
    default: () => ({ author: '', timestamp: '', text: 'empty' })
  }
})

const md = useMd()
const { user } = useUser()

const dateTime = computed(() => {
  if (!props.source.timestamp) return
  const ts = Number(props.source.timestamp)
  const d = new Date(ts)
  return {
    date: d.toLocaleDateString('en-CA'),
    time: d.toLocaleTimeString('ru-RU')
  }
})

const isMe = computed(() => props.source.author === user.pub)
const fresh = ref(true)

onMounted(() => {
  if (props.index > 1) {
    const prev = document.getElementById(`chat-${props.index - 1}`)?.dataset.pub
    if (prev === props.source.author) fresh.value = false
  }
})

function parseMetaSegments(text = ''): MetaSeg[] {
  const regex = /<(think|about)>([\s\S]*?)<\/\1>/g
  const segs: MetaSeg[] = []
  let lastIndex = 0, m: RegExpExecArray | null
  while ((m = regex.exec(text)) !== null) {
    if (m.index > lastIndex) {
      segs.push({ type: 'normal', content: text.slice(lastIndex, m.index) })
    }
    segs.push({ type: m[1] === 'think' ? 'think' : 'about', content: m[2] })
    lastIndex = m.index + m[0].length
  }
  if (lastIndex < text.length) {
    segs.push({ type: 'normal', content: text.slice(lastIndex) })
  }
  return segs
}

// Helper to detect base64 image
function isBase64Image(content: string): boolean {
  return /^data:image\/[a-zA-Z]+;base64,/.test(content)
}
</script>

<template>
  <div
    class="chat-message"
    :style="{ alignItems: isMe ? 'flex-end' : 'flex-start' }"
  >
    <div
      v-if="fresh"
      class="chat-meta"
      :id="`chat-${index}`"
      :data-pub="source.author"
      :style="{ flexDirection: isMe ? 'row-reverse' : 'row' }"
    >
      <AccountBadge
        class="account-badge"
        :pub="source.author"
        :show-name="true"
        :size="20"
        @click="selectedUser.pub = source.author"
      />
      <div class="timestamp">{{ dateTime?.time }}</div>
      <div class="spacer"></div>
      <div class="timestamp">{{ dateTime?.date }}</div>
    </div>

    <div
      class="message-bubble"
      :style="{
        borderTopLeftRadius: isMe ? '12px' : '0',
        borderTopRightRadius: isMe ? '0' : '12px'
      }"
    >
      <template v-for="(seg, i) in parseMetaSegments(source.text)" :key="i">
        <!-- about block -->
        <div
          v-if="seg.type === 'about'"
          class="about-block"
          :class="isMe ? 'about-own' : 'about-other'"
        >
          {{ seg.content }}
        </div>

        <!-- think block -->
        <div
          v-else-if="seg.type === 'think'"
          class="think-block"
          :class="isMe ? 'think-own' : 'think-other'"
        >
          {{ seg.content }}
        </div>

        <!-- image detection: base64 -->
        <img
          v-else-if="seg.type === 'normal' && isBase64Image(seg.content)"
          :src="seg.content"
          class="image-content"
        />

        <!-- TorrentDownload for file links -->
        <TorrentDownload
          v-else-if="seg.type === 'normal' && seg.content.includes('#/files/')"
          :id="seg.content.split('#/files/')[1].slice(0, 40)"
        />

        <!-- emoji only -->
        <div
          v-else-if="seg.type === 'normal' && seg.content === getFirstEmoji(seg.content)"
          class="emoji"
        >
          {{ seg.content }}
        </div>

        <!-- default markdown -->
        <div
          v-else
          class="markdown-body"
          v-html="md.render(seg.content)"
        ></div>
      </template>
    </div>
  </div>
</template>

<style scoped>

.chat-message {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 4px 0;
  gap: 4px;
  overflow: hidden;
}

.chat-meta {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 8px;
  gap: 8px;
}

.account-badge {
  opacity: 0.5;
  transition: opacity 0.2s;
  cursor: pointer;
}
.account-badge:hover {
  opacity: 0.9;
}

.timestamp {
  font-size: 0.875rem;
  opacity: 0.6;
  transition: opacity 0.2s;
  cursor: default;
  color: #000;
}
.dark-mode .timestamp {
  color: #ccc;
}

.spacer { flex: 1; }

.message-bubble {
  padding: 4px 8px;
  background-color: #868686;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  max-width: 80%;
  word-break: break-all;
}
.dark-mode .message-bubble {
  background-color: rgba(55, 55, 55, 0.2);
}

/* about / think blocks */
.about-block {
  position: relative;
  align-self: start;
  padding: 12px;
  margin-bottom: 4px;
  border-radius: 20px;
  font-style: italic;
  font-size: 0.875rem;
  white-space: pre-wrap;
  background: rgb(1, 255, 238);
  color: #333;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
}
.about-own { right: 23px; top: -7px; left: auto; transform: none; }
.about-other { left: 23px; top: -7px; right: auto; transform: none; }

.think-block {
  position: relative;
  align-self: start;
  padding: 12px;
  margin-bottom: 4px;
  border-radius: 20px;
  font-style: italic;
  font-size: 0.875rem;
  white-space: pre-wrap;
  background: #333;
  color: #fff;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
}
.think-own { right: 23px; top: -7px; left: auto; transform: none; }
.think-other { left: 23px; top: -7px; right: auto; transform: none; }

/* image content */
.image-content {
  display: block;
  max-width: 80%;
  max-height: 300px;
  border-radius: 8px;
  object-fit: cover;
  margin: 4px 0;
}

.emoji { line-height: 1; text-align: center; }

.markdown-body p { margin: 0; }
</style>
