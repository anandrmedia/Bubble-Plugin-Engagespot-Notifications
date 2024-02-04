async function(properties, context) {
    
    const apiBaseURL = (context.keys['OPTIONAL-BASE-URL'] && context.keys['OPTIONAL-BASE-URL'].trim()) ? context.keys['OPTIONAL-BASE-URL'] : "https://api.engagespot.co";
    

    let userId = await properties.user.get('email');
    
    let attributes = {}
    
    properties.profile_data.forEach( (property) => {
       attributes[property.key] = property.value;    
    });
    
    console.log(attributes);
    

	options = {
    	url: apiBaseURL+"/v3/users/"+userId,
    	method: "PUT",
    	headers:{
            'Content-Type': 'application/json',
            'X-ENGAGESPOT-API-KEY':context.keys['X-ENGAGESPOT-API-KEY'],
            'X-ENGAGESPOT-API-SECRET':context.keys['X-ENGAGESPOT-API-SECRET']
    	},
    	body:JSON.stringify({
            ...attributes
   
   		})
  	}
    
    await context.v3.request(options);
}