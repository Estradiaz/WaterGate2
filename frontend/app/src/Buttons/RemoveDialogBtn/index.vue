<template>
    <v-dialog v-model="dialog" max-width="200">
        <template #activator="{on}">
            <v-btn small icon v-on="on">D</v-btn>
        </template>
        <v-card>
            <v-card-title>Are you sure?</v-card-title>
            <v-card-subtitle>To remove {{item.name}}</v-card-subtitle>
            <v-card-actions>
                <v-btn text @click="dialog=false">
                    Cancel
                </v-btn>
                <v-btn text @click="removeItem(item);dialog=false" >
                    Remove
                </v-btn>
            </v-card-actions>
        </v-card>
        
    </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component
export default class RemoveDialogBtn<T extends {name: string}> extends Vue {
    @Prop(Object) readonly item!: T
    dialog: boolean = false
    removeItem(item: T){
        this.$emit("remove", item)
    }
}
</script>