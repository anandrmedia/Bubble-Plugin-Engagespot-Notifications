function(instance, properties, context) {
    
    
        const userEmail =  context.currentUser.get('email');
        const userSignature =  context.currentUser.get('engagespot_user_signature_text');
        const userToken =  context.currentUser.get('engagespot_user_token_text');
    	instance.canvas[0]['id'] = 'esBellIcon';
        instance.canvas[0].style.overflow = 'visible';
        instance.data.placeholder_element_id = 'esBellIcon';
    	const disableNotificationChime = (properties.notification_sound ? false : true)
     	const notificationSoundSrc = properties.notification_sound_src;
    
    const listeners = JSON.parse(properties.blocks_to_listen);
    

          window.Engagespot.render('#esBellIcon', {
              apiKey: context.keys['X-ENGAGESPOT-API-KEY'],
              userId: userEmail,
              userSignature: userSignature,
              ...userToken && {userToken},
              ...context.keys['OPTIONAL-BASE-URL'] && context.keys['OPTIONAL-BASE-URL'].trim() && { baseURL: context.keys['OPTIONAL-BASE-URL']},
              theme: {
                 colors:{
                    brandingPrimary: properties.primary_branding_color
                 },
                 notificationButton:{
                    iconFill: properties.bell_icon_color
                 }
              }, 
              disableNotificationChime: disableNotificationChime,
              notificationChimeSrc: notificationSoundSrc,
              onFeedItemClick: (notification, payload) => {
                  if(payload.blocks?.length){
                    return;
                  }

                  if(payload.url){
                   window.location = payload.url;   
                   return;
                  }

                  instance.publishState('clicked_notification_id', payload.id.toString());
                  instance.publishState('bb_custom_data_1', payload.data?.bb_custom_data_1);
                  instance.publishState('bb_custom_data_2', payload.data?.bb_custom_data_2);
                  instance.triggerEvent('notification_click');
              },
              events:{
                 onNotificationReceive: (item) => {
                     instance.publishState('received_notification_id', item.id.toString());
                     delete item._client;
                     //console.log(item);
                     instance.publishState('received_notification_title', item.title);
                     instance.publishState('received_notification_message', item.message);
                     instance.publishState('received_notification_json', JSON.stringify(item));
                     instance.triggerEvent('notification_received');
                 }
              },
              
                   
              eventListenersToRun: listeners.map((item) => {
                 return {
                     blockId: item.blockId,
                     event: item.event,
                     onEvent: ({ event, changeNotificationState, getValue, notification }) => {
                      event.stopPropagation();
                	  console.log("Event listener worked for ",item.event, "on ", item.blockId, notification);
                      instance.publishState('interacted_blockId', item.blockId);
                      instance.publishState('interacted_event', item.event);
                      instance.publishState('interacted_notification_id', notification.id.toString());
                      instance.publishState('interacted_notification_json', JSON.stringify(notification));
                      instance.triggerEvent('notification_interacted');
                     },
                 }
              })
                 
         }); 
     
        
}