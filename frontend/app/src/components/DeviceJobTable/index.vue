<template>
    <v-container>
        <v-data-table
            :items="deviceJobs"
            :headers="jobHeaders"
        >
            <template #body.prepend="{headers}">
                <td :colspan="headers.length" >
                    <v-toolbar>
                        <v-spacer /> 
                        <v-btn text>Job</v-btn>
                    </v-toolbar>
                </td>
            </template>
        </v-data-table>
    </v-container>
</template>

<script lang="ts">
import { Mixins, Component, Prop } from 'vue-property-decorator'
import { JobsApi } from "../../store/JobsApi";
import { Job } from '../../store/JobsApi/types';

@Component<DeviceJobTable>({

})
export default class DeviceJobTable extends Mixins(JobsApi){
    @Prop(String) readonly deviceId!: string
    get deviceJobs(){

        return []
    }
    get jobHeaders(){

        return (["sleepUntil", "duration", "interval", "reapeatUntil"] as Array<keyof Job>)
        .map(item=> ({value: item, text: item}))
    }
}
</script>