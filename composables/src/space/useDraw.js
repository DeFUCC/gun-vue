import { computed, markRaw, nextTick, reactive, ref, watch, onMounted } from 'vue'
import { createDrauu } from 'drauu'
import { toReactive, useStorage, useCycleList } from '@vueuse/core'

import { useGun, useUser } from '../'

export const draw = reactive({
  colors: [
    '#000000',
    ...new Array(12).fill(true).map((el, i) => `hsl(${i * 30}, 100%,50%)`),
    '#ffffff',
  ],
  sizes: useCycleList([4, 8, 16, 24]),
  modes: ['line', 'arrow', 'stylus', 'rectangle', 'ellipse'],
  mode: computed({
    get() {
      return _mode.value
    },
    set(v) {
      _mode.value = v
      if (v === 'arrow') {
        brush.mode = 'line'
        brush.arrowEnd = true
      }
      else {
        brush.mode = v
        brush.arrowEnd = false
      }
    },
  }),
  enabled: false,
  pinned: useStorage('drawing-pinned', false),
  canUndo: false,
  canRedo: false,
  canClear: false,
  ing: false,
  initiated: false,
  content: ''
})

export const brush = toReactive(useStorage('drawing-brush', {
  color: draw.colors[0],
  size: 10,
  mode: 'stylus',
}))

const _mode = ref('stylus')
let disableDump = false

export const drauuOptions = reactive({
  brush,
  acceptsInputTypes: computed(() => draw.enabled ? undefined : ['pen']),
  coordinateTransform: true,
})
export const drauu = markRaw(createDrauu(drauuOptions))

export function clearDrauu() {
  drauu.clear()
  draw.content = ''
}

export function loadCanvas(page) {
  disableDump = true
  if (draw.content != null)
    drauu.load(draw.content)
  else
    drauu.clear()
  disableDump = false
}

export function updateState() {
  draw.canRedo = drauu.canRedo()
  draw.canUndo = drauu.canUndo()
  draw.canClear = !!drauu.el?.children.length
}


export function useDraw() {
  if (!draw.initiated) {
    const gun = useGun()

    const drawing = gun.user().get('draw').get('space')

    drawing.once(d => {
      draw.content = d
      loadCanvas()
    })
    drauu.on('changed', () => {
      updateState()
      if (!disableDump) {
        draw.content = drauu.dump()
        drawing.put(draw.content)
      }
    })
    onMounted(() => {
      nextTick(() => {
        loadCanvas()
      })

    })

    drauu.on('start', () => draw.ing = true)
    drauu.on('end', () => draw.ing = false)

    window.addEventListener('keydown', (e) => {
      if (!draw.enabled)
        return

      const noModifier = !e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey
      let handled = true
      if (e.code === 'KeyZ' && (e.ctrlKey || e.metaKey)) {
        if (e.shiftKey)
          drauu.redo()
        else
          drauu.undo()
      }
      else if (e.code === 'Escape') {
        draw.enabled = false
      }
      else if (e.code === 'KeyC' && (e.ctrlKey || e.metaKey)) {
        clearDrauu()
      }
      else if (e.code.startsWith('Digit') && noModifier && +e.code[5] <= brushColors.length) {
        brush.color = brushColors[+e.code[5] - 1]
      }
      else {
        handled = false
      }

      if (handled) {
        e.preventDefault()
        e.stopPropagation()
      }
    }, false)
  }

  draw.initiated = true

  return {
    brush, clearDrauu, draw, drauu, loadCanvas
  }
}

