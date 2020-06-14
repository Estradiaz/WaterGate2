<template>
    <v-dialog
        max-width="800"
    >
        <template #activator="{on}" >
            <v-btn text v-on="on">{{title}}</v-btn>
        </template>
        <AddDeviceStateForm
            @cancel="$emit('cancel')"
            @submit="$emit('submit', $event)"
        ></AddDeviceStateForm>
    </v-dialog>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import AddDeviceStateForm from "@/Forms/AddDeviceStateForm/index.vue";
@Component<AddDeviceStateBtn>({
    components: {
        AddDeviceStateForm
    }
})
export default class AddDeviceStateBtn extends Vue {
    @Prop({default: "AddDeviceState"}) readonly title!: string

}
</script>