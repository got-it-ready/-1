import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//按需导入localStorage的方法
import {addLocalGoods,getTotalCount,updateLocalGoods,deleteLocalGoods} from '../common/localStorage.js'

 


//创建一个store
const store = new Vuex.Store({
    state: {
      buyCount: 0
    },
    getters:{

        getBuyCount(state){
            return state.buyCount === 0? getTotalCount():state.buyCount
        }
    },
    mutations:{
        addGoods(state,goods){   //goods //{goodId: "88", count: 4}
            //   state.buyCount+=goods.count
            state.buyCount =addLocalGoods(goods)
        },
        
        
        /**
         * 
         * @param {*} state 
         * @param {*} goods  //载荷传递过来的changeGoods
         */
        updateGoods(state,goods){

            state.buyCount =updateLocalGoods(goods)
        },

        //接收载荷
        deleteGoods(state,goodsId){
            state.buyCount = deleteLocalGoods(goodsId)

        }
    }
   
  })



  export default store