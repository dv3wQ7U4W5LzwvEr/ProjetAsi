package fr.cpe.rest;

import fr.cpe.model.User;

import javax.ws.rs.*;
import java.util.List;

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
