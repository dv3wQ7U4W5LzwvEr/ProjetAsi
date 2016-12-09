package fr.cpe.services.impl;

import javax.annotation.Resource;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.jms.JMSContext;
import javax.jms.Topic;

import fr.cpe.services.MessageSenderLocal;
import model.User;



@Stateless
@LocalBean
public class MessageSender implements MessageSenderLocal {

        @Inject
        JMSContext context;

        @Resource(mappedName = "java:/jms/watcherAuthJMS")
        Topic topic;

        public void sendMessage(String message) {
            // TODO
        }
        public void sendMessage(User user) {
// TODO
        }
    }
