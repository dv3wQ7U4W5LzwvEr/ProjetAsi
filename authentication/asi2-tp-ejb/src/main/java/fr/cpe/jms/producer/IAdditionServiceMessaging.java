package fr.cpe.jms.producer;

import javax.ejb.Local;

/**
 * Created by ubuntu on 9/11/16.
 */
@Local
public interface IAdditionServiceMessaging {
    void add(Double... a);
}
