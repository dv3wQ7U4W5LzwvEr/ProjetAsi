package fr.cpe.services;

import javax.ejb.Local;

import fr.cpe.model.AuthModel;
import fr.cpe.model.UserModel;

@Local
public interface MessageSenderQueueLocal {
	
	void sendMessage (String message);
	void sendMessage (UserModel user);
	void sendMessage (AuthModel authResponse);
}
