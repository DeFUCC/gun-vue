<script setup>
import { useDraw } from '#composables'

const { brush, drauu, draw } = useDraw()


function setDrawingMode(mode) {
  draw.mode = mode
  draw.enabled = true
}
function setBrushColor(color) {
  brush.color = color
  draw.enabled = true
}


</script>

<template lang="pug">
.z-10.absolute.top-4.left-4.right-4
  button.text-6xl.absolute(
    @click="draw.enabled = !draw.enabled"
    :class="{ active: draw.enabled }"
    :style="{ opacity: draw.enabled ? 0.2 : 1 }"
    )
    carbon-pen
  .flex.flex-wrap.text-xl.p-2.gap-2.justify-center.rounded-md.bg-main.shadow.transition-opacity.duration-200.dark_border.dark_border-gray-400.dark_border-opacity-10.bg-light-300.dark_bg-dark-300.bg-opacity-90(
    :class="draw.enabled ? '' : draw.pinned ? 'opacity-40 hover_opacity-90' : 'pointer-events-none'", 
    v-if="draw.enabled"
    storage-key="slidev-drawing-pos", 
    :initial-x="10", 
    :initial-y="10"
    )
    button.w-6.flex.items-center.justify-center(@click="brush.size = draw.sizes.next()")
      .bg-current.rounded-full(:style="{ width: brush.size + 4 + 'px', height: brush.size + 4 + 'px', backgroundColor: brush.color }")
    .is-group.flex.gap-2.px-2.py-1
      button(:class="{ active: draw.mode == 'stylus' }", @click="setDrawingMode('stylus')")
        carbon:pen

      button(:class="{ active: draw.mode == 'line' }", @click="setDrawingMode('line')")
        svg.-mt-1(width="1em", height="1em", preserveAspectRatio="xMidYMid meet", viewBox="0 0 24 24")
          path(d="M21.71 3.29a1 1 0 0 0-1.42 0l-18 18a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l18-18a1 1 0 0 0 0-1.42z", fill="currentColor")
      button(:class="{ active: draw.mode == 'arrow' }", @click="setDrawingMode('arrow')")
        carbon:arrow-up-right

      button(:class="{ active: draw.mode == 'ellipse' }", @click="setDrawingMode('ellipse')")
        carbon:radio-button

      button(:class="{ active: draw.mode == 'rectangle' }", @click="setDrawingMode('rectangle')")
        carbon:checkbox

    //  TODO: not sure why it's not working! 
    //
      <button class="icon-btn" :class="{ shallow: draw.mode != 'eraseLine' }" @click="setDrawingMode('eraseLine')">
        <carbon:erase />
        </button> 

    .is-group.flex.flex-wrap
      button(
        v-for="color of draw.colors", :key="color", 
        :class="brush.color === color ? 'active' : 'shallow'", 
        @click="setBrushColor(color)"
        )
        .w-6.h-6.transition-all.transform.border.border-gray-400.border-opacity-50(
          :class="brush.color !== color ? 'rounded-1/2 scale-85' : 'rounded-md'", 
          :style="draw.enabled ? { background: color } : { borderColor: color }"
          )


    button(:class="{ disabled: !draw.canUndo }", @click="drauu.undo()")
      carbon:undo
    button(:class="{ disabled: !draw.canRedo }", @click="drauu.redo()")
      carbon:redo

    button(:class="{ disabled: !draw.canClear }", @click="draw.clear()")
      carbon:delete

    button(:class="{ shallow: !draw.pinned }", @click="draw.pinned = !draw.pinned")
      carbon:pin-filled.transform.-rotate-45(v-show="draw.pinned")
      carbon:pin(v-show="!draw.pinned")


    button(v-if="draw.enabled", :class="{ shallow: !draw.enabled }", @click="draw.enabled = !draw.enabled")
      carbon:error(v-show="draw.pinned")
      carbon:close-outline(v-show="!draw.pinned")


            
            
</template>


<style lang="postcss" scoped>
button {
  transition: all 100ms ease-out;
  @apply p-0.5 transform hover_bg-opacity-0 hover_bg-dark-900;

  & svg,
  & div {
    transition: all 100ms ease-out;
    @apply transform scale-80 hover_scale-120;
  }
}

.active {
  @apply bg-opacity-50 scale-150;
}
</style>