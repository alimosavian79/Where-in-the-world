import { createRouter, createWebHistory } from 'vue-router'
import Placeholder from './components/common/Placeholder.vue'

const router = new createRouter({
    history: createWebHistory(),
    linkActiveClass: 'open active',
    scrollBehavior: () => ({ y: 0, top: 0 }),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('./components/Homepage/Homepage.vue'),
            props: (route) => ({
                searchValue: route.query.searchValue || null,
                filteredRegion: route.query.filteredRegion || null,
                ChoosenSort: route.query.ChoosenSort || null
            }),
        },
        {
            path: '/country',
            name: 'country',
            component: () => import('./components/Country/Countrypage.vue'),
            props: (route) => ({ countryName: route.query.name || null, countryCode: route.query.code || null }),
            meta: { title: 'Detail' }
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            params: { pathMatch: ['not', 'found'] },
            component: <Placeholder hasError title="Not Found" />,
            meta: { title: 'Not Found' }
        }
    ]
})

router.afterEach(to => {
    setTimeout(() => {
        document.title = 'Countries'
        if (to.meta && to.meta.title) {
            document.title += ' | ' + to.meta.title
        }
    }, 0)
})
export default router
