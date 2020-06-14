<template>
    <v-dialog v-model="dialog">
        <template #activator="{on}">
            <v-btn text v-on="on">{{title}}</v-btn>
        </template>
        <AddJobForm
            @cancel="$emit('cancel');dialog=false"
            @submit="$emit('submit', $event);dialog=false"
        >
        </AddJobForm>
    </v-dialog>
</template>

<script lang="ts">
import { Mixins, Component, Prop } from 'vue-property-decorator';
import { DeviceApi } from "../../store/DeviceApi";
import { JobsApi } from "../../store/JobsApi";
import { Device, PinState } from '../../store/DeviceApi/types';
import AddJobForm from "@/Forms/AddJobForm/index.vue";

@Component<AddJobBtn>({
    components: {
        AddJobForm
    }
})
export default class AddJobBtn extends Mixins(DeviceApi, JobsApi){
    @Prop({default: "ADD-JOB-BTN"}) readonly title!: string
    dialog: boolean = false
}
</script>