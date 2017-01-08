package fr.cpe.services.impl;

import java.util.logging.Logger;

import javax.annotation.Resource;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.jms.JMSContext;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.ObjectMessage;
import javax.jms.Queue;

import fr.cpe.model.UserModel;
import fr.cpe.services.MessageReceiverSyncLocalUserModel;

@Stateless
@LocalBean
public class MessageReceiverSyncUserModel implements MessageReceiverSyncLocalUserModel {
	
	Logger logger = Logger.getLogger(MessageReceiverSyncLocalUserModel.class.getName());
	
	@Inject
	JMSContext context;
	
	@Resource(mappedName = "java:/jms/queue/watcherqueue")
	Queue queue;
	
	public UserModel receiveMessage() {

		try {
			Message message = context.createConsumer(queue).receive(10000);

			if (message instanceof ObjectMessage){
				UserModel obj = (UserModel) ((ObjectMessage) message).getObject();
				return obj;
			}
		}
		catch (JMSException e) {
			e.printStackTrace();
		}

		return null;
	}
}