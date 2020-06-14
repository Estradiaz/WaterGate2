<template>
    <v-app>
        <v-navigation-drawer
            app
            
        >
            <v-list>
                <!-- <v-list-item
                    v-for="view in views"
                >

                </v-list-item> -->
            </v-list>
        </v-navigation-drawer>
        <v-content>
            <router-view>
        </v-content>
    </v-app>
</template>


<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
@Component<Dashboard>({

})
export default class Dashboard extends Vue{
    get routes(){
        //@ts-ignore
        return this.$router.options.routes
    }
}
    
</script>