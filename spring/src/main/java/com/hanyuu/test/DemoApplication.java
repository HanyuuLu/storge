package com.hanyuu.test;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.util.Date;

import javax.sound.midi.SysexMessage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

@SpringBootApplication
public class DemoApplication {
	public static void main(final String[] args) {
		wfs("lastbuild.cache");
		
		final ApplicationContext applicationContext = new FileSystemXmlApplicationContext("beans.xml");
		System.out.println("🟢[Running!]");
		// SpringApplication.run(DemoApplication.class, args);
		final Student student = (Student) applicationContext.getBean("student");

		System.out.println("Name : " + student.getName());
		System.out.println("Age : " + student.getAge());
	}

	public static void wfs(String path) {
		try {
			File file = new File(path);
			System.out.println("🚧" + file.toPath());
			file.createNewFile();
			System.out.println("🚧");
			FileWriter fwriter = new FileWriter(file);
			BufferedWriter writer = new BufferedWriter(fwriter);
			writer.write(new Date().toString());
			writer.flush();
			writer.close();
			fwriter.close();
			System.out.println("🔵");
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}

	}
}
