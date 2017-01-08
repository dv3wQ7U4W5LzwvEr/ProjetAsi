package fr.cpe.rest;

import fr.cpe.model.UserModel;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/userInformation")
public interface IUserInformation {
		
	@GET		
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/")
	String UserInformation();
	
	@POST		
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/")
	UserModel UserInformationQuery(UserModel user);
}

