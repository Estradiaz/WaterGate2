<template>
    <v-container>
        <v-system-bar>
            <v-spacer />
            <v-toolbar-items>
                <AddHardwareBtn />
            </v-toolbar-items>
        </v-system-bar>
        <v-data-table
            :items="hardwares"
            :headers="headers"
        >
            <template
                #item.actions="{item}"
            >
                <v-dialog v-model="editDialog">
                    <template #activator="{on}">
                        <v-btn small icon v-on="on">e</v-btn>
                    </template>
                    <AddHardwareForm :hardware="item" @cancel="editDialog=false"/>
                </v-dialog>
                <RemoveDialogBtn :item="item" @remove="removeHardware" />
            </template>
        </v-data-table>
    </v-container>
</template>


<script lang="ts">
import {Vue, Component, Mixins} from 'vue-property-decorator'
import { HardwareApi } from "@/store/HardwareApi";
import AddHardwareBtn from "@/Buttons/AddHardwareBtn/index.vue";
import RemoveDialogBtn from "@/Buttons/RemoveDialogBtn/index.vue"
import { Hardware } from '../store/HardwareApi/types';
import { capitalizeFirst } from '../utils';
@Component<HardwareView>({
    components: {
        AddHardwareBtn,
        RemoveDialogBtn
    }
})
export default class HardwareView extends Mixins(HardwareApi){
    editDialog: boolean = false
    removeDialog: boolean = false
    get headers(){
        return (['name', 'pins', "IP4"] 
        // as Array<keyof Hardware>
        )
        .map(value => ({
            text: capitalizeFirst(value),
            value,
            sortable: true
        })).concat([{
            text: "Actions",
            value: "actions",
            sortable: false
        }])
    }
}
</script>