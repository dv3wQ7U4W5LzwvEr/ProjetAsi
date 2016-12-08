package fr.cpe.rest.impl;

import fr.cpe.jms.producer.impl.HelloWorldJmsProducer;
import fr.cpe.rest.IHelloRestService;

import javax.ejb.EJB;
import java.util.logging.Logger;

/**
 * Created by ubuntu on 9/10/16.
 */
public class HelloRestService implements IHelloRestService {

    Logger logger = Logger.getLogger(HelloRestService.class.getName());

    @EJB
    HelloWorldJmsProducer helloWorldJmsProducer;

    @Override
    public String hello() {
        logger.info(">>> hello()");

        helloWorldJmsProducer.sendHelloWord();

        logger.info("<<< hello()");
        return "Hello in the Q....";
    }


}
