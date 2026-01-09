import React, { useState, useEffect } from 'react';
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
  const categories = ['全部', '学习', '娱乐', '生活', '新闻', '购物', '绅士'];
  
  // 当前选中的分类
  const [selectedCategory, setSelectedCategory] = useState('全部');

  // 网站数据数组，包含拼音和分类字段
  const websites = [
    // 学习类
    { name: 'Angular', pinyin: 'angular', url: 'https://angular.io/', text: 'Angular官方网址', category: '学习' },
    { name: 'Atom', pinyin: 'atom', url: 'https://atom.io/', text: 'Atom编辑器官方网址', category: '学习' },
    { name: 'Bitbucket', pinyin: 'bitbucket', url: 'https://bitbucket.org/', text: 'Bitbucket官方网址', category: '学习' },
    { name: 'Docker', pinyin: 'docker', url: 'https://www.docker.com/', text: 'Docker官方网址', category: '学习' },
    { name: 'Eclipse', pinyin: 'eclipse', url: 'https://www.eclipse.org/', text: 'Eclipse官方网址', category: '学习' },
    { name: 'GitHub', pinyin: 'github', url: 'https://github.com/', text: 'GitHub官方网址', category: '学习' },
    { name: 'GitLab', pinyin: 'gitlab', url: 'https://about.gitlab.com/', text: 'GitLab官方网址', category: '学习' },
    { name: 'IntelliJ IDEA', pinyin: 'intellijidea', url: 'https://www.jetbrains.com/idea/', text: 'IntelliJ IDEA官方网址', category: '学习' },
    { name: 'Java', pinyin: 'java', url: 'https://www.java.com/', text: 'Java官方网址', category: '学习' },
    { name: 'JavaScript', pinyin: 'javascript', url: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript', text: 'JavaScript官方文档', category: '学习' },
    { name: 'jQuery', pinyin: 'jquery', url: 'https://jquery.com/', text: 'jQuery官方网址', category: '学习' },
    { name: 'NetBeans', pinyin: 'netbeans', url: 'https://netbeans.apache.org/', text: 'NetBeans官方网址', category: '学习' },
    { name: 'Node.js', pinyin: 'nodejs', url: 'https://nodejs.org/', text: 'Node.js官方网址', category: '学习' },
    { name: 'PyCharm', pinyin: 'pycharm', url: 'https://www.jetbrains.com/pycharm/', text: 'PyCharm官方网址', category: '学习' },
    { name: 'Python', pinyin: 'python', url: 'https://www.python.org/', text: 'Python官方网址', category: '学习' },
    { name: 'React', pinyin: 'react', url: 'https://reactjs.org/', text: 'React官方网址', category: '学习' },
    { name: 'Sublime Text', pinyin: 'sublimetext', url: 'https://www.sublimetext.com/', text: 'Sublime Text官方网址', category: '学习' },
    { name: 'TypeScript', pinyin: 'typescript', url: 'https://www.typescriptlang.org/', text: 'TypeScript官方网址', category: '学习' },
    { name: 'Visual Studio Code', pinyin: 'visualstudiocode', url: 'https://code.visualstudio.com/', text: 'Visual Studio Code官方网址', category: '学习' },
    { name: 'Vue', pinyin: 'vue', url: 'https://vuejs.org/', text: 'Vue官方网址', category: '学习' },
    // 娱乐类
    { name: 'Bilibili', pinyin: 'bilibili', url: 'https://www.bilibili.com/', text: 'Bilibili官方网址', category: '娱乐' },
    { name: '抖音', pinyin: 'douyin', url: 'https://www.douyin.com/', text: '抖音官方网址', category: '娱乐' },
    { name: '微博', pinyin: 'weibo', url: 'https://weibo.com/', text: '微博官方网址', category: '娱乐' },
    { name: '知乎', pinyin: 'zhihu', url: 'https://www.zhihu.com/', text: '知乎官方网址', category: '娱乐' },
    // 生活类
    { name: '阿里巴巴', pinyin: 'alibaba', url: 'https://www.alibaba.com/', text: '阿里巴巴官方网址', category: '生活' },
    { name: '百度', pinyin: 'baidu', url: 'https://www.baidu.com/', text: '百度官方网址', category: '生活' },
    { name: '滴滴出行', pinyin: 'didichuxing', url: 'https://www.didiglobal.com/', text: '滴滴出行官方网址', category: '生活' },
    { name: '谷歌', pinyin: 'guge', url: 'https://www.google.com/', text: '谷歌官方网址', category: '生活' },
    { name: 'QQ', pinyin: 'qq', url: 'https://im.qq.com/', text: 'QQ官方网址', category: '生活' },
    { name: '腾讯', pinyin: 'tengxun', url: 'https://www.tencent.com/', text: '腾讯官方网址', category: '生活' },
    { name: '微信', pinyin: 'weixin', url: 'https://weixin.qq.com/', text: '微信官方网址', category: '生活' },
    { name: '字节跳动', pinyin: 'zijietiaodong', url: 'https://bytedance.com/', text: '字节跳动官方网址', category: '生活' },
    // 新闻类
    { name: '人民日报', pinyin: 'renminribao', url: 'http://www.people.com.cn/', text: '人民日报官方网址', category: '新闻' },
    { name: '新华社', pinyin: 'xinhuashe', url: 'http://www.xinhuanet.com/', text: '新华社官方网址', category: '新闻' },
    { name: '央视新闻', pinyin: 'yangshixinwen', url: 'http://news.cctv.com/', text: '央视新闻官方网址', category: '新闻' },
    { name: '中国新闻网', pinyin: 'zhongguoxinwenwang', url: 'http://www.chinanews.com/', text: '中国新闻网官方网址', category: '新闻' },
    { name: '环球网', pinyin: 'huanqiuwang', url: 'http://www.huanqiu.com/', text: '环球网官方网址', category: '新闻' },
    { name: '凤凰网', pinyin: 'fenghuangwang', url: 'http://www.ifeng.com/', text: '凤凰网官方网址', category: '新闻' },
    { name: '澎湃新闻', pinyin: 'pengpaixinwen', url: 'https://www.thepaper.cn/', text: '澎湃新闻官方网址', category: '新闻' },
    { name: '腾讯新闻', pinyin: 'tengxunxinwen', url: 'https://news.qq.com/', text: '腾讯新闻官方网址', category: '新闻' },
    { name: '网易新闻', pinyin: 'wangyixinwen', url: 'https://news.163.com/', text: '网易新闻官方网址', category: '新闻' },
    { name: '新浪新闻', pinyin: 'xinlangxinwen', url: 'https://news.sina.com.cn/', text: '新浪新闻官方网址', category: '新闻' },
    { name: '英国广播公司', pinyin: 'yingguoguangbogongsi', url: 'https://www.bbc.com/', text: 'BBC官方网址', category: '新闻' },
    { name: '路透社', pinyin: 'lutushe', url: 'https://www.reuters.com/', text: '路透社官方网址', category: '新闻' },
    { name: '美联社', pinyin: 'meilianshe', url: 'https://apnews.com/', text: '美联社官方网址', category: '新闻' },
    { name: '法新社', pinyin: 'faxinshe', url: 'https://www.afp.com/', text: '法新社官方网址', category: '新闻' },
    // 购物类
    { name: '京东', pinyin: 'jingdong', url: 'https://www.jd.com/', text: '京东官方网址', category: '购物' },
    { name: '淘宝', pinyin: 'taobao', url: 'https://www.taobao.com/', text: '淘宝官方网址', category: '购物' },
    { name: '天猫', pinyin: 'tianmao', url: 'https://www.tmall.com/', text: '天猫官方网址', category: '购物' },
    { name: '拼多多', pinyin: 'pinduoduo', url: 'https://www.pinduoduo.com/', text: '拼多多官方网址', category: '购物' },
    { name: '苏宁易购', pinyin: 'suningyigou', url: 'https://www.suning.com/', text: '苏宁易购官方网址', category: '购物' },
    { name: '唯品会', pinyin: 'weipinhui', url: 'https://www.vip.com/', text: '唯品会官方网址', category: '购物' },
    { name: '亚马逊', pinyin: 'yamaxun', url: 'https://www.amazon.cn/', text: '亚马逊中国官方网址', category: '购物' },
    { name: '当当网', pinyin: 'dangdangwang', url: 'https://www.dangdang.com/', text: '当当网官方网址', category: '购物' },
    { name: '国美在线', pinyin: 'guomeizaixian', url: 'https://www.gome.com.cn/', text: '国美在线官方网址', category: '购物' },
    { name: '网易严选', pinyin: 'wangyiyanxuan', url: 'https://you.163.com/', text: '网易严选官方网址', category: '购物' },
    { name: '小红书', pinyin: 'xiaohongshu', url: 'https://www.xiaohongshu.com/', text: '小红书官方网址', category: '购物' },
    { name: '考拉海购', pinyin: 'kaolahigou', url: 'https://www.kaola.com/', text: '考拉海购官方网址', category: '购物' },
    { name: '美团外卖', pinyin: 'meituanwaimai', url: 'https://waimai.meituan.com/', text: '美团外卖官方网址', category: '购物' },
    { name: '饿了么', pinyin: 'eleme', url: 'https://www.ele.me/', text: '饿了么官方网址', category: '购物' },
    // 绅士类
    { name: '51吃瓜网', pinyin: 'wuyichiguawang', url: 'https://wikiwiki.hwfhetxv.xyz/', text: '51吃瓜网官方网址', category: '绅士' },
    { name: 'Pornhub', pinyin: 'pornhub', url: 'https://pornhub.com/', text: 'Pornhub官方网址(VPN访问)', category: '绅士' },
    { name: 'Pornhub.llc', pinyin: 'pornhub.llc', url: 'https://cn.pornhub.moe/', text: 'Pornhub.llc网址(无需VPN)', category: '绅士' },
    { name: '无限臀山', pinyin: '无限臀山', url: 'https://wxts.wuxiants554.com/', text: '无限臀山官方网址', category: '绅士' },
    { name: '91短视频', pinyin: 'jiuyi短视频', url: 'https://91dsp.fun/', text: '91短视频官方网址', category: '绅士' },
    { name: 'XVideo', pinyin: 'xvideos', url: 'https://xvideos.com/', text: 'XVideos官方网址(VPN访问)', category: '绅士' },
    { name: '俄罗斯搜索引擎', pinyin: 'eluosisousuoyinqing', url: 'http://www.yandex.com/', text: '俄罗斯搜索引擎官方网址', category: '绅士' },
    { name: '每日大赛', pinyin: 'meiridasai', url: 'https://h5gpz2.aspyies.xyz/', text: '每日大赛官方网址', category: '绅士' },
    
  ];

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
    
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="main">
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
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* 显示搜索结果数量 */}
          {(searchTerm || selectedCategory !== '全部') && (
            <div className="search-result-info">
              <p>共找到 {filteredWebsites.length} 个相关网站</p>
            </div>
          )}
          
          {/* 渲染过滤后的网站列表 */}
          {filteredWebsites.map((website, index) => (
            <div key={index} className="info-block">
              <p>
                {website.text}：
                <a href={website.url} target="_blank" rel="noopener noreferrer">
                  {website.url}
                </a>
              </p>
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
    </main>
  );
}

export default Home;