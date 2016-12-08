package fr.cpe.jms.producer.impl;

import fr.cpe.jms.producer.IAdditionServiceMessaging;

import javax.annotation.Resource;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.jms.JMSContext;
import javax.jms.Queue;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by ubuntu on 9/18/16.
 */
@Stateless
public class AdditionServiceMessaging implements IAdditionServiceMessaging {

    @Resource(name = "java:/asi2-Queue")
    private Queue queue;

    @Inject
    private JMSContext context;


    @Override
    public void add(Double... a) {
        Map<String, Object> message = new HashMap<>();
        message.put("data", a);

        JsonArrayBuilder jsonArray = Json.createArrayBuilder();
        Arrays.asList(a).stream().forEach(val -> jsonArray.add(val));
        JsonObject messageJson = Json.createObjectBuilder().add("data", jsonArray.build()).build();

        context.createProducer().send(queue, messageJson.toString());
    }
}
