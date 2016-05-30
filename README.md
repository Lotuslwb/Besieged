# 性能检测订制工具 --  Besieged

### 废话放在最前面

性能肯定是H5很重要的一个环节,值得我们关注。

所以我就有了这么一个不成熟的想法~~

首先一起约定一个list(起名为,checklist),告诉我们自己,H5页面上线的时候,我们需要注意的一些点
然后,我就根据这个checklist 做一个工具,检测这些点。
然后呢,我们在H5上线之前,就可以跑一跑,看看我们的性能是不是达到了一个基础的要求。让我们自己心中有个数,之后如果需要优化,也有一个简单的标准


这个工具就起名为 Besieged~~

然后我也希望这个工具可以,越来越成熟,越走越远。我们拭目以待

### checklist
   * 资源加载总大小控制: 首屏资源不大于500  kb
   * 页面总相应时间: 3s
   * 图片文件大小kb控制: 单张图片不要大于50kb
   * 图片文件数量控制: 个数不大于15
   * css请求数:不大于3
   * js请求数:不大于3
   * 首屏ajax请求不大于3
   * IconFont正确使用: 无线端不需要有ttf以外的字体文件,字体文件只能有一个
   * 不要有30x,40x,50x的请求
   * 正常情况禁止使用gif图片(降低CPU消耗,提升渲染能力)
   * 协议收敛,不写死http或者https头部
   * 域名收敛? 好像我们没有域名。。。。

   > 我们需要继续讨论以上指标和其他的点

### Besieged 使用

    * 安装

            npm install wb-besieged -g

    * 使用

            bes -help
            bes test http://www.baidu.com/

    * 注意事项

            待定

### Besieged 维护和版本log

 * v0.0.1  第一个版本


