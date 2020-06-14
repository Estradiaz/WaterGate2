import { Vue, Component } from "vue-property-decorator";
import { Image } from './types';
import { ImageApiVuexModule } from './VuexModule';

@Component<ImageApi>({

    created(){
        if(!this.$store.hasModule(ImageApi.modulePath)){
            this.$store.registerModule(
                ImageApi.modulePath,
                ImageApiVuexModule
            )
        }
    },
    mounted(){
        this.pullImages()
    }
})
export class ImageApi extends Vue {
    static modulePath: string = "api/image";
    get images(): Image[] {
        return this.$store.state[ImageApi.modulePath].images || []
    }
    async pullImages(){

        return this.$store.dispatch(`${ImageApi.modulePath}/pullImages`, undefined, {root: true});
    }
}