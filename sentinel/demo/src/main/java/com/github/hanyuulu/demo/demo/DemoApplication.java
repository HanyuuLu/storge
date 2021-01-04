package com.github.hanyuulu.demo.demo;

import java.util.ArrayList;
import java.util.List;

import com.alibaba.csp.sentinel.slots.block.RuleConstant;
import com.alibaba.csp.sentinel.slots.block.flow.FlowRule;
import com.alibaba.csp.sentinel.slots.block.flow.FlowRuleManager;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import lombok.extern.slf4j.Slf4j;

@SpringBootApplication
@Slf4j
public class DemoApplication implements CommandLineRunner{

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Override
	public void run(String... args) {
		log.debug("sentinel注入");
		List<FlowRule> rules = new ArrayList<>();
		FlowRule rule = new FlowRule();
		rule.setResource("LONG_TIME_CONTROLLER");
		rule.setGrade(RuleConstant.FLOW_GRADE_QPS);
		rule.setCount(1);
		rules.add(rule);
		FlowRuleManager.loadRules(rules);
	}
}
