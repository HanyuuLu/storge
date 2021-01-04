package com.github.hanyuulu.demo.demo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import cn.hutool.core.util.IdUtil;

@Component
public class Service {
    public List<String> hugeResponseCall(long nums) {
        List<String> bigList = new ArrayList<String>();
        for (int i = 0; i < nums; ++i) {
            bigList.add(IdUtil.objectId());
        }
        return bigList;
    }
}
