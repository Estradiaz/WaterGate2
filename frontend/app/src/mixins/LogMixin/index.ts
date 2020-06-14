import { Component, Mixins, Watch } from "vue-property-decorator";

@Component<LogMixin>({

    
})
export class LogMixin extends Mixins(){

    @Watch("$route.fullPath")
    updatePathLog(){
        fetch("/rest/log");
    }
}