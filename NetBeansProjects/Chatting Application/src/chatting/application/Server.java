package chatting.application;

import java.awt.*;
import javax.swing.*;
import java.awt.event.*;
import javax.swing.border.*;
import java.util.*;
import java.text.*;
import java.net.*;
import java.io.*;

public class Server extends JFrame implements ActionListener {
    
    JTextField text;
    JPanel a1;
    static Box vertical=Box.createVerticalBox();
    static DataOutputStream dout;
    
    Server()
    {
        setLayout(null);
        
//        Upper panel
        JPanel p1 = new JPanel();
        p1.setBackground(Color.DARK_GRAY);
        p1.setBounds(0, 0, 450,70);
        p1.setLayout(null);
        add(p1);
        
        
        ImageIcon i1=new ImageIcon(ClassLoader.getSystemResource("icons/3.png"));
        Image i2=i1.getImage().getScaledInstance(25, 25, Image.SCALE_DEFAULT);
        ImageIcon i3=new ImageIcon(i2);
        JLabel back=new JLabel(i3);
        back.setBounds(5,20,25,25);
        p1.add(back);
        
        
        back.addMouseListener(new MouseAdapter(){
            
            @Override
            public void mouseClicked(MouseEvent ae){
                System.exit(0);
            }
        });
        
        ImageIcon i4=new ImageIcon(ClassLoader.getSystemResource("icons/1.png"));
        Image i5=i4.getImage().getScaledInstance(50, 50, Image.SCALE_DEFAULT);
        ImageIcon i6=new ImageIcon(i5);
        JLabel user=new JLabel(i6);
        user.setBounds(40,7,50,50);
        p1.add(user);
        
        ImageIcon i7=new ImageIcon(ClassLoader.getSystemResource("icons/video.png"));
        Image i8=i7.getImage().getScaledInstance(30, 30, Image.SCALE_DEFAULT);
        ImageIcon i9=new ImageIcon(i8);
        JLabel video=new JLabel(i9);
        video.setBounds(350,20,30,30);
        p1.add(video);
        
        ImageIcon i10=new ImageIcon(ClassLoader.getSystemResource("icons/phone.png"));
        Image i11=i10.getImage().getScaledInstance(30, 30, Image.SCALE_DEFAULT);
        ImageIcon i12=new ImageIcon(i11);
        JLabel phone=new JLabel(i12);
        phone.setBounds(400,20,30,30);
        p1.add(phone);
        
        
        ImageIcon i13=new ImageIcon(ClassLoader.getSystemResource("icons/3icon.png"));
        Image i14=i13.getImage().getScaledInstance(20, 20, Image.SCALE_DEFAULT);
        ImageIcon i15=new ImageIcon(i14);
        JLabel more=new JLabel(i15);
        more.setBounds(430,25,20,20);
        p1.add(more);
        
        JLabel name=new JLabel("Newaj");      
        name.setBounds(110,15,100,18);
        name.setForeground(Color.WHITE);
        name.setFont(new Font("SAN_SERIF",Font.BOLD,18));
        p1.add(name);
        
        JLabel status=new JLabel("Active Now");      
        status.setBounds(110,35,100,15);
        status.setForeground(Color.WHITE);
        status.setFont(new Font("SAN_SERIF",Font.BOLD,15));
        p1.add(status);
        
//        Text Area
        a1=new JPanel();
        a1.setBounds(5,75,440,550);
        add(a1);
        
//     Footer   

        text=new JTextField();
        text.setBounds(5,630,300,70);
        text.setFont(new Font("SAN_SERIF",Font.PLAIN,20));
        add(text);
        
        JButton send=new JButton("Send");
        send.setBounds(305,630,140,70);
        send.setBackground(Color.DARK_GRAY);
        send.setForeground(Color.WHITE);
        send.setFont(new Font("SAN_SERIF",Font.PLAIN,20));
        send.addActionListener(this);
        add(send);
        
//        Whole Body

        setSize(450,700);
        setLocation(200,200);
        setUndecorated(true);
        getContentPane().setBackground(Color.WHITE);
        
        setVisible(true);
    }
    
    public void actionPerformed(ActionEvent ae)
    {
        try{
        String out=text.getText();
        
        
        JPanel p2=formatLabel(out);

        
        a1.setLayout(new BorderLayout());
        
        JPanel right=new JPanel(new BorderLayout());
        right.add(p2,BorderLayout.LINE_END);
        vertical.add(right);
        vertical.add(Box.createVerticalStrut(15));
        
        a1.add(vertical,BorderLayout.PAGE_START);
        
        dout.writeUTF(out);
        text.setText("");
        
        repaint();
        invalidate();
        validate();
        }catch(Exception e)
        {
            e.printStackTrace();
        }
    }
    
    
    public static JPanel formatLabel (String out)
    {
        JPanel panel=new JPanel();
        panel.setLayout(new BoxLayout(panel,BoxLayout.Y_AXIS));
        
        JLabel output=new JLabel("<html><p style=\"width: 150px\">"+out+"</p></html>");
        output.setFont(new Font("SAN_SERIF",Font.PLAIN,20));
        output.setBackground(Color.ORANGE);
        output.setOpaque(true);
        output.setBorder(new EmptyBorder(15,15,15,50));
        
        panel.add(output);
        
        Calendar cal=Calendar.getInstance();
        SimpleDateFormat sdf=new SimpleDateFormat("HH:mm");
        
        JLabel time=new JLabel();
        time.setText(sdf.format(cal.getTime()));
        
        panel.add(time);
        return panel;
    }
    public static void main(String args[])
    {
        new Server();
        
        try
        {
           ServerSocket skt=new ServerSocket(1234);
           while(true)
           {
               Socket s=skt.accept();
               DataInputStream din=new DataInputStream(s.getInputStream());
               dout=new DataOutputStream(s.getOutputStream());
               
               while(true)
               {
                   String msg=din.readUTF();
                   JPanel panel=formatLabel(msg);
                   
                   JPanel left=new JPanel(new BorderLayout());
                   left.add(panel,BorderLayout.LINE_START);
                   vertical.add(left);
                   
               }
               
           }
        }catch(Exception e)
        {
            e.printStackTrace();
        }
    }
}
