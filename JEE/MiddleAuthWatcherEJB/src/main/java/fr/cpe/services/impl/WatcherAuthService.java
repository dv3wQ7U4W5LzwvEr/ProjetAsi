package fr.cpe.services.impl;

import javax.ejb.Stateless;

import fr.cpe.model.AuthModel;
import fr.cpe.model.UserModel;
import fr.cpe.services.IWatcherAuthService;

@Stateless
public class WatcherAuthService implements IWatcherAuthService{

	@Override
	public AuthModel watcherAuthServiceQuery(AuthModel user) {
		return user;
	}
	
}