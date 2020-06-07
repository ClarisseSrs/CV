import Vue from 'vue'
import App from './App.vue'

// Bootstrap Vue
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

// Font Awesome Vue
import {
  faLinkedin, faGitlab, faFacebook, faJava, faPython, faVuejs, faCss3Alt, faJsSquare, faHtml5, faNodeJs,
  faAngular, faWordpress, faYarn, faUnity, faWindows, faLinux
} from '@fortawesome/free-brands-svg-icons'
import { faTrophy, faCheck, faMinusSquare, faPlusSquare, faAdjust } from '@fortawesome/free-solid-svg-icons'
import { faSun, faMoon } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { dom, library } from '@fortawesome/fontawesome-svg-core'

dom.watch()

library.add(faLinkedin, faGitlab, faFacebook, faJava, faPython, faVuejs, faCss3Alt, faJsSquare, faHtml5, faNodeJs,
  faAngular, faWordpress, faYarn, faUnity, faWindows, faLinux, faTrophy, faCheck, faMinusSquare, faPlusSquare, faAdjust, faSun, faMoon)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Main SCSS File
import '@/assets/scss/resume.scss'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
