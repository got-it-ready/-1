const KEY = "GOODS"

//获取本地存储的商品信息,id作为key，数量作为值
const getLocalGoods = ()=>{

    return JSON.parse(localStorage.getItem(KEY)|| '{}')
}
 
 

 

//获取本地存储的所有总数量
const getTotalCount = ()=>{

    const localGoods = getLocalGoods()
     
    let totalCount = 0
    for(var key in localGoods){

        totalCount+=localGoods[key]
    }

    return totalCount
}

 
 

//把商品信息存储在本地
const addLocalGoods = goods=>{   //goods //{goodsId: "88", count: 4}

    //获取本地中存的值
    const localGoods = getLocalGoods()  //{88: 2, 91: 2,}
     
                      
    if(localGoods[goods.goodsId]){    
        localGoods[goods.goodsId]+=goods.count
    }else{
        localGoods[goods.goodsId] = goods.count
    }

      // 3.把对象转成字符串，覆盖保存回去
    localStorage.setItem(KEY,JSON.stringify(localGoods))

     // 4.重新统计一下localStorage中最新的数量，返回
      return getTotalCount()
    //    return localGoods
}

//修该本地商品信息
 /**
  * 
  */

const updateLocalGoods = goods=>{
      //获取本地中存的值
      const localGoods = getLocalGoods()  //{88: 2, 91: 2,}

      //更新修改后的值
      localGoods[goods.goodsId] = goods.count
        // 3.把对象转成字符串，覆盖保存回去
    localStorage.setItem(KEY,JSON.stringify(localGoods))

    // 4.重新统计一下localStorage中最新的数量，返回
     return getTotalCount()

}

const deleteLocalGoods = goodsId=>{
     //获取本地中存的值
     const localGoods = getLocalGoods()  //{id}

     //删除本地存储
     delete localGoods[goodsId]
     localStorage.setItem(KEY,JSON.stringify(localGoods))

     // 4.重新统计一下localStorage中最新的数量，返回
      return getTotalCount()

}



export {addLocalGoods,getLocalGoods,getTotalCount,updateLocalGoods,deleteLocalGoods}



 