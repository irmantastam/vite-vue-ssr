import { createRouter as _createRouter, createWebHistory, createMemoryHistory } from 'vue-router'

// Auto generates routes from vue files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
const pages = import.meta.glob('./pages/*.vue')

const routes = Object.keys(pages).map((path) => {
  const name = path
    .match(/\.\/pages(.*)\.vue$/)[1]
    .toLowerCase()
    .replace('page', '')
  return {
    path: name === '/home' ? '/' : name,
    component: pages[path] // () => import('./pages/*.vue')
  }
})

const createRouter = () =>
  _createRouter({
    history: import.meta.env.SSR
      ? createMemoryHistory(import.meta.env.BASE_URL)
      : createWebHistory(import.meta.env.BASE_URL),
    routes
  })

export default createRouter
