<template>
    <v-card>
        <v-card-text>
            <v-form ref="form">
                <v-container fluid>
                    <v-col cols="12" md="6">
                        <v-text-field
                            label="DeviceName"
                            v-model="deviceName"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-select
                            :items="hardwares"
                            item-text="name"
                            item-value="_id"
                            v-model="hardware"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            label="Simultan aktive Pins"
                            v-model="simPins"
                            type="number"
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field
                            label="pull inteval [ms]"
                            v-model="pullInterval"
                            type="number"
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
import {Vue, Mixins, Component} from 'vue-property-decorator'
import { HardwareApi } from '../../store/HardwareApi';
import { FormValidate } from '../../mixins/validate';
import { Device, PinState } from '../../store/DeviceApi/types';
import { DeviceApi } from '../../store/DeviceApi';
@Component<AddDeviceForm>({

})
export default class AddDeviceForm extends Mixins(HardwareApi, FormValidate, DeviceApi){
    simPins: number = 1
    pullInterval: number = 60000
    deviceName: string = ""
    hardware: string = ""
    get selectedHardware(): {pins: number}{
        return  this.hardwares.find(hw => hw._id == this.hardware) || {pins: 0}
    }
    clear(){
        this.simPins = 1;
        this.pullInterval = 60000;
        this.deviceName = ""
        this.hardware = ""
    }
    cancel(){
        this.clear()
        this.$emit("cancel")
    }
    submit(){
        if(this.validate()){

            const state: PinState = {}
            for(let pin = 0; pin < this.selectedHardware.pins; pin++){
                state[pin] = false
            } 
            const device: Device = {
                name: this.deviceName,
                hardware: this.hardware,
                simPins: this.simPins,
                pullInterval: this.pullInterval,
                state
            }
            this.updateDevice(device)
            this.$emit("submit", device);
        }
    }
}
</script>