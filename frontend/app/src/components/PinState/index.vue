<template>
    <v-form ref="form">
        <v-row>
            <v-col cols="12">
                <v-row v-if="title">
                    <v-col>
                        {{title}}
                        <a @click="selectAll">select all</a>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                        v-for="i of numPins"
                        :key="i"
                    >
                        <v-checkbox 
                            :label="`Pin-${i}`"
                            ref="pin"
                            :rules="[maxPin]"
                            v-model="pinState_[''+i]"
                            @change="validate"
                        />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-form>
</template>

<script lang="ts">
import {Vue, Component, Mixins, Prop, Watch} from 'vue-property-decorator'
import { PinState } from '../../store/DeviceApi/types';
@Component<PinStateComponent>({
    mounted(){

    }
})
export default class PinStateComponent extends Mixins() {

    @Prop({default: ""}) readonly title!: string
    @Prop() readonly numPins!: number
    @Prop() readonly simPins!: number
    @Prop() readonly pinState!:PinState

    @Watch("numPins", {immediate: true})
    updatePinStateReactivity(){
        for(let i = 1;i <= +this.numPins; i++){
            this.$set(this.ps_, i + "", this.pinState[i+""] || false);
        }
        this.updatePinState(this.ps_)
    }

    ps_: PinState = {}
    get pinState_(): PinState{ 
        this.updatePinStateReactivity();
        console.log("get", JSON.stringify(this.ps_), JSON.stringify(this.pinState))
        return this.ps_
    }
    set pinState_(value){
        console.log("set", value)
        Object.assign(this.ps_, value)
    }
    @Watch("ps_", {deep: true})
    updatePinState(pinState: PinState){

        console.log("watch", 
            JSON.stringify(pinState), 
            JSON.stringify(this.pinState)
        )
        let values = Object.entries(this.pinState)
        let dontUpdate = Object.entries(pinState).every(entry => {
            let index = values.findIndex(v => v[0]==entry[0] && v[1] == entry[1])
            if(index >= 0){
                values.splice(index, 1);
                return true
            }
            return false
        })
        if(!dontUpdate)
        this.$emit("update:pinState", Object.assign({}, pinState))
    }
    isValid: boolean = true
    validate(){
        //@ts-ignore
        this.isValid = this.$refs.form.validate()
    }
    maxPin(state: boolean){
        
        return Object.values(this.pinState).filter(s => s).length <= +this.simPins || `Max ${this.simPins} simultanous`
    }
    selectAll(){

        for(let state in this.pinState_){
            this.pinState_[state] = true
        }
    }
} 
</script>

