var db = require('../config/connection')
var collection = require('../config/collections')






var objectId = require('mongodb').ObjectID;
const { response } = require('express');
module.exports={
    addItem:(item,collectname,callback)=>{
        db.get().collection(collectname).insertOne(item).then((data)=>{
            callback(data.ops[0]._id);
        })
    },
    getAllItems:(collectname)=>{
        return new Promise(async(resolve,reject)=>{
            let items = await db.get().collection(collectname).find().toArray()
            resolve(items)
        })
    },
    deleteItem:(itemId,collectname)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collectname).removeOne({_id:objectId(itemId)}).then((response)=>{
                console.log(response);
                resolve(response)
            })
        })
    },
    getItemDetails:(itemId,collectname)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collectname).findOne({_id:objectId(itemId)}).then((item)=>{

                
                var coursenames = item['course[]']
                var studentintakes = item['intake[]']
                var coursefees = item['fee[]']

                var items = new Array
                for(i=0;i<coursenames.length;i++){
                    items [i] = 
                        {
                            course: coursenames[i],
                            intake: studentintakes[i],
                            fee: coursefees[i]
                        }   
                }
        
                var govtcoll = 
                    {
                        items: items,
                        allitems: item
                    }

                
                resolve(govtcoll);
            })
        })
    },
    updateItem:(itemId,itemDetails,collectname)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collectname).
            updateOne({_id:objectId(itemId)},{
                $set:{
                    college:itemDetails.college,
                    type:itemDetails.type,
                    link:itemDetails.link,
                    web:itemDetails.web,
                    'course[]':itemDetails['course[]'],
                    'intake[]':itemDetails['intake[]'],
                    'fee[]':itemDetails['fee[]']  

                }
            }).then((response)=>{
                resolve()
            })
        })
    }

}