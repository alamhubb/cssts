import {ref} from 'vue';
import {cssts} from 'cssts-ts';
import "virtual:cssts.css";
import {csstsAtom} from "virtual:csstsAtom";
const count = ref(0);
const cardStyle = cssts.$cls(csstsAtom.padding20px,csstsAtom.borderRadius8px);
