<template>
  <v-app>
    <v-navigation-drawer
          app
          v-model="drawer"
      >
      <v-list>
          <v-list-item
            v-for="route in routes"
            :key="route.path"
            link
            :to="route.path"
          >
            <v-list-item-content>
              {{route.name}}
            </v-list-item-content>
          </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      dense
    >
      <v-toolbar-items>
        <v-btn text @click="drawer=true"
          class="hidden-md-and-up"
        >
          <v-icon>fa fa-bars</v-icon>
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-title class="mr-4">Water-Gate</v-toolbar-title>
      
      <v-toolbar-items>
        
        <v-btn
          class="hidden-sm-and-down"
          v-for="route in routes"
          :key="route.path"
          text 
          :to="route.path"
        >{{route.name}}</v-btn>
        
      </v-toolbar-items>
    </v-app-bar>
    
    <v-content>
        <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
@Component({
  mounted(){
    console.log(this.$router)
  }
})
export default class extends Vue{
  
  drawer: boolean = true
  get routes(){
    //@ts-ignore
    return this.$router.options.routes || []
  }
}
</script>