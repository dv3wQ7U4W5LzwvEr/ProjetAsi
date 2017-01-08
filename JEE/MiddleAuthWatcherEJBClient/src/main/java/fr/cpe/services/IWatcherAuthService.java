package fr.cpe.services;

import javax.ejb.Local;

import fr.cpe.model.AuthModel;
import fr.cpe.model.UserModel;

@Local
public interface IWatcherAuthService {

	AuthModel watcherAuthServiceQuery(AuthModel user);
}
