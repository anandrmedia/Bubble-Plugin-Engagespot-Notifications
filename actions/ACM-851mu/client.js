function(properties, context) {
    
    console.log("Updating state");
    
    const apiBaseURL = (context.keys['OPTIONAL-BASE-URL'] && context.keys['OPTIONAL-BASE-URL'].trim()) ? context.keys['OPTIONAL-BASE-URL'] : "https://api.engagespot.co";

    let notificationId = properties.notification_id;
    let state = properties.state;
    let deleteNotification = properties.delete;
    let userSignature = context.currentUser.get('engagespot_user_signature_text');
    let userToken = context.currentUser.get('engagespot_user_token_text');

    
    context.jQuery.ajax({
    type: 'PUT',
    url: apiBaseURL+"/v3/notifications/"+notificationId+"/state",
    headers: {
            'Content-Type': 'application/json',
            ... !userToken && {'X-ENGAGESPOT-API-KEY':context.keys['X-ENGAGESPOT-API-KEY']},
            ... !userToken && {'X-ENGAGESPOT-USER-ID':context.currentUser.get('email')},
            ...userSignature && !userToken && {'X-ENGAGESPOT-USER-SIGNATURE': userSignature},
            ...userToken && {'Authorization': 'Bearer '+userToken}
        
    	},
    data: JSON.stringify({state, delete: Boolean(deleteNotification)}), // Convert the request body to a JSON string
    success: function(response) {
      console.log('API call successful:', response);
    },
    error: function(xhr, status, error) {
      console.error('API call failed:', error);
    }
  });
}