function(properties, context) {
    
  let userIdentifier = context.currentUser.get('email');
      
  options = {
    url: "https://api.engagespot.co/v3/users/"+userIdentifier,
    method: "PUT",
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