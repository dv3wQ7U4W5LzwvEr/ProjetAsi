package fr.cpe.services.impl;

import fr.cpe.model.AuthModel;
import fr.cpe.services.MessageReceiverSyncLocalAuthModel;
import fr.cpe.services.MessageReceiverSyncLocalUserModel;

import javax.annotation.Resource;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.jms.*;
import java.util.logging.Logger;

@Stateless
@LocalBean
public class MessageReceiverSyncAuthModel implements MessageReceiverSyncLocalAuthModel {
	
	Logger logger = Logger.getLogger(MessageReceiverSyncLocalAuthModel.class.getName());
	
	@Inject
	JMSContext context;
	
	@Resource(mappedName = "java:/jms/queue/watcherqueue")
	Queue queue;
	
	public AuthModel receiveMessage() {

		try {
			Message message = context.createConsumer(queue).receive(10000);

			if (message instanceof ObjectMessage){
				AuthModel obj = (AuthModel) ((ObjectMessage) message).getObject();
				return obj;
			}
		}
		catch (JMSException e) {
			e.printStackTrace();
		}

		return null;
	}
}