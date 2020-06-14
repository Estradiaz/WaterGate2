<template>
    <v-card>
        <v-card-text>
            <v-form
                ref="form"
            >
                <v-container 
                    fill-height 
                    fluid
                >
                        <v-col cols="12" md="6">
                            <v-text-field
                                label="name*"
                                required
                                :rules="[uniqueName]"
                                v-model="deviceStateName"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6"
                        >
                            <v-select
                                label="Device*"
                                required
                                :items="devices"
                                no-data-text="Add Device First"
                                item-text="name"
                                item-value="_id"
                                v-model="selectedDeviceId"
                            ></v-select>
                        </v-col>
                        <v-col
                            cols="6" md="3"
                            v-for="pin in pins"
                            :key="`Pin-${pin.index}`"
                        >
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field
                                        :label="`Pin-${pin.index} alias`"
                                        v-model="pin.alias"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-checkbox
                                        v-model="pin.state"
                                        :rules="[maxPins]"
                                        @change="validate"
                                    ></v-checkbox>
                                </v-col>
                            </v-row>
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
import { DeviceStateApi } from '../../store/DeviceStateApi'
import { FormValidate } from "@/mixins/validate";
import { DeviceApi } from '../../store/DeviceApi';
import { Device, PinState } from '../../store/DeviceApi/types';
import { DeviceState } from '../../store/DeviceStateApi/types';
import { HardwareApi } from '../../store/HardwareApi';
import { Hardware } from '../../store/HardwareApi/types';

@Component<AddDeviceStateForm>({

})
export default class AddDeviceStateForm extends Mixins(DeviceStateApi, FormValidate, DeviceApi, HardwareApi){


    get localDevices(){
        if(this.deviceState && typeof this.deviceState.device == "string"){
            throw new Error(`deviceState.device - ${this.deviceState.device}`)
        } 
        return this.deviceState && [this.deviceState.device as Device] || this.devices
    }
    @Prop({required: false, type: Object}) readonly deviceState!: DeviceState

    uniqueName(name: string){
        return !this.deviceStates.some(state=> state.name == name) || `${name} ist schon vergeben.`
    }
    selectedDeviceId_: string = ""
    get selectedDeviceId(): string {
        let d = this.deviceState && typeof this.deviceState.device != "string" && this.deviceState.device._id || this.selectedDeviceId_
        console.log("get d", d)
        return d
    }
    set selectedDeviceId(value: string){
        console.log("set", value)
        this.selectedDeviceId_ = value
    }
    getSelectedDevice(deviceId: string): Device | null{
        return this.devices.find(device => device._id == deviceId) || null
    }
    pins: Array<{index: number, alias: string, state: boolean}> = []
    @Watch("selectedDeviceId")
    setPins(deviceId: string, oldDeviceId: string){

        
        if(deviceId == oldDeviceId) return;
        if(deviceId == ""){
            this.pins = []
            return;
        }
        let device = this.getSelectedDevice(deviceId);
        console.log("setPins", deviceId, device)
        if(device == null) return;
        let hwPins: number = 0
        if(device.hardware)
        if(typeof device.hardware == "string"){
            const d = device
            hwPins = (this.hardwares.find(hw => hw._id == d.hardware) as Hardware).pins
        }
        else {
            hwPins = device.hardware.pins
        }
        // let pins: Array<{index: number, alias: string, state: boolean}> = []
        for(let i=0; i < hwPins; i++){
            this.pins.push({
                index: i,
                alias: `Pin-${i}`,
                state: false
            })
        }
        // console.log("pins", pins)
        // this.$set(this, "pins", pins);
    }
    maxPins(value: any){
        const device =this.getSelectedDevice(this.selectedDeviceId)
        return device && 
        (
            (Object.values(this.pins).filter(x=>x.state).length <= +device.simPins) || 
            `Limit is ${device.simPins}`
        ) || true
    }
    deviceStateName: string = ""

    cancel(){
        this.selectedDeviceId = ""
        this.deviceStateName = ""
        this.$emit("cancel");
    }
    
    submit(){
        if(this.validate()){

            const state: PinState = {}
            this.pins.forEach(pin => {
                state[`${pin.index}`] = pin.state
            })
            const deviceState: DeviceState = {
                name: this.deviceStateName,
                device: this.selectedDeviceId,
                state: state
            }
            this.$emit("submit", deviceState)
            this.updateDeviceState(deviceState);
        }
    }
}
</script>