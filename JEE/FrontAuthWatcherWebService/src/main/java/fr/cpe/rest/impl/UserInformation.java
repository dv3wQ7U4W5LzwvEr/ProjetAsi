package fr.cpe.rest.impl;

import fr.cpe.model.UserModel;
import fr.cpe.rest.IUserInformation;
import fr.cpe.services.IWatcherAuthService;
import fr.cpe.services.MessageReceiverSyncLocalUserModel;
import fr.cpe.services.MessageSenderLocal;

import javax.inject.Inject;

public class UserInformation implements IUserInformation {

	@Inject
	MessageSenderLocal sender;
	
	@Inject
	MessageReceiverSyncLocalUserModel receiver;
	
	@Override
	public UserModel UserInformationQuery(UserModel user) {
		sender.sendMessage(user);
		return receiver.receiveMessage();
	}

	@Override
	public String UserInformation() {
		return "Page permettant de récupérer les informations du user";
	}
}
