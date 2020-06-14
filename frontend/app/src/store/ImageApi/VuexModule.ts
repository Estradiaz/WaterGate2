import { VuexModule, Module, Action, Mutation } from 'vuex-module-decorators';
import { Image } from './types';


@Module({
    namespaced: true
})
export class ImageApiVuexModule extends VuexModule {

    images: Image[] = []
    @Mutation
    setImages_c(images: Image[]){
        this.images = images
    }
    @Action({commit: "setImages_c"})
    async pullImages(){
        return []
    }
}