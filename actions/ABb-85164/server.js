function(properties, context) {

    let userId = properties.user.get('email');
    let phoneNumber = properties.phonenumber;
    
    let attributes = {}
    
    properties.profile_data.forEach( (property) => {
       attributes[property.key] = property.value;    
    });
    
    console.log(attributes);
    

	options = {
    	url: "https://api.engagespot.co/v3/users/"+userId,
    	method: "PUT",
    	headers:{
            'Content-Type': 'application/json',
            'X-ENGAGESPOT-API-KEY':context.keys['X-ENGAGESPOT-API-KEY'],
            'X-ENGAGESPOT-API-SECRET':context.keys['X-ENGAGESPOT-API-SECRET']
    	},
    	body:JSON.stringify({
    
        	"phoneNumber": phoneNumber,
            ...attributes
   
   		})
  	}
    
    context.request(options);


}