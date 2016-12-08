package fr.cpe.jms.producer;

import javax.ejb.Local;

/**
 * Created by ubuntu on 9/24/16.
 */
@Local
public interface IHelloWorldJmsProducer {
    void sendHelloWord();
}
