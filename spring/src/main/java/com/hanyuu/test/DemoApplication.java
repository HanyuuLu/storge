package com.hanyuu.test;

// import org.apache.catalina.core.ApplicationContext;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

@SpringBootApplication
public class DemoApplication {
	public static void main(String[] args) {
		ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans/beans.xml");
		// SpringApplication.run(DemoApplication.class, args);
		Student student = (Student) applicationContext.getBean("student");
		System.out.println("Name : " + student.getName());
		System.out.println("Age : " + student.getAge());
	}

}
