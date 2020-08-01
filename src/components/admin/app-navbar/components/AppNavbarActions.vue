<template>
  <div class="app-navbar-actions">
    <div class="flex lg1">
      <div id="countdown">
        <div id="countdown-number">
          {{counter}}
        </div>
        <svg id="svgid">
          <circle r="18" cx="20" cy="20"></circle>
        </svg>
      </div>
    </div>
    <color-dropdown class="app-navbar-actions__item"/>
    <settings-dropdown
      :is-top-bar.sync="isTopBarProxy"
      class="app-navbar-actions__item"
    />
    <language-dropdown class="app-navbar-actions__item"/>
    <!-- <profile-dropdown class="app-navbar-actions__item app-navbar-actions__item--profile">
      <span>{{userName}}</span>
    </profile-dropdown> -->
  </div>
</template>

<script>
// import LanguageDropdown from './dropdowns/LanguageDropdown'
// import ProfileDropdown from './dropdowns/ProfileDropdown'
// import ColorDropdown from './dropdowns/ColorDropdown'
import SettingsDropdown from './dropdowns/SettingsDropdown'
import { ColorThemeMixin } from '../../../../services/vuestic-ui'

export default {
  name: 'app-navbar-actions',
  mixins: [ColorThemeMixin],
  inject: ['contextConfig'],
  mounted () {
    setInterval(() => {
      if (this.counter === 0) this.counter = 10
      this.counter--
    }, 1000)
  },
  components: {
    SettingsDropdown,
    // ColorDropdown,
    // LanguageDropdown,
    // ProfileDropdown,
  },
  props: {
    userName: {
      type: String,
      default: '',
    },
    isTopBar: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isTopBarProxy: {
      get () {
        return this.isTopBar
      },
      set (isTopBar) {
        this.$emit('update:isTopBar', isTopBar)
      },
    },
  },
  data () {
    return {
      counter: 10,
      metrics: [],
      dataset: {},
      previousData: {},
    }
  },
}
</script>

<style lang="scss">
.app-navbar-actions {
  display: flex;

  &__item {
    margin-top: 0.3rem;
    padding: 0;
    margin-left: 1.25rem;
    margin-right: 1.25rem;

    &:last-of-type {
      margin-right: 0;
    }

    &--profile {
      display: flex;
      justify-content: center;
      margin: auto 0 auto 1.25rem;
    }

    @include media-breakpoint-down(lg) {
      margin-right: 0.25rem;
    }

    @include media-breakpoint-down(sm) {
      margin-right: 0;

      &:first-of-type {
        margin-left: 0;
      }

      &--profile {
        position: absolute;
        right: 0.75rem;
        top: 1.25rem;
        height: fit-content;
        margin: auto;
      }
    }
  }
}

#countdown {
  display: inline-block;
  position: relative;
  margin: auto;
  margin-top: 5px;
  height: 40px;
  width: 40px;
  text-align: center;
}

#countdown-number {
  color: white;
  display: inline-block;
  line-height: 40px;
}

#svgid {
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  transform: rotateY(-180deg) rotateZ(-90deg);
}

svg circle {
  stroke-dasharray: 113px;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  stroke-width: 2px;
  stroke: white;
  fill: none;
  animation: countdown 10s linear infinite forwards;
}

@keyframes countdown {
  from {
    stroke-dashoffset: 0;
  }

  to {
    stroke-dashoffset: 113px;
  }
}
</style>
