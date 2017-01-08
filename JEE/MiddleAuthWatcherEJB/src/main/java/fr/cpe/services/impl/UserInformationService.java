package fr.cpe.services.impl;

import fr.cpe.model.UserModel;
import fr.cpe.services.IUserInformationService;
import fr.cpe.services.IWatcherAuthService;

import javax.ejb.Stateless;

@Stateless
public class UserInformationService implements IUserInformationService{

	@Override
	public UserModel userInformationServiceQuery(UserModel user) {
		return user;
	}
	
}