import Vue from 'vue'
import Router from 'vue-router'
import AppLayout from '../components/admin/AppLayout'

Vue.use(Router)

const EmptyParentComponent = {
  template: '<router-view></router-view>',
}

const demoRoutes = []

export default new Router({
  mode: process.env.VUE_APP_ROUTER_MODE_HISTORY === 'true' ? 'history' : 'hash',
  routes: [
    ...demoRoutes,
    {
      path: '*',
      redirect: { name: 'dashboard' },
    },
    {
      path: '/404',
      component: EmptyParentComponent,
      children: [
        {
          name: 'not-found-advanced',
          path: 'not-found-advanced',
          component: () => import('../components/pages/404-pages/VaPageNotFoundSearch.vue'),
        },
        {
          name: 'not-found-simple',
          path: 'not-found-simple',
          component: () => import('../components/pages/404-pages/VaPageNotFoundSimple.vue'),
        },
        {
          name: 'not-found-custom',
          path: 'not-found-custom',
          component: () => import('../components/pages/404-pages/VaPageNotFoundCustom.vue'),
        },
        {
          name: 'not-found-large-text',
          path: '/pages/not-found-large-text',
          component: () => import('../components/pages/404-pages/VaPageNotFoundLargeText.vue'),
        },
      ],
    },
    {
      name: 'Admin',
      path: '/admin',
      component: AppLayout,
      children: [
        {
          name: 'dashboard',
          path: 'dashboard',
          component: () => import('../components/dashboard/Dashboard.vue'),
          default: true,
        },
        {
          name: 'ui',
          path: 'ui',
          component: EmptyParentComponent,
          children: [
            {
              name: 'typography',
              path: 'typography',
              component: () => import('../components/ui/typography/Typography.vue'),
            },
            {
              name: 'buttons',
              path: 'buttons',
              component: () => import('../components/ui/buttons/Buttons'),
              meta: {
                wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Buttons',
              },
            },
            {
              name: 'rating',
              path: 'rating',
              component: () => import('../components/ui/rating/Rating'),
              meta: {
                wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Rating',
              },
            },
            {
              name: 'color-pickers',
              path: 'color-pickers',
              component: () => import('../components/ui/color-pickers/ColorPickers'),
              meta: {
                wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Color-Pickers',
              },
            },
            {
              name: 'timelines',
              path: 'timelines',
              component: () => import('../components/ui/timelines/Timelines'),
              meta: {
                wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Timelines',
              },
            },
            {
              path: 'icons',
              component: () => import('../components/ui/icons/Icons'),
              children: [
                {
                  name: 'icon-sets',
                  path: '', // Default route
                  component: () => import('../components/ui/icons/SetsList'),
                  meta: {
                    wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Icons',
                  },
                },
                {
                  name: 'icon-set',
                  path: ':name',
                  component: () => import('../components/ui/icons/IconSet'),
                  props: true,
                  meta: {
                    wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Icons',
                  },
                },
              ],
            },
            {
              name: 'spinners',
              path: 'spinners',
              component: () => import('../components/ui/spinners/Spinners'),
            },
            {
              name: 'grid',
              path: 'grid',
              component: () => import('../components/ui/grid/Grid'),
            },
            {
              name: 'modals',
              path: 'modals',
              component: () => import('../components/ui/modals/Modals'),
              meta: {
                wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Modals',
              },
            },
            {
              name: 'cards',
              path: 'cards',
              component: () => import('../components/ui/cards/Cards'),
              meta: {
                wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Cards',
              },
            },
            {
              name: 'chips',
              path: 'chips',
              component: () => import('../components/ui/chips/Chips'),
              meta: {
                wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Chips',
              },
            },
            {
              name: 'tree-view',
              path: 'tree-view',
              component: () => import('../components/ui/tree-view/TreeView'),
              meta: {
                wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Tree-view',
              },
            },
            {
              name: 'collapses',
              path: 'collapses',
              meta: {
                wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Collapse',
              },
              component: () => import('../components/ui/collapse/Collapses'),
            },
            {
              name: 'colors',
              path: 'colors',
              component: () => import('../components/ui/colors/Colors'),
            },
            {
              name: 'spacing',
              path: 'spacing',
              component: () => import('../components/ui/spacing/Spacing'),
            },
            {
              name: 'sliders',
              path: 'sliders',
              component: () => import('../components/ui/sliders/Sliders'),
              meta: {
                wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Sliders',
              },
            },
            {
              name: 'popovers',
              path: 'popovers',
              component: () => import('../components/ui/popovers/Popovers'),
            },
            {
              name: 'tabs',
              path: 'tabs',
              component: () => import('../components/ui/tabs/Tabs'),
              meta: {
                wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Tabs',
              },
            },
            {
              name: 'lists',
              path: 'lists',
              component: () => import('../components/lists/Lists.vue'),
              meta: {
                wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Lists',
              },
            },
          ],
        },
        {
          name: 'pages',
          path: 'pages',
          component: EmptyParentComponent,
          children: [
            {
              name: '404-pages',
              path: '404-pages',
              component: () => import('../components/pages/404-pages/404PagesPage'),
            },
          ],
        },
      ],
    },
  ],
})
