package fr.cpe.rest.impl;

import fr.cpe.ejb.IAdditionService;
import fr.cpe.jms.producer.IAdditionServiceMessaging;
import fr.cpe.jms.producer.impl.HelloWorldJmsProducer;
import fr.cpe.rest.IAdditionRestService;

import javax.ejb.EJB;
import java.util.List;
import java.util.logging.Logger;

/**
 * Created by ubuntu on 9/10/16.
 */
public class AdditionRestService implements IAdditionRestService {

    Logger logger = Logger.getLogger(AdditionRestService.class.getName());

    @EJB
    IAdditionService additionService;

    @EJB
    IAdditionServiceMessaging additionServiceMessaging;

    @EJB
    HelloWorldJmsProducer helloWorldJmsProducer;

//    @GET
//    @Produces("application/json")
//    public Number add(@QueryParam("a") long a, @QueryParam("b") long b) {
//        return additionService.add(a, b);
//    }

    @Override
    public Number add(List<Double> a) {
        logger.info("add() - " + a);
        return additionService.add(a.stream().toArray(Double[]::new));
    }

    @Override
    public void addJms(List<Double> a) {
        logger.info(">>> addJms() - " + a);
        additionServiceMessaging.add(a.stream().toArray(Double[]::new));
        logger.info("<<< addJms()");
    }

    @Override
    public String hello() {
        logger.info(">>> hello()");

        helloWorldJmsProducer.sendHelloWord();

        logger.info("<<< hello()");
        return "Hello in the Q...";
    }


}
