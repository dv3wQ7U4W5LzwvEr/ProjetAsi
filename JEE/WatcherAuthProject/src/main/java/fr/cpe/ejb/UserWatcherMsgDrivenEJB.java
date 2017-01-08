package fr.cpe.ejb;

import fr.cpe.dao.UserBDD;
import fr.cpe.model.UserModel;
import fr.cpe.services.MessageSenderQueueLocal;

import javax.ejb.ActivationConfigProperty;
import javax.ejb.MessageDriven;
import javax.inject.Inject;
import javax.jms.*;
import java.util.Date;


@MessageDriven(
		activationConfig = {
					@ActivationConfigProperty(
							propertyName = "destinationType",
							propertyValue = "javax.jms.Topic"),
					@ActivationConfigProperty(
							propertyName = "destination",
							propertyValue = "java:/jms/watcherAuthJMS")
		})

public class UserWatcherMsgDrivenEJB implements MessageListener {

	@Inject MessageSenderQueueLocal sender;

	@Inject
	private UserBDD userBDD;

	public UserWatcherMsgDrivenEJB() {	}
	
	public void onMessage(Message message) {
		try {
			if (message instanceof TextMessage) {
				System.out.println("Topic: J'ai recu un message à "+ new Date());
				TextMessage msg = (TextMessage) message;
				System.out.println("Le message est : " + msg.getText());

			} else if (message instanceof ObjectMessage) {
				System.out.println("Topic: J'ai recu un message à "
						+ new Date());
				ObjectMessage msg = (ObjectMessage) message;
				if( msg.getObject() instanceof UserModel){
					UserModel user=(UserModel)msg.getObject();
					System.out.println("User Details: ");
					System.out.println("login:"+user.getLogin());
					System.out.println("pwd:"+user.getPassword());
					UserModel bddUser = userBDD.checkUserBDD(user);
					if( bddUser.getRole() == null || bddUser.getRole().isEmpty()){
						sender.sendMessage(user);
					}else{
						sender.sendMessage(bddUser);
					}
				}
			} else {
				System.out.println("Message non valide pour cette Queue MDB");
			}
		} catch (JMSException e) {
			e.printStackTrace();
		}
	}
}
