<template>
    <v-dialog v-model="dialog">
        <template #activator="{on}">
            <v-btn text v-on="on">
                {{ title }}                
            </v-btn>
        </template>
        <AddDeviceForm 
            @cancel="$emit('cancel');dialog=false"
            @submit="$emit('submit', $event);dialog=false"
        ></AddDeviceForm>
    </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Mixins, Prop } from 'vue-property-decorator'
import { DeviceApi } from "../../store/DeviceApi";
import AddDeviceForm from "@/Forms/AddDeviceForm/index.vue";

@Component<AddDeviceBtn>({
    components: {
        AddDeviceForm
    }
})
export default class AddDeviceBtn extends Mixins(DeviceApi){
    @Prop({default: "Add-Device-Btn"}) readonly title!: string
    dialog: boolean = false
}
</script>