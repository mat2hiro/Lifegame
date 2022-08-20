import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faArrowPointer,
  faArrowRight,
  faChevronDown,
  faChevronUp,
  faCircleInfo,
  faCircleQuestion,
  faCircleUp,
  faEraser,
  faForward,
  faForwardStep,
  faMinus,
  faPause,
  faPen,
  faPlay,
  faPlus,
  faShuffle,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

export default defineNuxtPlugin((nuxtApp) => {
  library.add(
    faCircleInfo,
    faCircleUp,
    faArrowPointer,
    faCircleQuestion,
    faChevronDown,
    faChevronUp,
    faPlus,
    faMinus,
    faPlay,
    faPause,
    faForwardStep,
    faTrashCan,
    faShuffle,
    faForward,
    faPen,
    faEraser,
    faArrowRight
  );
  nuxtApp.vueApp.component("fa-icon", FontAwesomeIcon as any);
});
