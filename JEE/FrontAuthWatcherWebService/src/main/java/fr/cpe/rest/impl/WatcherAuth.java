package fr.cpe.rest.impl;

import javax.inject.Inject;

import fr.cpe.model.AuthModel;
import fr.cpe.model.UserModel;
import fr.cpe.rest.IWatcherAuth;
import fr.cpe.services.IWatcherAuthService;
import fr.cpe.services.MessageReceiverSyncLocalAuthModel;
import fr.cpe.services.MessageSenderLocal;

public class WatcherAuth implements IWatcherAuth{

	@Inject
	MessageSenderLocal sender;
	
	@Inject
	MessageReceiverSyncLocalAuthModel receiver;
	
	@Override
	public AuthModel watcherAuthQuery(UserModel user) {
		sender.sendMessage(user);
		return receiver.receiveMessage();
	}

	@Override
	public String watcherAuth() {
		return "Page permettant l'authentification";
	}
}
