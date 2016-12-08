package fr.cpe.rest;

import fr.cpe.model.User;

import javax.ws.rs.*;
import java.util.List;

/**
 * Created by ubuntu on 9/11/16.
 */
@Path("/users")
public interface IUserRestService {
    @GET
    @Produces("application/json")
    @Path("/")
    List<User> listUser(@QueryParam(value = "login") String login);

    @GET
    @Produces("application/json")
    @Path("/{id}")
    User getUserById(@PathParam(value = "id") int id);

    @POST
    @Produces("application/json")
    @Consumes("application/json")
    @Path("/")
    void addUser(User user);
}
