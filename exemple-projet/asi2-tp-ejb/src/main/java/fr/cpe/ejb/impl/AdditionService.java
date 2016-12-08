package fr.cpe.ejb.impl;

import fr.cpe.ejb.IAdditionService;

import javax.ejb.Stateless;
import java.util.Arrays;

/**
 * Created by ubuntu on 9/10/16.
 */
@Stateless
public class AdditionService implements IAdditionService {

    @Override
    public double add(Double... a) {
        return Arrays.stream(a).mapToDouble(Double::doubleValue).sum();
    }

    @Override
    public double addJms(Double... a) {
        return 0;
    }
}
