package fr.cpe.ejb;

import java.util.Date;

import javax.ejb.ActivationConfigProperty;
import javax.ejb.MessageDriven;
import javax.inject.Inject;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.ObjectMessage;
import javax.jms.TextMessage;

import fr.cpe.dao.UserBDD;
import fr.cpe.model.AuthModel;
import fr.cpe.model.UserModel;
import fr.cpe.services.MessageSenderQueueLocal;


@MessageDriven(
		activationConfig = {
					@ActivationConfigProperty(
							propertyName = "destinationType",
							propertyValue = "javax.jms.Topic"),
					@ActivationConfigProperty(
							propertyName = "destination",
							propertyValue = "java:/jms/watcherAuthJMS")
		})

public class AuthWatcherMsgDrivenEJB implements MessageListener {
	
	@Inject MessageSenderQueueLocal sender;

	@Inject
	private UserBDD userBDD;
	
	public AuthWatcherMsgDrivenEJB() {	}
	
	public void onMessage(Message message) {
		try {
			if (message instanceof TextMessage) {
				System.out.println("Topic: J'ai recu un message à "+ new Date());
				TextMessage msg = (TextMessage) message;
				System.out.println("Le message est : " + msg.getText());
			}
			else if (message instanceof ObjectMessage) {
				System.out.println("Topic: J'ai recu un message à "	+ new Date());
				ObjectMessage msg = (ObjectMessage) message;

				if( msg.getObject() instanceof UserModel){
					UserModel user=(UserModel)msg.getObject();
					UserModel currentTestRole=userBDD.checkUserBDD(user);
					AuthModel response = new AuthModel();

					if( currentTestRole.getRole() == null || currentTestRole.getRole().isEmpty()){
						response.setLogin(user.getLogin());
						response.setRole(null);
						response.setValidAuth(false);
					}else{
						response.setLogin(user.getLogin());
						response.setRole(currentTestRole.getRole());
						response.setValidAuth(true);
					}
					sender.sendMessage(response);
				}
			}
			else {
				System.out.println("Message non valide pour cette Queue MDB");
			}
		} catch (JMSException e) {
			e.printStackTrace();
		}
	}
}
