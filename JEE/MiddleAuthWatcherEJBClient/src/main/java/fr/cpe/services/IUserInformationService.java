package fr.cpe.services;

import fr.cpe.model.UserModel;

import javax.ejb.Local;

@Local
public interface IUserInformationService {

	UserModel userInformationServiceQuery(UserModel user);
}
