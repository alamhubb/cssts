import {ref} from 'vue';
import "virtual:cssts.css";
import {cssts} from "cssts-ts";
import {csstsAtom} from "virtual:csstsAtom";
defineProps<{ msg: string }>();
const count = ref(0);
const cardStyle = cssts.$cls(csstsAtom.padding20px,csstsAtom.borderRadius8px);
