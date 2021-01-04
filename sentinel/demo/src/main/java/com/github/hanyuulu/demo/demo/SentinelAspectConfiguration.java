package com.github.hanyuulu.demo.demo;

import com.alibaba.csp.sentinel.annotation.aspectj.SentinelResourceAspect;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class SentinelAspectConfiguration {

    @Bean
    public SentinelResourceAspect sentinelResourceAspect() {
        return new SentinelResourceAspect();
    }
}
