import React from 'react';
import '../styles.css';

function About() {
  return (
    <main className="main">
      <section className="about">
        <div className="container">
          <h2>关于开发者</h2>
          <div className="about-content">
            <p>该网站隶属于个人，不涉及任何团队。访问绅士类网站所造成的损失，开发者概不负责</p>
            <h3>个人意愿</h3>
            <p>为用户提供优质的网络体验，通过简洁的设计和流畅的功能，帮助用户实现他们的目标。</p>
            <h3>个人价值观</h3>
            <ul className="values">
              <li>遵纪守法</li>
              <li>简洁高效</li>
              <li>持续改进</li>
              <li>欢迎指正</li>
            </ul>
            <h3>联系</h3>
            <p>如果您有任何问题或建议，欢迎随时联系。</p>
            <p>邮箱：hujiahao060901@gmail.com</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;