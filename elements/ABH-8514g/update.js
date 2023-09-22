function(instance, properties, context) {
    
    
        const userEmail =  context.currentUser.get('email');
        const userSignature =  context.currentUser.get('engagespot_user_signature_text');
    	instance.canvas[0]['id'] = 'esBellIcon';
        instance.canvas[0].style.overflow = 'visible';
        instance.data.placeholder_element_id = 'esBellIcon';
    	const disableNotificationChime = (properties.notification_sound ? false : true)
     	const notificationSoundSrc = properties.notification_sound_src;
    

          window.Engagespot.render('#esBellIcon', {
          apiKey: context.keys['X-ENGAGESPOT-API-KEY'],
          userId: userEmail,
          userSignature: userSignature,
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
              //console.log("notification", payload);
              
              if(payload.url){
               window.location = payload.url;   
               return;
              }
          
              instance.publishState('clicked_notification_id', payload.id.toString());
              instance.publishState('bb_custom_data_1', payload.data?.bb_custom_data_1);
              instance.publishState('bb_custom_data_2', payload.data?.bb_custom_data_2);
			  instance.triggerEvent('notification_click');
          }
         }); 
     
        
}