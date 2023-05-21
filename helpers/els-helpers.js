




module.exports = {
    elsWork: (data) => {

        var obdatelist = Array();
        var oblist = Array();
        var creditfromlist = Array();
        var credittolist = Array();
        var creditdayslist = Array();
        var creditlist = Array();
        var totallist = Array();
        var eventlist = Array();
        var leavefromlist = Array();
        var leavetolist = Array();
        var fromlist = Array();
        var tolist = Array();
        var from = Array();
        var to = Array();
        var leavedayslist = Array();
        var cblist = Array();
        var cbdatelist = Array();
        obdatelist = data.obdatevalues.split(',');
        oblist = data.obvalues.split(',');
        creditfromlist = data.creditfromvalues.split(',');
        credittolist = data.credittovalues.split(',');
        creditdayslist = data.dutyvalues.split(',');
        creditlist = data.creditvalues.split(',');
        totallist = data.totalvalues.split(',');
        eventlist = data.eventvalues.split(',');
        fromlist = data.fromvalues.split(',');
        tolist = data.tovalues.split(',');
        leavedayslist = data.ldaysvalues.split(',');
        cblist = data.cbvalues.split(',');
        cbdatelist = data.cbdatevalues.split(',');


        for (i=0; i<oblist.length; i++) {
            from = fromlist[i].split('-');
            leavefromlist[i] = from[2]+'-'+from[1]+'-'+from[0];
            to = tolist[i].split('-');
            leavetolist[i] = to[2]+'-'+to[1]+'-'+to[0];      
        }
        
       
        

        var elsdata = Array()
        
        for (j=0; j<oblist.length; j++) {

            elsdata [j] = 
                {
                    obdate: obdatelist[j],
                    ob: oblist[j],
                    creditfrom: creditfromlist[j],
                    creditto: credittolist[j],
                    creditdays: creditdayslist[j],
                    credit: creditlist[j],
                    total: totallist[j],
                    event: eventlist[j],
                    leavefrom: leavefromlist[j],
                    leaveto: leavetolist[j],
                    leavedays: leavedayslist[j],
                    cb: cblist[j],
                    cbdate: cbdatelist[j]
                }
                    
        }

        
        return new Promise(async (resolve, reject) => {
           
            resolve(elsdata)
            
        }) 
          
        
    }
}