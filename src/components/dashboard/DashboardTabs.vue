<template>
  <va-card :title="$t('dashboard.setupRemoteConnections')">
    <va-tabs grow v-model="tabsState">
      <va-tab>
        {{$t('dashboard.tabs.overview.title')}}
      </va-tab>
      <va-tab>
        {{$t('dashboard.tabs.billingAddress.title')}}
      </va-tab>
    </va-tabs>
    <va-separator/>
    <component :is="tabs[tabsState]" @submit="submit"/>
  </va-card>
</template>

<script>
import OverviewTab from './dashboard-tabs/OverviewTab'
import BillingAddressTab from './dashboard-tabs/BillingAddressTab'

export default {
  name: 'DashboardTabs',
  components: {
    OverviewTab,
    BillingAddressTab,
  },
  data () {
    return {
      tabsState: 1,
      tabs: [
        'OverviewTab',
        'BillingAddressTab',
      ],
    }
  },
  methods: {
    submit (data) {
      this.$emit('submit', data)
    },
  },
}
</script>
