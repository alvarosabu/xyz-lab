import { computed, reactive, toRefs } from 'vue'
import { RouteRecordNormalized, useRouter } from 'vue-router'

interface ExperimentsState {
  experiments: RouteRecordNormalized[]
  filter: string
}

const state: ExperimentsState = reactive({
  experiments: [],
  filter: '',
})

export function useExperiments() {
  const router = useRouter()

  const [, ...routes] = router.getRoutes()
  state.experiments = routes

  const filtered = computed(() =>
    state.experiments.filter(route => {
      const filter = state.filter.toLowerCase()
      if (filter === '') {
        return true
      }
      return (
        (route.name as string).toLowerCase().includes(filter) ||
        (route.meta.tags as string[]).some(tag =>
          tag.toLowerCase().includes(filter),
        )
      )
    }),
  )

  return {
    ...toRefs(state),
    filtered,
  }
}
