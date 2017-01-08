package fr.cpe.services;

import fr.cpe.model.AuthModel;

import javax.ejb.Local;

@Local
public interface MessageReceiverSyncLocalAuthModel {
	AuthModel receiveMessage();
}
