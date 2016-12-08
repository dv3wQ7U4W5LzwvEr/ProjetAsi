package fr.cpe.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import java.util.List;

/**
 * Created by ubuntu on 9/11/16.
 */
@Path("/hello")
public interface IHelloRestService {

    @GET
    @Produces("text/plain")
    @Path("/")
    String hello();
}
