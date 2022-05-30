import { ref } from "vue";


const questSidebar = ref(false)
const watchMapClick = ref(false)
const questForm = ref(false)

export const toggleQuestSidebar = () => questSidebar.value = !questSidebar.value
export const getQuestSidebar = () => questSidebar

export const toggleWatchMapClick = () => watchMapClick.value = !watchMapClick.value
export const getWatchMapClick  = () => watchMapClick

export const toggleQuestForm = () => questForm.value = !questForm.value
export const getQuestForm  = () => questForm

