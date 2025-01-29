import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="w-5/6 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About the App */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold border-b-2 border-gray-500 pb-2">
            关于应用
          </h2>
          <p className="text-gray-400 leading-relaxed">
            这是一个酒店预订应用程序，旨在为用户提供简单、快捷的酒店预订服务。无论您是商务旅行还是休闲度假，我们的应用都能帮助您找到最合适的住宿。通过我们的平台，您可以轻松浏览酒店信息、查看用户评价，并完成安全可靠的预订。
          </p>
        </div>

        {/* Contacts */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-xl font-bold border-b-2 border-gray-500 pb-2">
            联系方式
          </h2>
          <div className="flex flex-col gap-2">
            <span>
              <strong>电话:</strong> 13261673009
            </span>
            <span>
              <strong>邮箱:</strong> eyaskhattab@bupt.edu.cn
            </span>
            <span>
              <strong>微信:</strong> eyaskhattab
            </span>
          </div>
        </div>

        {/* Location */}
        <div className="flex flex-col items-end gap-4">
          <h2 className="text-xl font-bold border-b-2 border-gray-500 pb-2">
            位置
          </h2>
          <div className="flex flex-col gap-2 text-right">
            <span>
              <strong>国家:</strong> 中国
            </span>
            <span>
              <strong>城市:</strong> 北京
            </span>
            <span>
              <strong>地址:</strong> 北京邮电大学
            </span>
            <span>
              <strong>姓名:</strong> 伊亚斯
            </span>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="mt-12 text-center text-gray-500 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} 酒店预订应用 | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
