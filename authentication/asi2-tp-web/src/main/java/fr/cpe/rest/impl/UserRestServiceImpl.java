package fr.cpe.rest.impl;

import fr.cpe.dao.UserDao;
import fr.cpe.model.User;
import fr.cpe.rest.IUserRestService;

import javax.ejb.EJB;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import java.util.List;

/**
 * Created by ubuntu on 9/24/16.
 */
public class UserRestServiceImpl implements IUserRestService {

    @EJB
    UserDao userDao;

    @Override
    public List<User> listUser(String login) {
        if (login != null) {
            return userDao.getUserByLogin(login);
        }
        return userDao.listUser();
    }

    @Override
    public User getUserById(int id) {
        return userDao.getUserById(id);
    }

    @Override
    public void addUser(User user) {
        userDao.save(user);
    }
}
