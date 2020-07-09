package com.hanyuu.test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

// 使用注解方式注入
@Service(value = "ioc2")
public class IOCService2Impl implements IOCService {

    @Autowired
    @Qualifier(value = "iocService")
    private IOCService iocService;

    @Override
    public String hollo() {
        return "Hello,IOC";
    }
}

