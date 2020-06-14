<template>
<v-container>
    <v-carousel>
        <v-carousel-item
            v-for="image in images"
            :key="image.src"
        >
            <v-img :src="image" lazy-src=""/>
        </v-carousel-item>
    </v-carousel>
</v-container>
</template>

<script lang="ts">
import { Vue, Mixins, Component } from 'vue-property-decorator'
import { ImageApi } from "@/store/ImageApi";
@Component<MemoriesView>({
    mounted(){
        this.pullImages();
    }
})
export default class MemoriesView extends Mixins(ImageApi) {

}