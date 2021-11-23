import { db } from '@use/db'

export function useRelay() {
  const relay = reactive({
    pulse: 0,
  })
  onMounted(() => {
    db.get('relay').get('pulse').on(d=>relay.pulse = d)
  })
  onBeforeUnmount(() => {
    db.get('relay').get('pulse').off()
  })
  return relay
}

