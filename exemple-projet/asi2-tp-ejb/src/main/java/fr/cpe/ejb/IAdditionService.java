package fr.cpe.ejb;

import javax.ejb.Local;

/**
 * Created by ubuntu on 9/11/16.
 */
@Local
public interface IAdditionService {
    double add(Double... a);

    double addJms(Double... a);
}
