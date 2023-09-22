function(properties, context) {
    
   let mergedRecipientsArray = [];
    
   if(properties.multiple_recipients){
       let multipleRecipientsList = properties.multiple_recipients.get(0, properties.multiple_recipients.length());
       let multipleRecipientsArray = [];

       for(var i=0; i<multipleRecipientsList.length; i++){
           multipleRecipientsArray.push(multipleRecipientsList[i].get('email'))
       }
    
       if(properties.recipient){
   	      mergedRecipientsArray = [properties.recipient.get('email')].concat(multipleRecipientsArray);
       }else{
          mergedRecipientsArray = multipleRecipientsArray;
       }
   }else{
       
       mergedRecipientsArray = [properties.recipient.get('email')]
   }
    
   let override = {}
    
   if(properties.override){
       override = JSON.parse(properties.override);
   }
    
   let data = {}
    
   if(properties.data){
       data = JSON.parse(properties.data);
   }
    
    if(properties.bb_custom_data_1){
        data.bb_custom_data_1 = properties.bb_custom_data_1;
    }
   
    if(properties.bb_custom_data_2){
        data.bb_custom_data_2 = properties.bb_custom_data_2;
    }
   
       
   options = {
    url: "https://api.engagespot.co/v3/notifications",
    method: "POST",
    headers:{
            'Content-Type': 'application/json',
            'X-ENGAGESPOT-API-KEY':context.keys['X-ENGAGESPOT-API-KEY'],
            'X-ENGAGESPOT-API-SECRET':context.keys['X-ENGAGESPOT-API-SECRET']
    },
    body:JSON.stringify({
    "notification": {
        "templateId": properties.template_id,
        "title": properties.notification_title,
        "message":properties.notification_message,
        "url":properties.notification_url,
        "icon":properties.notification_icon,
    },
     "data": data,
     "category":properties.category,
     "recipients": mergedRecipientsArray,
     "override": override
   
   })
  }
    
    context.request(options);
    

}