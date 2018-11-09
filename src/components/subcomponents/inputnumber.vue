<template>
     <div>
        <div @click="subscribe" class="top">-</div>
        <div class="middle">{{initCount}}</div>
        <div @click="subAdd" class="bot">+</div>
     </div>
</template>

<style scoped>
    .top,.middle,.bot{

        border: 1px solid #ccc;
        width: 25px;
        height: 25px;
        display: inline-block;
        line-height: 25px ; 
    }

    .middle{

        margin: 0 5px;
         width: 30px;
    }
    
</style>

<script>
    export default{
        props:['goodsId','count'], //父组件可以使用 props把数据传递给子组件
        data(){
           
            return{

                initCount:0
            }  
        },

        created() {
            this.initCount = this.count
        },


        methods:{

            subscribe(){

                if(this.initCount ===1){

                    return
                }

                this.initCount--
                this.notify()
            },


            subAdd(){

                this.initCount++
                this.notify()
            },

            //子组件通过触发自定义事件，传递载荷
            notify(){

                this.$emit('goodsCountChange',{  //子组件可以使用 $emit 触发父组件的自定义事件。

                    goodsId: this.goodsId,
                    count: this.initCount
                })
            }

        }


    }

</script>
 