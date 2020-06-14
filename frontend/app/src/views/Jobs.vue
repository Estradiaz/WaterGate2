<template>
    <v-container>
        <v-system-bar>
            <v-toolbar-title class="mr-2 ml-2">
                Jobs
            </v-toolbar-title>
            <v-spacer />
            <v-toolbar-items>
                <AddJobBtn title="add"/>
            </v-toolbar-items>
        </v-system-bar>
        <v-data-table
            :items="jobs"
            :headers="headers"
            class="ma-5"
            dense
        >
            <template #item.actions="{item}">
                <v-btn icon small @click="edit(item)">E</v-btn>
                <RemoveDialogBtn :item="item" @remove="removeJob($event)" />
            </template>

        </v-data-table>
    </v-container>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator'
import { JobsApi } from "../store/JobsApi";
import AddJobBtn from "../Buttons/AddJobBtn/index.vue";
import RemoveDialogBtn from "@/Buttons/RemoveDialogBtn/index.vue";
import { DeviceStateApi } from '../store/DeviceStateApi';
import { DeviceState } from '../store/DeviceStateApi/types';
import { Job, JobDocument } from '../store/JobsApi/types';

@Component<JobsView>({
    components: {
        AddJobBtn,
        RemoveDialogBtn
    },
    mounted(){
    }
})
export default class JobsView extends Mixins(JobsApi, DeviceStateApi){
    get items(){
        return this.jobs.map(job => ({
            ...job,
            targetState: (this.deviceStates.find(ds => ds._id == job._id) as DeviceState).name,
            calls: 1
        }))
    }
    get headers(){
        return (["name", "interval", "sleepUntil"])
        .map(item => ({
            text: item,
            value: item
        })).concat([
            {
                text: "Actions",
                value: "actions"
            },
            {
                text: "Calls",
                value: "calls"
            }
        ])
    }
    edit(){

    }
}
</script>