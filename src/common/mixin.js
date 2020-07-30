import { debounce } from "./utils";


export const itemListenerMixin = {
    data(){
        return{
            itemImgListener: null,
            newrefresh: null
        }
    },
    mounted() {
         this.newrefresh = debounce(this.$refs.scroll.refresh, 200);
        this.itemImgListener = () => {
            this.newrefresh()
        }
        this.$bus.$on('itemImageLoad', this.itemImgListener)
        // console.log('我是混入');
    },

}