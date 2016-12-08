package fr.cpe.jms.consumer;

import fr.cpe.ejb.IAdditionService;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.ejb.*;
import javax.inject.Inject;
import javax.jms.*;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import java.io.StringReader;
import java.util.logging.Logger;

/**
 * Created by ubuntu on 9/16/16.
 */
@MessageDriven(name = "AdditionMDB", activationConfig = {

        @ActivationConfigProperty(propertyName = "destinationType", propertyValue = "javax.jms.Queue"),

        @ActivationConfigProperty(propertyName = "destination", propertyValue = "asi2-Queue"),

        @ActivationConfigProperty(propertyName = "acknowledgeMode", propertyValue = "Auto-acknowledge") })
public class AdditionMDB implements MessageListener {

    private static Logger logger = Logger.getLogger(AdditionMDB.class.getName());

    @EJB
    IAdditionService additionService;

    @Override
    public void onMessage(Message var1) {

        try {
            logger.info(">>> onMessage() - " + var1.toString());
            Thread.sleep(3000);

            if (var1 instanceof TextMessage) {
                String jsonMsg = ((TextMessage) var1).getText();
                logger.info(jsonMsg);

                JsonReader reader = Json.createReader(new StringReader(jsonMsg));

                JsonObject jsonObject = reader.readObject();
                Double[] values = jsonObject.getJsonArray("data").stream()
                        .map(value -> Double.valueOf(value.toString()))
                        .toArray(Double[]::new);

                logger.info("JMS ADD RESULT : " + additionService.add(values));

            }
        } catch (JMSException | InterruptedException e) {
            e.printStackTrace();
        }

        logger.info("<<< onMessage()");

    }
}
