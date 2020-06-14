<template>
    <v-card>
        <v-card-text>
            <v-form
                ref="form"
            >
                <v-container fill-height fluid>
                        <v-col cols="12" md="6">
                            <v-text-field
                                label="name*"
                                required
                                :rules=[uniqueName]
                                v-model="hardwareName"
                            ></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field
                                label="pins oder binaere laenge der zustaende*"
                                required
                                v-model="pinNumber"
                                type="number"
                            ></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field
                                label="IP4 to push or empty"
                                :rules="[ip4OrEmpty]"
                                v-model="ip4"
                            ></v-text-field>
                        </v-col>
                </v-container>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer />
            <v-btn @click="cancel">Cancel</v-btn>
            <v-btn @click="submit">Submit</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { Component, Mixins, Watch, Prop } from 'vue-property-decorator'
import { FormValidate } from "@/mixins/validate";
import { HardwareApi } from '../../store/HardwareApi';
import { Hardware } from '../../store/HardwareApi/types';

@Component<AddHardwareForm>({

})
export default class AddHardwareForm extends Mixins(HardwareApi, FormValidate){


    hardwareName: string = ""
    pinNumber: number = 1
    ip4: string = ""
    uniqueName(value: string){
        return !this.hardwares.some(hardware=> hardware.name== value) || `${value} already in use`
    }
    ip4OrEmpty(value: string){
        return true
    }
    clear(){
        this.hardwareName = ""
        this.pinNumber = 1
        this.ip4 = ""
    }
    cancel(){
        this.clear()
        this.$emit("cancel");
    }
    
    submit(){
        if(this.validate()){
            const hardware: Hardware = {
                name: this.hardwareName,
                pins: this.pinNumber,
                IP4: this.ip4
            }
            this.$emit("submit", )
            this.updateHardware(hardware);
        }
    }
}
</script>