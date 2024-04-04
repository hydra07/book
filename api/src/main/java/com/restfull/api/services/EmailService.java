package com.restfull.api.services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;


    public void sendNewPassword(String toEmail, String newPassword, String name) throws MessagingException, UnsupportedEncodingException {
        String from = "bookdemo3@gmail.com";
        String subject = "Reset Password";
        String content = "Dear [[name]],<br>"
                + "Your new password is: [[newPassword]]<br><br>"
                + "Sincerely,<br>"
                + "BookTeam.";
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(from, "BookTeam");
        helper.setTo(toEmail);
        helper.setSubject(subject);

        content = content.replace("[[name]]", name);
        content = content.replace("[[newPassword]]", newPassword);
        helper.setText(content, true);
        javaMailSender.send(message);
    }

    public void sendWelcome(String toEmail, String name) throws MessagingException, UnsupportedEncodingException {
        String from = "bookdemo3@gmail.com";
        String subject = "Welcome !!!";
        String content = "Dear [[name]],<br>" +
                "Welcome to BookTeam! <br>" +

                "Sincerely,<br>" +
                "BookTeam.";


        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(from, "BookTeam");
        helper.setTo(toEmail);
        helper.setSubject(subject);

        content = content.replace("[[name]]", name);
        helper.setText(content, true);

        javaMailSender.send(message);
    }

    public void sendOtp(String toEmail, String otp) throws MessagingException, UnsupportedEncodingException {
        String from = "";
        String subject = "OTP to Reset Your Password";
        String content = "Dear User,<br>"
                + "Your OTP to reset your password is [[otp]].<br>"
                + "Sincerely,<br>"
                + "BookTeam.";

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(from, "BookTeam");
        helper.setTo(toEmail);
        helper.setSubject(subject);

        content = content.replace("[[otp]]", otp);
        helper.setText(content, true);

        javaMailSender.send(message);
    }
}
