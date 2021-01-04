package com.github.hanyuulu.demo.demo;

import java.util.List;

import com.alibaba.csp.sentinel.annotation.SentinelResource;
import com.alibaba.csp.sentinel.slots.block.BlockException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StopWatch;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class Controller {
    @Autowired
    private Service service;

    @GetMapping(value = "/wait")
    @SentinelResource(value = "LONG_TIME_CONTROLLER", blockHandler = "blockHandler", fallback = "fallback")
    public String getMethodName(@RequestParam(defaultValue = "1000") Long delay) throws InterruptedException {
        StopWatch sw = new StopWatch("wait");
        sw.start();
        Thread.sleep(delay);
        sw.stop();
        log.debug("this request cost {} ms", sw.getTotalTimeMillis());
        return String.format("this request cost %d ms", sw.getTotalTimeMillis());
    }

    @GetMapping(value = "/bigList")
    public List<String> getHugeResponse(@RequestParam(defaultValue = "1000") Long nums){
        return service.hugeResponseCall(nums);
    }

    public String blockHandler(Long delay, BlockException blockException) {
        log.warn("blockHandler called with " + blockException.toString());
        return "blockHandler called with " + blockException.toString();
    }

    public String fallback(Long delay) {
        log.error("fallback called!");
        return "fallback";
    }
}
