
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import redis.clients.jedis.Jedis;

@SpringBootApplication
@RestController
public class DemoApplication {

    private Jedis jedis;

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    DemoApplication() {
        try {
            jedis = new Jedis("localhost", 6379);
            jedis.auth("nyahello");
        } catch (Exception e) {
            System.err.println(e);
        }
    }

    @GetMapping("/hello")
    public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
        if (name.equals("World")) {
            if (jedis.exists("name")) {
                name = jedis.get("name");
            }
        } else {
            jedis.set("name", name);
        }
        return String.format("Hello %s!", name);
    }

    @GetMapping("/")
    public String index() {
        return String.format("Alive!");
    }

}
            