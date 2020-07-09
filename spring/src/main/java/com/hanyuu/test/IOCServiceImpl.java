package com.hanyuu.test;

// 使用配置文件的方式注入
public class IOCServiceImpl implements IOCService {

    @Override
    public String hollo() {
        return "Hello,IOC";
    }
}