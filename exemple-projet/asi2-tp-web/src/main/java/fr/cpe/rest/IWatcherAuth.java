package fr.cpe.rest;

import fr.cpe.model.User;
import fr.cpe.model.UserResponse;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/WatcherAuth")
public interface IWatcherAuth {

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/")
    UserResponse auth(User userModel);
}
