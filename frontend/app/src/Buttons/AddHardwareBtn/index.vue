<template>
    <v-dialog v-model="dialog">
        <template #activator="{on}">
            <v-btn text v-on="on" v-bind="$attrs">{{title}}</v-btn>
        </template>
        <AddHardwareForm 
            @cancel="$emit('cancel');dialog=false"
            @submit="$emit('submit',$event);dialog=false"
        />
    </v-dialog>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import AddHardwareForm from "@/Forms/AddHardwareForm/index.vue";
@Component({
    components: {
        AddHardwareForm
    }
})
export default class extends Vue{
    @Prop({default: "Add-Hardware-Btn"}) readonly title!: string
    dialog: boolean = false
}
</script>