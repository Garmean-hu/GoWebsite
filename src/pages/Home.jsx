import React, { useState, useEffect, useCallback, useMemo } from 'react';
import '../styles.css';

function Home({ searchTerm }) {
  // 轮播图片数据
  const images = [
    { id: 1, url: require('../picture/welcome.png'), alt: '网站欢迎图片' },
    { id: 2, url: require('../picture/search.png'), alt: '探索精彩网站' },
    { id: 3, url: require('../picture/main.png'), alt: '找到你需要的网站' }
  ];

  // 当前显示的图片索引
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 自动轮播效果
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // 每3秒切换一次

    return () => clearInterval(timer); // 组件卸载时清除定时器
  }, [images.length]);

  // 分类列表
  const categories = ['全部', '学习', '娱乐', '生活', '新闻', '购物', 'DevOps', '绅士',];
  
  // DevOps子分类列表
  const devOpsSubcategories = [
    '全部',
    '代码管理',
    '构建工具',
    '自动部署',
    '持续集成',
    '配置管理',
    '容器',
    '编排',
    '服务注册与发现',
    '脚本语言',
    '日志管理',
    '系统监控',
    '性能监控',
    '压力测试',
    '预警',
    'HTTP加速',
    '消息总线',
    '应用服务器',
    'Web服务器',
    '数据库',
    '项目管理'
  ];
  
  // 当前选中的分类
  const [selectedCategory, setSelectedCategory] = useState('全部');
  
  // 当前选中的DevOps子分类
  const [selectedSubcategory, setSelectedSubcategory] = useState('全部');
  
  // 字母检索相关
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'];

  // 网站数据数组，包含拼音和分类字段
  const websites = useMemo(() => [
    // 学习类
    { name: 'Angular', pinyin: 'angular', url: 'https://angular.io/', text: 'Angular官方网址', category: '学习', description: 'Angular是Google开发的开源前端框架，用于构建高性能、跨平台的Web应用。' },
    { name: 'Atom', pinyin: 'atom', url: 'https://atom.io/', text: 'Atom编辑器官方网址', category: '学习', description: 'Atom是GitHub开发的开源文本编辑器，支持插件扩展，可定制性强。' },
    { name: 'Eclipse', pinyin: 'eclipse', url: 'https://www.eclipse.org/', text: 'Eclipse官方网址', category: '学习', description: 'Eclipse是一个开源的集成开发环境(IDE)，主要用于Java开发，也支持其他语言。' },
    
    // DevOps类 - 代码管理
    { name: 'Bitbucket', pinyin: 'bitbucket', url: 'https://bitbucket.org/', text: 'Bitbucket官方网址', category: 'DevOps', subcategory: '代码管理', description: 'Bitbucket是Atlassian提供的Git代码托管服务，支持私有仓库和团队协作。' },
    { name: 'GitHub', pinyin: 'github', url: 'https://github.com/', text: 'GitHub官方网址', category: 'DevOps', subcategory: '代码管理', description: 'GitHub是全球最大的代码托管平台，提供Git版本控制和协作功能。' },
    { name: 'GitLab', pinyin: 'gitlab', url: 'https://about.gitlab.com/', text: 'GitLab官方网址', category: 'DevOps', subcategory: '代码管理', description: 'GitLab是一个完整的DevOps平台，提供代码托管、CI/CD等功能。' },
    
    // DevOps类 - 容器
    { name: 'Docker', pinyin: 'docker', url: 'https://www.docker.com/', text: 'Docker官方网址', category: 'DevOps', subcategory: '容器', description: 'Docker是一个开源的容器化平台，用于构建、打包和部署应用。' },
    
    // DevOps类 - 代码管理
    { name: 'Subversion', pinyin: 'subversion', url: 'https://subversion.apache.org/', text: 'Subversion官方网址', category: 'DevOps', subcategory: '代码管理', description: 'Subversion(SVN)是一个集中式版本控制系统，用于跟踪代码变更。' },
    
    // DevOps类 - 构建工具
    { name: 'Apache Ant', pinyin: 'apacheant', url: 'https://ant.apache.org/', text: 'Apache Ant官方网址', category: 'DevOps', subcategory: '构建工具', description: 'Apache Ant是一个基于Java的构建工具，用于自动化软件构建过程。' },
    { name: 'Gradle', pinyin: 'gradle', url: 'https://gradle.org/', text: 'Gradle官方网址', category: 'DevOps', subcategory: '构建工具', description: 'Gradle是一个功能强大的构建工具，结合了Ant和Maven的优点。' },
    { name: 'Apache Maven', pinyin: 'apachemaven', url: 'https://maven.apache.org/', text: 'Apache Maven官方网址', category: 'DevOps', subcategory: '构建工具', description: 'Apache Maven是一个项目管理和构建工具，基于项目对象模型(POM)。' },
    
    // DevOps类 - 自动部署
    { name: 'Capistrano', pinyin: 'capistrano', url: 'https://capistranorb.com/', text: 'Capistrano官方网址', category: 'DevOps', subcategory: '自动部署', description: 'Capistrano是一个远程服务器自动化工具，用于部署Web应用。' },
    { name: 'AWS CodeDeploy', pinyin: 'awscodedeploy', url: 'https://aws.amazon.com/codedeploy/', text: 'AWS CodeDeploy官方网址', category: 'DevOps', subcategory: '自动部署', description: 'AWS CodeDeploy是AWS提供的部署服务，自动化应用部署到各种计算服务。' },
    
    // DevOps类 - 持续集成
    { name: 'Atlassian Bamboo', pinyin: 'atlassianbamboo', url: 'https://www.atlassian.com/software/bamboo', text: 'Atlassian Bamboo官方网址', category: 'DevOps', subcategory: '持续集成', description: 'Bamboo是Atlassian提供的持续集成和部署服务器。' },
    { name: 'Hudson', pinyin: 'hudson', url: 'https://hudson-ci.org/', text: 'Hudson官方网址', category: 'DevOps', subcategory: '持续集成', description: 'Hudson是一个持续集成服务器，后来发展为Jenkins。' },
    { name: 'Jenkins', pinyin: 'jenkins', url: 'https://www.jenkins.io/', text: 'Jenkins官方网址', category: 'DevOps', subcategory: '持续集成', description: 'Jenkins是一个开源的持续集成/持续部署(CI/CD)自动化服务器。' },
    
    // DevOps类 - 配置管理
    { name: 'Ansible', pinyin: 'ansible', url: 'https://www.ansible.com/', text: 'Ansible官方网址', category: 'DevOps', subcategory: '配置管理', description: 'Ansible是一个开源的配置管理和自动化工具，基于Python开发。' },
    { name: 'Chef', pinyin: 'chef', url: 'https://www.chef.io/', text: 'Chef官方网址', category: 'DevOps', subcategory: '配置管理', description: 'Chef是一个自动化平台，用于配置管理、应用部署和编排。' },
    { name: 'Puppet', pinyin: 'puppet', url: 'https://puppet.com/', text: 'Puppet官方网址', category: 'DevOps', subcategory: '配置管理', description: 'Puppet是一个配置管理工具，用于自动化基础设施管理。' },
    { name: 'SaltStack', pinyin: 'saltstack', url: 'https://saltproject.io/', text: 'SaltStack官方网址', category: 'DevOps', subcategory: '配置管理', description: 'SaltStack是一个开源的配置管理和远程执行工具。' },
    
    // DevOps类 - 容器
    { name: 'LXC', pinyin: 'lxc', url: 'https://linuxcontainers.org/lxc/', text: 'LXC官方网址', category: 'DevOps', subcategory: '容器', description: 'LXC(Linux Containers)是一种操作系统级虚拟化技术，用于在Linux系统上运行多个隔离的Linux系统。' },
    { name: 'AWS', pinyin: 'aws', url: 'https://aws.amazon.com/', text: 'AWS官方网址', category: 'DevOps', subcategory: '容器', description: 'Amazon Web Services(AWS)是Amazon提供的云计算平台，包含多种云服务。' },
    
    // DevOps类 - 编排
    { name: 'Kubernetes', pinyin: 'kubernetes', url: 'https://kubernetes.io/', text: 'Kubernetes官方网址', category: 'DevOps', subcategory: '编排', description: 'Kubernetes(K8s)是一个开源的容器编排平台，用于自动化容器的部署、扩展和管理。' },
    { name: 'Apache Mesos', pinyin: 'apachemesos', url: 'https://mesos.apache.org/', text: 'Apache Mesos官方网址', category: 'DevOps', subcategory: '编排', description: 'Apache Mesos是一个分布式系统内核，用于管理集群资源。' },
    { name: 'DC/OS', pinyin: 'dcos', url: 'https://dcos.io/', text: 'DC/OS官方网址', category: 'DevOps', subcategory: '编排', description: 'DC/OS是基于Apache Mesos的分布式操作系统，用于运行容器和大数据工作负载。' },
    
    // DevOps类 - 服务注册与发现
    { name: 'Apache ZooKeeper', pinyin: 'apachezookeeper', url: 'https://zookeeper.apache.org/', text: 'Apache ZooKeeper官方网址', category: 'DevOps', subcategory: '服务注册与发现', description: 'Apache ZooKeeper是一个分布式协调服务，用于维护配置信息、命名服务和提供分布式同步。' },
    { name: 'etcd', pinyin: 'etcd', url: 'https://etcd.io/', text: 'etcd官方网址', category: 'DevOps', subcategory: '服务注册与发现', description: 'etcd是一个分布式键值存储，用于配置共享和服务发现。' },
    { name: 'Consul', pinyin: 'consul', url: 'https://www.consul.io/', text: 'Consul官方网址', category: 'DevOps', subcategory: '服务注册与发现', description: 'Consul是HashiCorp提供的服务网格解决方案，包含服务发现、配置和分段功能。' },
    
    // DevOps类 - 脚本语言
    { name: 'Ruby', pinyin: 'ruby', url: 'https://www.ruby-lang.org/', text: 'Ruby官方网址', category: 'DevOps', subcategory: '脚本语言', description: 'Ruby是一种动态、面向对象的编程语言，以简洁和优雅著称。' },
    
    // DevOps类 - 日志管理
    { name: 'ELK Stack', pinyin: 'elkstack', url: 'https://www.elastic.co/what-is/elk-stack', text: 'ELK Stack官方网址', category: 'DevOps', subcategory: '日志管理', description: 'ELK Stack是Elasticsearch、Logstash和Kibana的组合，用于日志管理和分析。' },
    { name: 'Logentries', pinyin: 'logentries', url: 'https://logentries.com/', text: 'Logentries官方网址', category: 'DevOps', subcategory: '日志管理', description: 'Logentries是一个日志管理和分析服务，现已被SolarWinds收购。' },
    
    // DevOps类 - 系统监控
    { name: 'Datadog', pinyin: 'datadog', url: 'https://www.datadoghq.com/', text: 'Datadog官方网址', category: 'DevOps', subcategory: '系统监控', description: 'Datadog是一个监控和分析平台，用于基础设施、应用和云服务。' },
    { name: 'Graphite', pinyin: 'graphite', url: 'https://graphiteapp.org/', text: 'Graphite官方网址', category: 'DevOps', subcategory: '系统监控', description: 'Graphite是一个开源的时间序列数据存储和可视化系统，用于监控指标。' },
    { name: 'Icinga', pinyin: 'icinga', url: 'https://icinga.com/', text: 'Icinga官方网址', category: 'DevOps', subcategory: '系统监控', description: 'Icinga是一个开源的监控系统，用于监控网络资源和服务。' },
    { name: 'Nagios', pinyin: 'nagios', url: 'https://www.nagios.org/', text: 'Nagios官方网址', category: 'DevOps', subcategory: '系统监控', description: 'Nagios是一个开源的监控系统，用于监控网络、服务器和应用。' },
    
    // DevOps类 - 性能监控
    { name: 'AppDynamics', pinyin: 'appdynamics', url: 'https://www.appdynamics.com/', text: 'AppDynamics官方网址', category: 'DevOps', subcategory: '性能监控', description: 'AppDynamics是一个应用性能监控(APM)解决方案，用于监控和优化应用性能。' },
    { name: 'New Relic', pinyin: 'newrelic', url: 'https://newrelic.com/', text: 'New Relic官方网址', category: 'DevOps', subcategory: '性能监控', description: 'New Relic是一个应用性能监控平台，提供实时监控和分析。' },
    { name: 'Splunk', pinyin: 'splunk', url: 'https://www.splunk.com/', text: 'Splunk官方网址', category: 'DevOps', subcategory: '性能监控', description: 'Splunk是一个数据分析平台，用于日志管理、监控和安全分析。' },
    
    // DevOps类 - 压力测试
    { name: 'JMeter', pinyin: 'jmeter', url: 'https://jmeter.apache.org/', text: 'JMeter官方网址', category: 'DevOps', subcategory: '压力测试', description: 'Apache JMeter是一个开源的负载测试工具，用于测试应用性能。' },
    { name: 'BlazeMeter', pinyin: 'blazemeter', url: 'https://www.blazemeter.com/', text: 'BlazeMeter官方网址', category: 'DevOps', subcategory: '压力测试', description: 'BlazeMeter是一个负载测试平台，基于JMeter，提供云服务。' },
    { name: 'loader.io', pinyin: 'loaderio', url: 'https://loader.io/', text: 'loader.io官方网址', category: 'DevOps', subcategory: '压力测试', description: 'loader.io是一个简单的负载测试工具，用于测试Web应用的性能。' },
    
    // DevOps类 - 预警
    { name: 'PagerDuty', pinyin: 'pagerduty', url: 'https://www.pagerduty.com/', text: 'PagerDuty官方网址', category: 'DevOps', subcategory: '预警', description: 'PagerDuty是一个事件响应平台，用于处理和通知团队关于系统问题。' },
    { name: 'Pingdom', pinyin: 'pingdom', url: 'https://www.pingdom.com/', text: 'Pingdom官方网址', category: 'DevOps', subcategory: '预警', description: 'Pingdom是一个网站监控服务，提供正常运行时间监控和性能测试。' },
    
    // DevOps类 - HTTP加速
    { name: 'Varnish', pinyin: 'varnish', url: 'https://varnish-cache.org/', text: 'Varnish官方网址', category: 'DevOps', subcategory: 'HTTP加速', description: 'Varnish是一个HTTP反向代理缓存服务器，用于加速网站访问。' },
    
    // DevOps类 - 消息总线
    { name: 'Apache ActiveMQ', pinyin: 'apacheactivemq', url: 'https://activemq.apache.org/', text: 'Apache ActiveMQ官方网址', category: 'DevOps', subcategory: '消息总线', description: 'Apache ActiveMQ是一个开源的消息 broker，实现了JMS规范。' },
    { name: 'AWS SQS', pinyin: 'awssqs', url: 'https://aws.amazon.com/sqs/', text: 'AWS SQS官方网址', category: 'DevOps', subcategory: '消息总线', description: 'Amazon Simple Queue Service(SQS)是一个托管的消息队列服务，用于解耦应用组件。' },
    
    // DevOps类 - 应用服务器
    { name: 'Apache Tomcat', pinyin: 'apachetomcat', url: 'https://tomcat.apache.org/', text: 'Apache Tomcat官方网址', category: 'DevOps', subcategory: '应用服务器', description: 'Apache Tomcat是一个开源的Java Servlet容器，用于运行Java Web应用。' },
    { name: 'JBoss', pinyin: 'jboss', url: 'https://www.redhat.com/en/technologies/jboss-middleware/application-platform', text: 'JBoss官方网址', category: 'DevOps', subcategory: '应用服务器', description: 'JBoss是Red Hat提供的开源应用服务器，现称为WildFly。' },
    
    // DevOps类 - Web服务器
    { name: 'Apache HTTP Server', pinyin: 'apachehttpserver', url: 'https://httpd.apache.org/', text: 'Apache HTTP Server官方网址', category: 'DevOps', subcategory: 'Web服务器', description: 'Apache HTTP Server是世界上最流行的Web服务器软件，开源且功能强大。' },
    { name: 'Nginx', pinyin: 'nginx', url: 'https://nginx.org/', text: 'Nginx官方网址', category: 'DevOps', subcategory: 'Web服务器', description: 'Nginx是一个高性能的HTTP和反向代理服务器，以稳定性和低资源消耗著称。' },
    { name: 'IIS', pinyin: 'iis', url: 'https://www.iis.net/', text: 'IIS官方网址', category: 'DevOps', subcategory: 'Web服务器', description: 'Internet Information Services(IIS)是Microsoft提供的Web服务器软件。' },
    
    // DevOps类 - 数据库
    { name: 'MySQL', pinyin: 'mysql', url: 'https://www.mysql.com/', text: 'MySQL官方网址', category: 'DevOps', subcategory: '数据库', description: 'MySQL是世界上最流行的开源关系型数据库管理系统。' },
    { name: 'Oracle', pinyin: 'oracle', url: 'https://www.oracle.com/', text: 'Oracle官方网址', category: 'DevOps', subcategory: '数据库', description: 'Oracle Database是Oracle公司提供的关系型数据库管理系统，功能强大。' },
    { name: 'PostgreSQL', pinyin: 'postgresql', url: 'https://www.postgresql.org/', text: 'PostgreSQL官方网址', category: 'DevOps', subcategory: '数据库', description: 'PostgreSQL是一个功能强大的开源对象关系型数据库系统。' },
    { name: 'Cassandra', pinyin: 'cassandra', url: 'https://cassandra.apache.org/', text: 'Cassandra官方网址', category: 'DevOps', subcategory: '数据库', description: 'Apache Cassandra是一个分布式NoSQL数据库，专为处理大量数据而设计。' },
    { name: 'MongoDB', pinyin: 'mongodb', url: 'https://www.mongodb.com/', text: 'MongoDB官方网址', category: 'DevOps', subcategory: '数据库', description: 'MongoDB是一个文档型NoSQL数据库，用于处理非结构化数据。' },
    { name: 'Redis', pinyin: 'redis', url: 'https://redis.io/', text: 'Redis官方网址', category: 'DevOps', subcategory: '数据库', description: 'Redis是一个开源的内存数据结构存储，可用作数据库、缓存和消息代理。' },
    
    // DevOps类 - 项目管理
    { name: 'Jira', pinyin: 'jira', url: 'https://www.atlassian.com/software/jira', text: 'Jira官方网址', category: 'DevOps', subcategory: '项目管理', description: 'Jira是Atlassian提供的项目管理工具，用于敏捷开发和问题跟踪。' },
    { name: 'Asana', pinyin: 'asana', url: 'https://asana.com/', text: 'Asana官方网址', category: 'DevOps', subcategory: '项目管理', description: 'Asana是一个项目管理和团队协作工具，帮助团队跟踪工作。' },
    { name: 'Taiga', pinyin: 'taiga', url: 'https://taiga.io/', text: 'Taiga官方网址', category: 'DevOps', subcategory: '项目管理', description: 'Taiga是一个开源的项目管理平台，专为敏捷开发而设计。' },
    { name: 'Trello', pinyin: 'trello', url: 'https://trello.com/', text: 'Trello官方网址', category: 'DevOps', subcategory: '项目管理', description: 'Trello是一个基于看板的项目管理工具，简单直观。' },
    { name: 'Basecamp', pinyin: 'basecamp', url: 'https://basecamp.com/', text: 'Basecamp官方网址', category: 'DevOps', subcategory: '项目管理', description: 'Basecamp是一个项目管理和团队协作平台，由37signals开发。' },
    { name: 'Pivotal Tracker', pinyin: 'pivotaltracker', url: 'https://www.pivotaltracker.com/', text: 'Pivotal Tracker官方网址', category: 'DevOps', subcategory: '项目管理', description: 'Pivotal Tracker是一个敏捷项目管理工具，用于规划和跟踪项目进度。' },
    { name: 'IntelliJ IDEA', pinyin: 'intellijidea', url: 'https://www.jetbrains.com/idea/', text: 'IntelliJ IDEA官方网址', category: '学习', description: 'IntelliJ IDEA是JetBrains开发的Java集成开发环境(IDE)，功能强大。' },
    { name: 'Java', pinyin: 'java', url: 'https://www.java.com/', text: 'Java官方网址', category: '学习', description: 'Java是一种广泛使用的计算机编程语言，具有跨平台特性。' },
    { name: 'JavaScript', pinyin: 'javascript', url: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript', text: 'JavaScript官方文档', category: '学习', description: 'JavaScript是一种脚本语言，主要用于Web前端开发，也可用于后端开发。' },
    { name: 'jQuery', pinyin: 'jquery', url: 'https://jquery.com/', text: 'jQuery官方网址', category: '学习', description: 'jQuery是一个快速、简洁的JavaScript库，简化了HTML文档遍历和事件处理。' },
    { name: 'NetBeans', pinyin: 'netbeans', url: 'https://netbeans.apache.org/', text: 'NetBeans官方网址', category: '学习', description: 'NetBeans是一个开源的集成开发环境(IDE)，支持多种编程语言。' },
    { name: 'Node.js', pinyin: 'nodejs', url: 'https://nodejs.org/', text: 'Node.js官方网址', category: '学习', description: 'Node.js是一个基于Chrome V8引擎的JavaScript运行环境，用于服务器端开发。' },
    { name: 'PyCharm', pinyin: 'pycharm', url: 'https://www.jetbrains.com/pycharm/', text: 'PyCharm官方网址', category: '学习', description: 'PyCharm是JetBrains开发的Python集成开发环境(IDE)，功能强大。' },
    { name: 'Python', pinyin: 'python', url: 'https://www.python.org/', text: 'Python官方网址', category: '学习', description: 'Python是一种简单易学、功能强大的编程语言，广泛应用于各种领域。' },
    { name: 'React', pinyin: 'react', url: 'https://reactjs.org/', text: 'React官方网址', category: '学习', description: 'React是Facebook开发的开源JavaScript库，用于构建用户界面。' },
    { name: 'Sublime Text', pinyin: 'sublimetext', url: 'https://www.sublimetext.com/', text: 'Sublime Text官方网址', category: '学习', description: 'Sublime Text是一个流行的文本编辑器，以速度和简洁著称。' },
    { name: 'TypeScript', pinyin: 'typescript', url: 'https://www.typescriptlang.org/', text: 'TypeScript官方网址', category: '学习', description: 'TypeScript是Microsoft开发的JavaScript超集，添加了类型系统。' },
    { name: 'Visual Studio Code', pinyin: 'visualstudiocode', url: 'https://code.visualstudio.com/', text: 'Visual Studio Code官方网址', category: '学习', description: 'Visual Studio Code是Microsoft开发的开源代码编辑器，支持多种编程语言。' },
    { name: 'Vue', pinyin: 'vue', url: 'https://vuejs.org/', text: 'Vue官方网址', category: '学习', description: 'Vue.js是一个渐进式JavaScript框架，用于构建用户界面。' },
    // 娱乐类
    { name: 'Bilibili', pinyin: 'bilibili', url: 'https://www.bilibili.com/', text: 'Bilibili官方网址', category: '娱乐', description: 'Bilibili是中国知名的视频分享网站，以动漫、游戏、娱乐内容为主。' },
    { name: '抖音', pinyin: 'douyin', url: 'https://www.douyin.com/', text: '抖音官方网址', category: '娱乐', description: '抖音是字节跳动开发的短视频分享平台，广受欢迎。' },
    { name: '微博', pinyin: 'weibo', url: 'https://weibo.com/', text: '微博官方网址', category: '娱乐', description: '微博是中国知名的社交媒体平台，类似于Twitter。' },
    { name: '知乎', pinyin: 'zhihu', url: 'https://www.zhihu.com/', text: '知乎官方网址', category: '娱乐', description: '知乎是中国知名的问答社区，用户可以分享知识和经验。' },
    // 生活类
    { name: '阿里巴巴', pinyin: 'alibaba', url: 'https://www.alibaba.com/', text: '阿里巴巴官方网址', category: '生活', description: '阿里巴巴是全球领先的电子商务公司，提供B2B、B2C等服务。' },
    { name: '百度', pinyin: 'baidu', url: 'https://www.baidu.com/', text: '百度官方网址', category: '生活', description: '百度是中国最大的搜索引擎，提供搜索、地图等多种服务。' },
    { name: '滴滴出行', pinyin: 'didichuxing', url: 'https://www.didiglobal.com/', text: '滴滴出行官方网址', category: '生活', description: '滴滴出行是中国领先的网约车平台，提供打车、顺风车等服务。' },
    { name: '谷歌', pinyin: 'guge', url: 'https://www.google.com/', text: '谷歌官方网址', category: '生活', description: '谷歌是全球最大的搜索引擎，提供搜索、邮箱、地图等多种服务。' },
    { name: 'QQ', pinyin: 'qq', url: 'https://im.qq.com/', text: 'QQ官方网址', category: '生活', description: 'QQ是腾讯开发的即时通讯软件，在中国广受欢迎。' },
    { name: '腾讯', pinyin: 'tengxun', url: 'https://www.tencent.com/', text: '腾讯官方网址', category: '生活', description: '腾讯是中国领先的互联网公司，开发了QQ、微信等产品。' },
    { name: '微信', pinyin: 'weixin', url: 'https://weixin.qq.com/', text: '微信官方网址', category: '生活', description: '微信是腾讯开发的社交媒体和支付应用，在中国广泛使用。' },
    { name: '字节跳动', pinyin: 'zijietiaodong', url: 'https://bytedance.com/', text: '字节跳动官方网址', category: '生活', description: '字节跳动是全球领先的内容平台公司，开发了抖音、TikTok等产品。' },
    // 新闻类
    { name: '人民日报', pinyin: 'renminribao', url: 'http://www.people.com.cn/', text: '人民日报官方网址', category: '新闻', description: '人民日报是中国共产党中央委员会机关报，是中国最具权威性的报纸之一。' },
    { name: '新华社', pinyin: 'xinhuashe', url: 'http://www.xinhuanet.com/', text: '新华社官方网址', category: '新闻', description: '新华社是中国国家通讯社，提供国内外新闻报道。' },
    { name: '央视新闻', pinyin: 'yangshixinwen', url: 'http://news.cctv.com/', text: '央视新闻官方网址', category: '新闻', description: '央视新闻是中国中央电视台的新闻网站，提供权威新闻报道。' },
    { name: '中国新闻网', pinyin: 'zhongguoxinwenwang', url: 'http://www.chinanews.com/', text: '中国新闻网官方网址', category: '新闻', description: '中国新闻网是中国新闻社主办的新闻网站，提供综合新闻报道。' },
    { name: '环球网', pinyin: 'huanqiuwang', url: 'http://www.huanqiu.com/', text: '环球网官方网址', category: '新闻', description: '环球网是环球时报主办的新闻网站，关注国际新闻。' },
    { name: '凤凰网', pinyin: 'fenghuangwang', url: 'http://www.ifeng.com/', text: '凤凰网官方网址', category: '新闻', description: '凤凰网是凤凰卫视主办的新闻网站，提供综合新闻报道。' },
    { name: '澎湃新闻', pinyin: 'pengpaixinwen', url: 'https://www.thepaper.cn/', text: '澎湃新闻官方网址', category: '新闻', description: '澎湃新闻是上海报业集团主办的新媒体，以深度报道著称。' },
    { name: '腾讯新闻', pinyin: 'tengxunxinwen', url: 'https://news.qq.com/', text: '腾讯新闻官方网址', category: '新闻', description: '腾讯新闻是腾讯公司的新闻网站，提供综合新闻报道。' },
    { name: '网易新闻', pinyin: 'wangyixinwen', url: 'https://news.163.com/', text: '网易新闻官方网址', category: '新闻', description: '网易新闻是网易公司的新闻网站，提供综合新闻报道。' },
    { name: '新浪新闻', pinyin: 'xinlangxinwen', url: 'https://news.sina.com.cn/', text: '新浪新闻官方网址', category: '新闻', description: '新浪新闻是新浪公司的新闻网站，提供综合新闻报道。' },
    { name: '英国广播公司', pinyin: 'yingguoguangbogongsi', url: 'https://www.bbc.com/', text: 'BBC官方网址', category: '新闻', description: '英国广播公司(BBC)是英国的公共广播机构，提供全球新闻报道。' },
    { name: '路透社', pinyin: 'lutushe', url: 'https://www.reuters.com/', text: '路透社官方网址', category: '新闻', description: '路透社是英国的国际通讯社，提供全球新闻报道。' },
    { name: '美联社', pinyin: 'meilianshe', url: 'https://apnews.com/', text: '美联社官方网址', category: '新闻', description: '美联社是美国的国际通讯社，提供全球新闻报道。' },
    { name: '法新社', pinyin: 'faxinshe', url: 'https://www.afp.com/', text: '法新社官方网址', category: '新闻', description: '法新社是法国的国际通讯社，提供全球新闻报道。' },
    // 购物类
    { name: '京东', pinyin: 'jingdong', url: 'https://www.jd.com/', text: '京东官方网址', category: '购物', description: '京东是中国领先的自营式电商企业，提供正品保障和快速配送。' },
    { name: '淘宝', pinyin: 'taobao', url: 'https://www.taobao.com/', text: '淘宝官方网址', category: '购物', description: '淘宝是阿里巴巴旗下的C2C电商平台，商品种类丰富。' },
    { name: '天猫', pinyin: 'tianmao', url: 'https://www.tmall.com/', text: '天猫官方网址', category: '购物', description: '天猫是阿里巴巴旗下的B2C电商平台，主要销售品牌商品。' },
    { name: '拼多多', pinyin: 'pinduoduo', url: 'https://www.pinduoduo.com/', text: '拼多多官方网址', category: '购物', description: '拼多多是中国新兴的电商平台，以社交电商和低价策略著称。' },
    { name: '苏宁易购', pinyin: 'suningyigou', url: 'https://www.suning.com/', text: '苏宁易购官方网址', category: '购物', description: '苏宁易购是中国领先的家电零售商，提供线上线下一体化服务。' },
    { name: '唯品会', pinyin: 'weipinhui', url: 'https://www.vip.com/', text: '唯品会官方网址', category: '购物', description: '唯品会是中国领先的品牌折扣电商平台，以特卖模式著称。' },
    { name: '亚马逊', pinyin: 'yamaxun', url: 'https://www.amazon.cn/', text: '亚马逊中国官方网址', category: '购物', description: '亚马逊是全球最大的电商平台，亚马逊中国是其在中国的分支。' },
    { name: '当当网', pinyin: 'dangdangwang', url: 'https://www.dangdang.com/', text: '当当网官方网址', category: '购物', description: '当当网是中国领先的网上书店，也销售其他商品。' },
    { name: '国美在线', pinyin: 'guomeizaixian', url: 'https://www.gome.com.cn/', text: '国美在线官方网址', category: '购物', description: '国美在线是国美电器的线上商城，主要销售家电产品。' },
    { name: '网易严选', pinyin: 'wangyiyanxuan', url: 'https://you.163.com/', text: '网易严选官方网址', category: '购物', description: '网易严选是网易公司的自营电商品牌，提供高性价比的生活用品。' },
    { name: '小红书', pinyin: 'xiaohongshu', url: 'https://www.xiaohongshu.com/', text: '小红书官方网址', category: '购物', description: '小红书是中国知名的生活方式分享平台，也提供电商服务。' },
    { name: '考拉海购', pinyin: 'kaolahigou', url: 'https://www.kaola.com/', text: '考拉海购官方网址', category: '购物', description: '考拉海购是阿里巴巴旗下的跨境电商平台，销售海外商品。' },
    { name: '美团外卖', pinyin: 'meituanwaimai', url: 'https://waimai.meituan.com/', text: '美团外卖官方网址', category: '购物', description: '美团外卖是美团公司的外卖配送服务，提供餐饮外卖。' },
    { name: '饿了么', pinyin: 'eleme', url: 'https://www.ele.me/', text: '饿了么官方网址', category: '购物', description: '饿了么是阿里巴巴旗下的外卖配送服务，提供餐饮外卖。' },

// 绅士类
    { name: '51吃瓜网', pinyin: 'wuyichiguawang', url: 'https://wikiwiki.hwfhetxv.xyz/', text: '51吃瓜网官方网址', category: '绅士' },
    { name: 'Pornhub', pinyin: 'pornhub', url: 'https://pornhub.com/', text: 'Pornhub官方网址(VPN访问)', category: '绅士' },
    { name: 'Pornhub.llc', pinyin: 'pornhub.llc', url: 'https://cn.pornhub.moe/', text: 'Pornhub.llc网址(无需VPN)', category: '绅士' },
    { name: '无限臀山', pinyin: '无限臀山', url: 'https://wxts.wuxiants554.com/', text: '无限臀山官方网址', category: '绅士' },
    { name: '91短视频', pinyin: 'jiuyi短视频', url: 'https://91dsp.fun/', text: '91短视频官方网址', category: '绅士' },
    { name: 'XVideo', pinyin: 'xvideos', url: 'https://xvideos.com/', text: 'XVideos官方网址(VPN访问)', category: '绅士' },
    { name: '俄罗斯搜索引擎', pinyin: 'eluosisousuoyinqing', url: 'http://www.yandex.com/', text: '俄罗斯搜索引擎官方网址', category: '绅士' },
    { name: '每日大赛', pinyin: 'meiridasai', url: 'https://h5gpz2.aspyies.xyz/', text: '每日大赛官方网址', category: '绅士' },
    
  ], []);

  // 获取网站名称的首字母（支持中文拼音首字母和数字）
  const getFirstLetter = useCallback((name) => {
    // 检查是否以数字开头
    if (/^[0-9]/.test(name)) {
      return '#';
    }
    
    // 检查是否有拼音字段
    const website = websites.find(w => w.name === name);
    if (website && website.pinyin) {
      return website.pinyin[0].toUpperCase();
    }
    
    // 默认返回 #
    return '#';
  }, [websites]);

  // 对网站列表按照pinyin字段进行排序，数字优先
  const sortedWebsites = [...websites].sort((a, b) => {
    // 检查是否以数字开头
    const aIsNumber = /^[0-9]/.test(a.name);
    const bIsNumber = /^[0-9]/.test(b.name);
    
    // 数字优先
    if (aIsNumber && !bIsNumber) return -1;
    if (!aIsNumber && bIsNumber) return 1;
    
    // 数字之间按pinyin字段排序
    if (aIsNumber && bIsNumber) {
      return a.pinyin.localeCompare(b.pinyin, 'zh-CN', {
        sensitivity: 'base',
        numeric: true
      });
    }
    
    // 按照pinyin字段进行排序
    return a.pinyin.localeCompare(b.pinyin, 'zh-CN', {
      sensitivity: 'base',  // 忽略大小写差异
      numeric: true,         // 数字按数值排序
      caseFirst: 'lower'     // 小写优先
    });
  });

  // 根据搜索词和分类过滤网站
  const filteredWebsites = sortedWebsites.filter(website => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = (
      website.name.toLowerCase().includes(searchLower) ||
      website.text.toLowerCase().includes(searchLower) ||
      website.url.toLowerCase().includes(searchLower) ||
      website.pinyin.includes(searchLower)
    );
    
    const matchesCategory = (selectedCategory === '全部' && website.category !== '绅士') || website.category === selectedCategory;
    
    // 只有DevOps分类下的网站需要进行子分类过滤
    const matchesSubcategory = (
      selectedCategory !== 'DevOps' || 
      selectedSubcategory === '全部' || 
      website.subcategory === selectedSubcategory
    );
    
    return matchesSearch && matchesCategory && matchesSubcategory;
  });
  
  // 滚动到对应字母位置
  const scrollToLetter = (letter) => {
    // 找到第一个以该字母开头的网站的索引
    const targetIndex = filteredWebsites.findIndex(website => {
      const firstLetter = getFirstLetter(website.name);
      return firstLetter === letter;
    });
    
    // 如果找到对应网站，滚动到该位置
    if (targetIndex !== -1) {
      // 滚动到网站列表的顶部，然后再滚动到对应位置
      const container = document.querySelector('.website-info');
      if (container) {
        // 计算滚动位置
        const infoBlocks = container.querySelectorAll('.info-block');
        if (infoBlocks[targetIndex]) {
          infoBlocks[targetIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          // 如果找不到对应元素，滚动到顶部
          container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };
  
// 滚动监听，高亮当前浏览区域的字母
const [activeLetter, setActiveLetter] = useState('');

useEffect(() => {
  // 添加防抖处理
  let timeoutId;
  
  const handleScroll = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      // 计算当前可见区域的中心位置
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const centerPosition = scrollTop + windowHeight / 2;
      
      // 找到当前可见区域的网站
      const infoBlocks = document.querySelectorAll('.info-block');
      let currentLetter = '';
      
      infoBlocks.forEach((block, index) => {
        if (index < filteredWebsites.length) {
          const blockTop = block.offsetTop;
          const blockHeight = block.offsetHeight;
          
          // 检查块是否在可见区域中心附近
          if (blockTop <= centerPosition && blockTop + blockHeight >= centerPosition) {
            const website = filteredWebsites[index];
            currentLetter = getFirstLetter(website.name);
          }
        }
      });
      
      setActiveLetter(currentLetter);
    }, 100); // 100ms 防抖
  };
  
  // 添加滚动事件监听器
  window.addEventListener('scroll', handleScroll);
  
  // 初始检查
  handleScroll();
  
  // 清理事件监听器
  return () => {
    window.removeEventListener('scroll', handleScroll);
    clearTimeout(timeoutId);
  };
}, [filteredWebsites, getFirstLetter]);
  // 鼠标悬停显示简介
  useEffect(() => {
    const addHoverListeners = () => {
      const infoBlocks = document.querySelectorAll('.info-block');
      
      infoBlocks.forEach(block => {
        const description = block.querySelector('.website-description');
        if (description) {
          block.addEventListener('mouseenter', () => {
            description.style.display = 'block';
          });
          
          block.addEventListener('mouseleave', () => {
            description.style.display = 'none';
          });
        }
      });
    };
    
    // 添加悬停事件监听器
    addHoverListeners();
    
    // 当filteredWebsites变化时，重新添加事件监听器
    const observer = new MutationObserver(addHoverListeners);
    const container = document.querySelector('.website-info');
    if (container) {
      observer.observe(container, {
        childList: true,
        subtree: true
      });
    }
    
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [filteredWebsites]);

  return (
    <main className="main" style={{ position: 'relative' }}>
      <section className="website-info">
        <div className="container">
          {/* 图片轮播 */}
          <div className="image-carousel">
            <div className="carousel-container">
              <img 
                src={images[currentImageIndex].url} 
                alt={images[currentImageIndex].alt} 
                className="carousel-image"
              />
              <div className="carousel-indicators">
                {images.map((image, index) => (
                  <button 
                    key={image.id}
                    className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
              <button 
                className="carousel-button prev"
                onClick={() => setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
              >
                &#10094;
              </button>
              <button 
                className="carousel-button next"
                onClick={() => setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
              >
                &#10095;
              </button>
            </div>
          </div>
          
          {/* 分类栏目 */}
          <div className="categories">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''} ${category === '绅士' ? 'gentleman-category' : ''}`}
                onClick={() => {
                  setSelectedCategory(category);
                  // 切换分类时重置子分类
                  setSelectedSubcategory('全部');
                }}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* DevOps子分类栏目 - 仅当选择DevOps分类时显示 */}
          {selectedCategory === 'DevOps' && (
            <div className="categories subcategories">
              {devOpsSubcategories.map(subcategory => (
                <button
                  key={subcategory}
                  className={`category-btn ${selectedSubcategory === subcategory ? 'active' : ''}`}
                  onClick={() => setSelectedSubcategory(subcategory)}
                >
                  {subcategory}
                </button>
              ))}
            </div>
          )}
          
          {/* 显示搜索结果数量 */}
          {(searchTerm || selectedCategory !== '全部') && (
            <div className="search-result-info">
              <p>共找到 {filteredWebsites.length} 个相关网站</p>
            </div>
          )}
          
          {/* 渲染过滤后的网站列表 */}
          {filteredWebsites.map((website, index) => (
            <div 
              key={index} 
              className="info-block"
              style={{ 
                position: 'relative',
                cursor: 'pointer'
              }}
            >
              <p>
                {website.text}：
                <a href={website.url} target="_blank" rel="noopener noreferrer">
                  {website.url}
                </a>
              </p>
              {website.description && (
                <div 
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '0',
                    right: '0',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e8e8e8',
                    borderRadius: '4px',
                    padding: '10px',
                    margin: '5px 0',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                    fontSize: '14px',
                    color: '#333',
                    display: 'none',
                    zIndex: 10
                  }}
                  className="website-description"
                >
                  {website.description}
                </div>
              )}
            </div>
          ))}
          
          {/* 搜索结果为空时显示 */}
          {(searchTerm || selectedCategory !== '全部') && filteredWebsites.length === 0 && (
            <div className="info-block">
              <p>未找到相关网站，请尝试其他关键词或分类</p>
            </div>
          )}
        </div>
      </section>
      
      {/* 字母检索栏 */}
      <div className="letter-index">
        {letters.map(letter => (
          <button
            key={letter}
            className={`letter-btn ${activeLetter === letter ? 'active' : ''}`}
            onClick={() => scrollToLetter(letter)}
            title={`滚动到以${letter}开头的网站`}
          >
            {letter}
          </button>
        ))}
      </div>
    </main>
  );
}

export default Home;
