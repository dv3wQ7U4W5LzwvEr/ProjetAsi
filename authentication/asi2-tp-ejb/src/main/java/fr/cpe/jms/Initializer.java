package fr.cpe.jms;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.enterprise.inject.Produces;
import javax.inject.Inject;
import javax.jms.JMSContext;
import javax.jms.JMSDestinationDefinition;
import javax.jms.Queue;
import java.util.logging.Logger;

/**
 * Created by ubuntu on 9/16/16.
 */
@JMSDestinationDefinition(
        name = "java:/asi2-HelloWorldBis",
        interfaceName = "javax.jms.Queue",
        destinationName = "HelloWorldMDBBis")

@Startup
@Singleton
public class Initializer {

    private static Logger logger = Logger.getLogger(Initializer.class.getName());

    public final static String QUEUE_NAME_HELLO_WORLD_BIS = "java:/asi2-HelloWorldBis";

    @Inject
    private JMSContext context;

    @Resource(name = QUEUE_NAME_HELLO_WORLD_BIS)
    private Queue queueHelloWorldBis;

    @PostConstruct
    public void init() {
        logger.info(">>> init()");
//        MessageListener listener = new HelloWorldJmsConsumerBis();
//        context.createConsumer(queue).setMessageListener(listener);
        logger.info("<<< init()");
    }

    @Produces
    public Queue getQueueHelloWorldBis() {
        return this.queueHelloWorldBis;
    }

    public JMSContext getContext() {
        return this.context;
    }
}
